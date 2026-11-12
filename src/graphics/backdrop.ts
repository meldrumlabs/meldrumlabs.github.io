// The landing page's background: linen — a woven stock with two scales of
// mottling, light from the top left, and a soft pool of warmth that follows the
// pointer. One fullscreen pass at reduced resolution — it is all low frequency
// except the weave, which is why the weave is measured in device pixels.

import { clock, effect, frame, frameLoop, init, surface } from 'vgpu'
import type { Frame, FrameLoopHandle } from 'vgpu'
import linenShader from './linen.wgsl'

export interface BackdropOptions {
  /** Reduced motion: render one still frame and stop. */
  still?: boolean
  /** Any of the paper shaders — they share the same uniform block. */
  shader?: typeof linenShader
}

const PAPER = [0.988, 0.984, 0.969, 1]

/** Starts the field on `canvas`; call the returned function to tear it down. */
export async function startBackdrop(
  canvas: HTMLCanvasElement,
  { still = false, shader = linenShader }: BackdropOptions = {},
): Promise<() => void> {
  const gpu = await init()
  const view = surface(gpu, canvas, { dpr: [0.5, 1], clearColor: PAPER, label: 'hero-backdrop' })

  // A still frame cannot follow the cursor, so the pool is off there.
  const warm = !still

  // Pointer in uv space. These passes have y = 0 at the top, so no flip.
  const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 }
  const onMove = (event: PointerEvent) => {
    pointer.tx = event.clientX / window.innerWidth
    pointer.ty = event.clientY / window.innerHeight
  }
  if (warm) window.addEventListener('pointermove', onMove, { passive: true })

  const field = effect(gpu, shader, {
    label: 'hero-backdrop',
    set: {
      params: {
        time: 0,
        texel: view.texelSize,
        pointer: [pointer.x, pointer.y],
        warm: warm ? 1 : 0,
        pad: 0,
      },
    },
  })
  const unsubscribeResize = view.onResize(() => {
    field.set({ params: { texel: view.texelSize } })
  })

  await field.compile(view)

  let disposed = false
  let loop: FrameLoopHandle | undefined
  let observer: IntersectionObserver | undefined

  const teardown = () => {
    if (disposed) return
    disposed = true
    loop?.stop()
    observer?.disconnect()
    unsubscribeResize()
    window.removeEventListener('pointermove', onMove)
    gpu.dispose()
  }

  gpu.lost.then(() => {
    // The page's flat colour is a perfectly good fallback.
    teardown()
  })

  const time = clock(gpu)
  const draw = (frame: Frame) => {
    if (warm) {
      pointer.x += (pointer.tx - pointer.x) * 0.08
      pointer.y += (pointer.ty - pointer.y) * 0.08
    }
    field.set({ params: { time: time.time, pointer: [pointer.x, pointer.y] } })
    frame.pass(view, field)
  }

  if (still) {
    frame(gpu, draw)
    return teardown
  }

  const start = () => {
    if (disposed || loop) return
    loop = frameLoop(gpu, draw)
  }
  const stop = () => {
    loop?.stop()
    loop = undefined
  }

  start()

  if (typeof IntersectionObserver !== 'undefined') {
    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start()
      else stop()
    })
    observer.observe(canvas)
  }

  return teardown
}
