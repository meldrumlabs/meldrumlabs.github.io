/**
 * Turn a rasterised logo into particle targets.
 *
 * `rgba` is the decoded mark: the orange pixels are the geometry, the cream
 * background and white highlights are not. Targets come back as packed vec4s —
 * x, y filling [-1, 1] with the mark's own proportions (pair it with a box of
 * the mark's aspect), z a small depth, w the particle's seed — so the GPU
 * uploads them as-is.
 *
 * Seeded, so every reload forms exactly the same logo.
 */
export function sampleLogoTargets(
  rgba: Uint8ClampedArray | Uint8Array,
  width: number,
  height: number,
  count: number,
  seed = 0x51ed270b,
): Float32Array {
  const xs: number[] = []
  const ys: number[] = []

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4
      // Opaque and warm: #F28C16 is the mark, #FCF6ED / #FDFDFD are paper.
      if (rgba[i + 3] > 128 && rgba[i] - rgba[i + 2] > 40) {
        xs.push(x)
        ys.push(y)
      }
    }
  }

  if (xs.length === 0) throw new Error('logo mask has no mark to sample')

  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)
  const centerX = (minX + maxX + 1) / 2
  const centerY = (minY + maxY + 1) / 2
  const halfX = (maxX - minX + 1) / 2
  const halfY = (maxY - minY + 1) / 2
  const random = mulberry32(seed)
  const targets = new Float32Array(count * 4)

  // Walk the mark's pixels in shuffled order instead of picking at random:
  // random picks clump and leave holes, a shuffled sweep covers the mark
  // evenly while still looking scattered.
  const order = new Uint32Array(xs.length)
  for (let i = 0; i < order.length; i++) order[i] = i
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    const swap = order[i]
    order[i] = order[j]
    order[j] = swap
  }

  for (let i = 0; i < count; i++) {
    const pick = order[i % order.length]
    // Jitter inside the pixel, otherwise repeated picks read as a grid.
    const px = xs[pick] + random() - 0.5
    const py = ys[pick] + random() - 0.5
    const o = i * 4
    // Jitter can land half a pixel outside the box the mark spans; clamp so the
    // contract stays "x, y in [-1, 1]" whatever the raster resolution. The
    // inset keeps sprite-sized glow off the canvas edge, where it would be cut.
    targets[o] = clamp(((px - centerX) / halfX) * INSET)
    targets[o + 1] = clamp(((centerY - py) / halfY) * INSET)
    targets[o + 2] = (random() - 0.5) * 0.16
    targets[o + 3] = random()
  }

  return targets
}

const clamp = (value: number) => Math.min(1, Math.max(-1, value))

/** Leaves room at the edge for the sprites' own radius. */
const INSET = 0.97

/** mulberry32: tiny, fast, and identical everywhere — determinism is the point. */
export function mulberry32(seed: number): () => number {
  let a = seed | 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
