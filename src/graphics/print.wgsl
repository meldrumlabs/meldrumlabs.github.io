// Print: the paper version of the halftone. Ordered dither of a slow, edge
// weighted field, ink on stock instead of light in the dark.

import { hash1 } from '@vgpu/wgsl-std/hash'
import { warmPool } from './warm.wgsl'
import { fbmSimplex2d } from '@vgpu/wgsl-std/noise/simplex'

struct Params {
  time: f32,
  texel: vec2f,
  pointer: vec2f,
  warm: f32,
  pad: f32,
}

@group(0) @binding(0) var<uniform> params: Params;

const PAPER: vec3f = vec3f(0.988, 0.984, 0.969); // #FCFBF7
const INK: vec3f = vec3f(0.827, 0.365, 0.098);
const INK_DEEP: vec3f = vec3f(0.557, 0.212, 0.055);

fn bayer4(cell: vec2u) -> f32 {
  var m = array<u32, 16>(
    0u, 8u, 2u, 10u,
    12u, 4u, 14u, 6u,
    3u, 11u, 1u, 9u,
    15u, 7u, 13u, 5u,
  );
  let x = cell.x % 4u;
  let y = cell.y % 4u;
  return (f32(m[y * 4u + x]) + 0.5) / 16.0;
}

@fragment
fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let aspect = params.texel.y / params.texel.x;
  let t = params.time * 0.03;
  let p = vec2f(uv.x * aspect, uv.y);

  // Calm in the middle, inkier toward the edges.
  let centre = vec2f(uv.x - 0.5, uv.y - 0.5) * vec2f(aspect * 0.6, 0.9);
  let edge = smoothstep(0.26, 0.95, length(centre));
  // Clear of the nav and the footer: dots behind type are noise, not print.
  let band = smoothstep(0.0, 0.26, uv.y) * smoothstep(0.0, 0.12, 1.0 - uv.y);
  let drift = 0.5 + 0.5 * fbmSimplex2d(p * 2.0 + vec2f(t, -t * 0.6), 3, 2.17, 0.5);
  let value = edge * band * (0.08 + 0.34 * drift);

  // Cells on the pixel grid, so the dither never crawls.
  let cell = vec2u(floor(uv / params.texel / 3.0));
  let threshold = bayer4(cell);

  var col = PAPER;
  if (value > threshold) {
    col = mix(INK, INK_DEEP, smoothstep(0.28, 0.46, value));
  }

  col += warmPool(uv, aspect, params.pointer, params.warm);
  col += (hash1(dot(uv, vec2f(12.9898, 78.233))) - 0.5) * 0.006;
  return vec4f(col, 1.0);
}
