// The hero's particle logo. Isolated from React and from the rest of the page:
// give it a canvas, get back a teardown function. Everything it owns dies with
// that function or with the GPU.
//
// The mark is rasterised from the same SVG the static fallback uses, so the
// animation can never invent a logo the brand does not have.

import { clock, compute, draw, frameLoop, init, storage, surface } from 'vgpu'
import type { Frame, FrameLoopHandle } from 'vgpu'
import { sampleLogoTargets, mulberry32 } from './logo-targets'
import drawShader from './particle-draw.wgsl'
import simShader from './particle-sim.wgsl'

/** The page's own background, so the canvas never shows a seam. */
export const HERO_BACKGROUND = [0.094, 0.094, 0.106, 1] as const

/** Also the static fallback image, so there is only one asset to keep right. */
export const MARK_URL = '/img/logo/mark.svg'

const MASK_RESOLUTION = 512
const WORKGROUP_SIZE = 64
/** Loose data drifts alone for a beat before the logo starts forming. */
const INTRO_DELAY = 0.4
const INTRO_SECONDS = 1.8
/** A backgrounded tab hands back a huge delta; never step the spring with it. */
const MAX_DT = 1 / 30
const REPEL = 4
const REPEL_RADIUS = 0.28

export interface HeroParticlesOptions {
  canvas: HTMLCanvasElement
  /** The GPU path cannot run (no adapter, shader failure, device loss). */
  onFailure?: (error: unknown) => void
  /** Draw the mark as ink on paper instead of light on dark. */
  ink?: boolean
}

/**
 * Starts the particle logo on `canvas`. Resolves once the first frame is
 * compiled; call the returned function to tear everything down.
 */
export async function startHeroParticles({
  canvas,
  onFailure,
  ink = false,
}: HeroParticlesOptions): Promise<() => void> {
  const mask = await decodeMark()
  const count = pickParticleCount(canvas, ink)
  const data = buildParticleData(sampleLogoTargets(mask.data, mask.width, mask.height, count), count)

  // Compatibility-mode adapters grant no vertex-stage storage unless asked.
  const gpu = await init({ requiredLimits: { maxStorageBuffersInVertexStage: 1 } })

  let disposed = false
  let loop: FrameLoopHandle | undefined
  let observer: IntersectionObserver | undefined
  let unsubscribeResize: (() => void) | undefined

  const teardown = () => {
    if (disposed) return
    disposed = true
    loop?.stop()
    observer?.disconnect()
    unsubscribeResize?.()
    window.removeEventListener('pointermove', onMove)
    canvas.removeEventListener('pointerleave', onLeave)
    gpu.dispose()
  }

  const fail = (error: unknown) => {
    teardown()
    onFailure?.(error)
  }

  const pointer = { x: 4, y: 4, targetX: 4, targetY: 4, active: false }

  function onMove(event: PointerEvent) {
    const rect = canvas.getBoundingClientRect()
    if (!rect.width || !rect.height) return
    // Canvas NDC is the logo's own space, so no aspect conversion is needed.
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    const y = 1 - ((event.clientY - rect.top) / rect.height) * 2
    pointer.targetX = x
    pointer.targetY = y
    // A cursor over the headline is nowhere near the logo; leave it alone.
    pointer.active = Math.abs(x) < 1.05 && Math.abs(y) < 1.05
  }

  function onLeave() {
    pointer.active = false
  }

  try {
    const canvasSurface = surface(gpu, canvas, {
      dpr: [1, 2],
      // Ink is laid on a transparent buffer so it composites over the paper
      // background instead of covering it with a flat box.
      clearColor: ink ? [0, 0, 0, 0] : HERO_BACKGROUND,
      ...(ink ? { alphaMode: 'premultiplied' } : {}),
    })
    const particles = storage(gpu, data.byteLength, 'read-write')
    particles.write(data)

    const sim = compute(gpu, simShader, {
      label: 'hero-particles-sim',
      set: {
        particles,
        params: {
          pointer: [pointer.x, pointer.y],
          time: 0,
          intro: 0,
          dt: 0,
          repel: 0,
          repelRadius: REPEL_RADIUS,
          count,
          idle: 1,
          brightness: 1,
          pad0: 0,
          pad1: 0,
        },
      },
    })

    const view = () => ({
      resolution: canvasSurface.size,
      dpr: canvasSurface.dpr,
      sizeScale: spriteScale(canvas),
      ink: ink ? 1 : 0,
    })

    const render = draw(gpu, {
      shader: drawShader,
      label: 'hero-particles',
      vertices: 6,
      instances: count,
      // Ink lays coverage on paper; light stacks additively into glow.
      blend: ink ? 'alpha' : 'additive',
      set: { particles, view: view() },
    })

    // Compile before the first frame so the entrance is not paid for in jank.
    await Promise.all([sim.compile(), render.compile(canvasSurface)])

    unsubscribeResize = canvasSurface.onResize(() => {
      render.set({ view: view() })
    })

    const time = clock(gpu)
    let elapsed = 0

    const drawFrame = (frame: Frame) => {
      const dt = Math.min(time.deltaTime, MAX_DT)
      elapsed += dt
      const intro = Math.min(1, Math.max(0, (elapsed - INTRO_DELAY) / INTRO_SECONDS))

      pointer.x += (pointer.targetX - pointer.x) * 0.12
      pointer.y += (pointer.targetY - pointer.y) * 0.12

      sim.set({
        params: {
          time: time.time,
          dt,
          intro,
          pointer: [pointer.x, pointer.y],
          repel: pointer.active ? REPEL : 0,
        },
      })
      frame.computePass((pass) => pass.dispatch(sim, Math.ceil(count / WORKGROUP_SIZE)))
      frame.pass(canvasSurface, render)
    }

    const start = () => {
      if (disposed || loop) return
      loop = frameLoop(gpu, drawFrame)
    }

    start()

    // Stop encoding entirely once the hero scrolls away. Nothing to stop when
    // the tab is hidden: requestAnimationFrame already does that for us.
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) start()
        else {
          loop?.stop()
          loop = undefined
        }
      })
      observer.observe(canvas)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    canvas.addEventListener('pointerleave', onLeave)
    gpu.lost.then((info) => {
      if (disposed) return
      console.warn('[hero] WebGPU device lost:', info.reason, info.message)
      fail(info)
    })

    return teardown
  } catch (error) {
    gpu.dispose()
    throw error
  }
}

/** Decode the mark into pixels once; sampling it is then pure arithmetic. */
function decodeMark(): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = MASK_RESOLUTION
      canvas.height = MASK_RESOLUTION
      const context = canvas.getContext('2d', { willReadFrequently: true })
      if (!context) {
        reject(new Error('2d canvas unavailable'))
        return
      }
      context.drawImage(image, 0, 0, MASK_RESOLUTION, MASK_RESOLUTION)
      resolve(context.getImageData(0, 0, MASK_RESOLUTION, MASK_RESOLUTION))
    }
    image.onerror = () => reject(new Error(`could not load ${MARK_URL}`))
    image.src = MARK_URL
  })
}

/** Sprites are authored for a ~640px mark; smaller marks get smaller sprites. */
function spriteScale(canvas: HTMLCanvasElement): number {
  return Math.min(1, Math.max(0.5, canvas.clientWidth / 640))
}

/** Density scales with the canvas, because spacing is what makes it readable. */
export function pickParticleCount(canvas: HTMLCanvasElement, ink = false): number {
  // ~5px² per particle is where the dots stop looking like dust and start
  // looking solid, at the sprite sizes the draw shader emits. Ink has no
  // additive stacking to fill the gaps, so it needs a denser field.
  const area = canvas.clientWidth * canvas.clientHeight
  const count = Math.min(20000, Math.max(600, Math.round(area / (ink ? 2.2 : 5))))
  // Phones spend their budget elsewhere; the logo still reads at this density.
  return window.matchMedia('(pointer: coarse)').matches ? Math.min(count, 4000) : count
}

/**
 * Layout per particle, matching `Particle` in both shaders: pos, vel, target,
 * start — each a vec4f.
 */
function buildParticleData(targets: Float32Array, count: number): Float32Array {
  const data = new Float32Array(count * 16)
  const random = mulberry32(0x2f6e2b1)

  for (let i = 0; i < count; i++) {
    const o = i * 16
    // Start scattered through a volume. z is read as depth, not as a second
    // silhouette, so the mark still lands flat and legible.
    //
    // The cloud is a disc, not a box: a box clipped by the canvas edge reads as
    // a rectangle of static rather than a volume of loose data.
    const angle = random() * Math.PI * 2
    const radius = Math.sqrt(random()) * 0.95
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius * 0.88
    const z = (random() * 2 - 1) * 0.6

    data[o] = x
    data[o + 1] = y
    data[o + 2] = z
    data[o + 3] = targets[i * 4 + 3]

    // vel stays zero.
    data[o + 8] = targets[i * 4]
    data[o + 9] = targets[i * 4 + 1]
    data[o + 10] = targets[i * 4 + 2]

    data[o + 12] = x
    data[o + 13] = y
    data[o + 14] = z
  }

  return data
}
