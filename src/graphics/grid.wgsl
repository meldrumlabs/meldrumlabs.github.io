// Grid: a drafting sheet. Square module, hairline rules, every fifth line
// heavier, warm stock underneath. Resolution independent — the module is a
// fixed number of cells across the height, not a fixed number of pixels.

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
const RULE: vec3f = vec3f(0.855, 0.835, 0.788);
const MAJOR: vec3f = vec3f(0.706, 0.678, 0.612);
const GOLD: vec3f = vec3f(0.973, 0.761, 0.455);

/** Distance to the nearest cell edge, in cell units. */
fn edges(g: vec2f) -> f32 {
  let f = fract(g);
  return min(min(f.x, 1.0 - f.x), min(f.y, 1.0 - f.y));
}

@fragment
fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let aspect = params.texel.y / params.texel.x;
  let size = 1.0 / params.texel; // device pixels
  let p = vec2f(uv.x * aspect, uv.y);

  // Square cells: 20 rows, however many columns the aspect needs.
  let rows = 14.0;
  let cols = ceil(aspect * rows);

  // Line width is fixed in pixels, converted back into cell units.
  let minorWidth = 1.2 * rows / size.y;
  let majorWidth = 1.6 * (rows / 5.0) / size.y;

  let minor = 1.0 - smoothstep(0.0, minorWidth, edges(uv * vec2f(cols, rows)));
  let major = 1.0 - smoothstep(0.0, majorWidth, edges(uv * vec2f(cols, rows) / 5.0));

  // Warm wash so the sheet is not sterile.
  let wash = 0.5 + 0.5 * fbmSimplex2d(p * 1.4 + vec2f(params.time * 0.008, 0.0), 3, 2.17, 0.5);

  var col = PAPER;
  col = mix(col, GOLD, wash * 0.1);
  col = mix(col, RULE, minor * 0.45);
  col = mix(col, MAJOR, major * 0.62);

  col += warmPool(uv, aspect, params.pointer, params.warm);
  col += (hash1(dot(uv, vec2f(12.9898, 78.233))) - 0.5) * 0.006;
  return vec4f(col, 1.0);
}
