// Headless proof for src/graphics/hero-particles: sample the mask, run the same
// compute + draw shaders on a real GPU, and assert on real numbers — the springs
// settle onto their targets, the cursor pushes particles away, and the draw pass
// actually emits the mark's orange.
//
// Run from the repo root: node scripts/check-hero-particles.mjs

import assert from 'node:assert/strict'
import { readFile, writeFile } from 'node:fs/promises'
import { compute, draw, frame, init, storage, target } from 'vgpu/node'
import { prepareShader } from '@vgpu/wgsl/prepare'

import { sampleLogoTargets } from '../src/graphics/logo-targets.ts'

const COUNT = 1500
const SIZE = 192
const MASK = 128
const DT = 1 / 60
const WORKGROUP = 64
const POINTER = [-0.4, 0]

const mask = makeMask(MASK)

// The sampler is pure arithmetic: same seed in, same targets out, in range.
const targets = sampleLogoTargets(mask, MASK, MASK, COUNT, 7)
assert.deepEqual(sampleLogoTargets(mask, MASK, MASK, COUNT, 7), targets)
for (let i = 0; i < COUNT; i++) {
  const [x, y, z] = [targets[i * 4], targets[i * 4 + 1], targets[i * 4 + 2]]
  assert(Math.abs(x) <= 1 && Math.abs(y) <= 1, `target ${i} outside [-1, 1]: ${x}, ${y}`)
  assert(Math.abs(z) <= 0.08, `target ${i} depth out of range: ${z}`)
}

const gpu = await init()
try {
  const shader = async (file) => prepareShader(await readFile(new URL(`../src/graphics/${file}`, import.meta.url), 'utf8'))
  const simShader = await shader('particle-sim.wgsl')
  const drawShader = await shader('particle-draw.wgsl')

  const [particles, output] = makeState(gpu)
  const sim = compute(gpu, simShader, {
    set: {
      particles,
      params: {
        pointer: [0, 0],
        time: 0,
        intro: 0,
        dt: 0,
        repel: 0,
        repelRadius: 0.28,
        count: COUNT,
        idle: 1,
        brightness: 1,
        pad0: 0,
        pad1: 0,
      },
    },
  })
  const render = draw(gpu, {
    shader: drawShader,
    vertices: 6,
    instances: COUNT,
    blend: 'additive',
    set: { particles, view: { resolution: [SIZE, SIZE], dpr: 1, sizeScale: 1 } },
  })
  await Promise.all([sim.compile(), render.compile(output)])

  let elapsed = 0
  const step = (pointer, repel) => {
    elapsed += DT
    sim.set({
      params: {
        time: elapsed,
        dt: DT,
        intro: Math.min(1, Math.max(0, (elapsed - 0.45) / 2.2)),
        pointer,
        repel,
      },
    })
    frame(gpu, (f) => f.computePass((pass) => pass.dispatch(sim, Math.ceil(COUNT / WORKGROUP))))
  }

  // 5s: the intro has finished and everything must be home.
  for (let i = 0; i < 300; i++) step([0, 0], 0)
  await gpu.settled()
  let state = new Float32Array(await particles.read())
  const settledOffsets = offsets(state)
  const worst = Math.max(...settledOffsets)
  assert(worst < 0.02, `particles did not reach the logo: worst offset ${worst.toFixed(4)}`)

  // Cursor: the disc around the pointer empties, then refills when it leaves.
  const nearBefore = withinRadius(state, POINTER, 0.12)
  for (let i = 0; i < 45; i++) step(POINTER, 4)
  await gpu.settled()
  state = new Float32Array(await particles.read())
  const nearDuring = withinRadius(state, POINTER, 0.12)
  assert(nearBefore > 8, `test mark too sparse around the pointer: ${nearBefore}`)
  assert(
    nearDuring < nearBefore * 0.7,
    `cursor repulsion too weak: ${nearBefore} -> ${nearDuring} particles in the disc`,
  )

  for (let i = 0; i < 120; i++) step([0, 0], 0)
  await gpu.settled()
  state = new Float32Array(await particles.read())
  assert(
    Math.max(...offsets(state)) < 0.02,
    'particles did not return home after the cursor left',
  )

  // Pixels: the draw pass has to put the mark's orange on the target.
  frame(gpu, (f) => f.pass(output, render))
  await gpu.settled()
  const pixels = await output.color.read({ mipLevel: 0, region: 'all' })

  let lit = 0
  let sumX = 0
  let sumY = 0
  for (let i = 0; i < SIZE * SIZE; i++) {
    const [r, g, b] = [pixels[i * 4], pixels[i * 4 + 1], pixels[i * 4 + 2]]
    if (r > 90 && r > b + 30) {
      lit++
      sumX += i % SIZE
      sumY += Math.floor(i / SIZE)
    }
  }
  assert(lit > 200, `draw pass emitted too little light: ${lit} lit pixels`)
  // The test mark is symmetric about the canvas centre.
  assert(Math.abs(sumX / lit / SIZE - 0.5) < 0.06, 'mark is not centred horizontally')
  assert(Math.abs(sumY / lit / SIZE - 0.5) < 0.06, 'mark is not centred vertically')

  await writeFile('/tmp/hero-particles.ppm', toPpm(pixels, SIZE))
  console.log(
    `ok — ${COUNT} particles, worst offset ${worst.toFixed(4)}, ${lit} lit pixels, ` +
      `cursor disc ${nearBefore} -> ${nearDuring}. Preview: /tmp/hero-particles.ppm`,
  )
} finally {
  gpu.dispose()
}

/** Same layout the engine builds: pos, vel, target, start, each a vec4f. */
function makeState(gpu) {
  const data = new Float32Array(COUNT * 16)
  for (let i = 0; i < COUNT; i++) {
    const o = i * 16
    const seed = targets[i * 4 + 3]
    const x = Math.sin(seed * 91.7) * 1.25
    const y = Math.cos(seed * 47.3) * 1.25
    const z = Math.sin(seed * 13.1) * 0.6
    data[o] = x
    data[o + 1] = y
    data[o + 2] = z
    data[o + 3] = seed
    data[o + 8] = targets[i * 4]
    data[o + 9] = targets[i * 4 + 1]
    data[o + 10] = targets[i * 4 + 2]
    data[o + 12] = x
    data[o + 13] = y
    data[o + 14] = z
  }
  const particles = storage(gpu, data.byteLength, 'read-write')
  particles.write(data)
  return [particles, target(gpu, { size: [SIZE, SIZE], format: 'rgba8unorm' })]
}

function offsets(state) {
  const out = []
  for (let i = 0; i < COUNT; i++) {
    const o = i * 16
    out.push(Math.hypot(state[o] - state[o + 8], state[o + 1] - state[o + 9]))
  }
  return out
}

function withinRadius(state, [px, py], radius) {
  let count = 0
  for (let i = 0; i < COUNT; i++) {
    const o = i * 16
    if (Math.hypot(state[o] - px, state[o + 1] - py) < radius) count++
  }
  return count
}

/** A symmetric stand-in for the mark: three orange bars on a dark ground. */
function makeMask(size) {
  const rgba = new Uint8ClampedArray(size * size * 4)
  const bars = [
    [10, 26, 118, 42],
    [22, 56, 106, 72],
    [10, 86, 118, 102],
  ]
  for (const [x0, y0, x1, y1] of bars) {
    for (let y = y0; y < y1; y++) {
      for (let x = x0; x < x1; x++) {
        const o = (y * size + x) * 4
        rgba[o] = 242
        rgba[o + 1] = 140
        rgba[o + 2] = 22
        rgba[o + 3] = 255
      }
    }
  }
  return rgba
}

function toPpm(pixels, size) {
  const header = Buffer.from(`P6\n${size} ${size}\n255\n`)
  const body = Buffer.alloc(size * size * 3)
  for (let i = 0; i < size * size; i++) {
    body[i * 3] = pixels[i * 4]
    body[i * 3 + 1] = pixels[i * 4 + 1]
    body[i * 3 + 2] = pixels[i * 4 + 2]
  }
  return Buffer.concat([header, body])
}
