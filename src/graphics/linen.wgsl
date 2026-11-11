// Linen: stock as a material rather than a colour. A fine crossed weave, mottled
// by low-frequency noise, lit from the top left.

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

const PAPER: vec3f = vec3f(0.988, 0.984, 0.969);

@fragment
fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let aspect = params.texel.y / params.texel.x;
  let size = 1.0 / params.texel;
  let p = vec2f(uv.x * aspect, uv.y);
  let t = params.time * 0.02;

  // Threads are a fixed number of device pixels wide, so the weave stays the
  // same physical size on any screen.
  let threads = size.y / 4.4;
  let weave = sin(uv.y * threads * 6.2831853) * sin(uv.x * threads * aspect * 6.2831853);

  // Two scales of mottling: the stock, and the tooth of the surface.
  let stock = 0.5 + 0.5 * fbmSimplex2d(p * 2.6 + vec2f(t, 0.0), 4, 2.17, 0.5);
  let tooth = 0.5 + 0.5 * fbmSimplex2d(p * 11.0 - vec2f(t * 0.5, 0.0), 2, 2.0, 0.5);

  var col = PAPER;
  col -= vec3f(1.0, 0.96, 0.9) * weave * 0.055;
  col -= vec3f(0.16, 0.14, 0.1) * stock * 0.26;
  col -= vec3f(0.12, 0.11, 0.08) * tooth * 0.14;

  // Light from the top left (uv.y is 0 at the top), so the surface has a direction.
  let d = distance(uv, vec2f(0.12, 0.06));
  col += vec3f(1.0, 0.95, 0.84) * exp(-d * d * 2.4) * 0.12;

  col += warmPool(uv, aspect, params.pointer, params.warm);
  col += (hash1(dot(uv, vec2f(12.9898, 78.233))) - 0.5) * 0.006;
  return vec4f(col, 1.0);
}
