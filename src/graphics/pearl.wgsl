// Pearl: warm paper with a slow wash of gold, a breath of rose, and a soft
// light from above. The light cousin of the dust field — same calm middle.
// Same uniform block as the other backgrounds.

import { warmPool } from './warm.wgsl'

struct Params {
  time: f32,
  texel: vec2f,
  pointer: vec2f,
  warm: f32,
  pad: f32,
}

@group(0) @binding(0) var<uniform> params: Params;

const PAPER: vec3f = vec3f(0.988, 0.984, 0.969); // #FCFBF7
const GOLD: vec3f = vec3f(0.973, 0.761, 0.455); // #F8C274
const ROSE: vec3f = vec3f(1.0, 0.702, 0.851); // #FFB3D9
const SAGE: vec3f = vec3f(0.792, 0.886, 0.733); // #CAE2BB

fn hash2(p: vec2f) -> f32 {
  let q = fract(p * vec2f(234.34, 435.345));
  return fract((q.x + q.y) * dot(q, q + 34.23));
}

fn vnoise(p: vec2f) -> f32 {
  let i = floor(p);
  let f = fract(p);
  let u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash2(i), hash2(i + vec2f(1.0, 0.0)), u.x),
    mix(hash2(i + vec2f(0.0, 1.0)), hash2(i + vec2f(1.0, 1.0)), u.x),
    u.y,
  );
}

fn fbm(p: vec2f) -> f32 {
  var v = 0.0;
  var a = 0.5;
  var q = p;
  for (var i = 0; i < 4; i += 1) {
    v += a * vnoise(q);
    q = q * 2.03 + vec2f(11.7, 5.3);
    a *= 0.5;
  }
  return v;
}

@fragment
fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let t = params.time * 0.05;
  let aspect = params.texel.y / params.texel.x;
  let p = vec2f(uv.x * aspect, uv.y);

  var col = PAPER;
  let veil = fbm(p * 1.6 + vec2f(t, -t * 0.5));
  let veil2 = fbm(p * 1.1 - vec2f(t * 0.6, t * 0.35) + 31.0);
  col = mix(col, GOLD, smoothstep(0.5, 0.98, veil) * 0.42);
  col = mix(col, ROSE, smoothstep(0.52, 1.0, veil2) * 0.24);
  col = mix(col, SAGE, smoothstep(0.58, 1.0, fbm(p * 1.4 + veil + t * 0.25)) * 0.18);

  // Light from above (uv.y is 0 at the top, so "above" is negative).
  let sun = vec2f(0.42 * aspect, -0.62);
  let d = length(p - sun);
  col += vec3f(1.0, 0.95, 0.84) * exp(-d * d * 1.9) * 0.14;

  // Depth at the bottom, warmer than the paper: shadow on stock goes brown, not
  // grey. Subtracting more blue than red keeps the whole sheet warm.
  col -= vec3f(0.02, 0.035, 0.07) * smoothstep(0.5, 1.0, uv.y);

  col += warmPool(uv, aspect, params.pointer, params.warm);
  col += (hash2(uv / params.texel) - 0.5) * 0.006;
  return vec4f(col, 1.0);
}
