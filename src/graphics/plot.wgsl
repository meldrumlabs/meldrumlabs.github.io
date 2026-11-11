// Plot: the page as a plotting surface. Tick marks along the bottom and left
// edges, a hairline axis, and one live-looking trace drifting across the lower
// third. Faint enough to be instrumentation, not decoration.
//
// Layout is expressed in `v` — uv flipped so y counts up from the bottom, which
// is how a chart is read.

import { simplex2d } from '@vgpu/wgsl-std/noise/simplex'
import { warmPool } from './warm.wgsl'

struct Params {
  time: f32,
  texel: vec2f,
  pointer: vec2f,
  warm: f32,
  pad: f32,
}

@group(0) @binding(0) var<uniform> params: Params;

const PAPER: vec3f = vec3f(0.988, 0.984, 0.969);
const AXIS: vec3f = vec3f(0.71, 0.68, 0.61);
const TICK: vec3f = vec3f(0.78, 0.755, 0.7);
const TRACE: vec3f = vec3f(0.72, 0.36, 0.09);

const BASELINE: f32 = 0.13;
const LEFT_AXIS: f32 = 0.055;

/** The trace: a slow wander, small ripple, and the occasional spike. */
fn traceAt(x: f32, t: f32) -> f32 {
  let drift = 0.032 * sin(x * 4.2 + t * 0.22);
  let ripple = 0.012 * sin(x * 13.0 - t * 0.45);
  let noise = 0.025 * simplex2d(vec2f(x * 2.2 + t * 0.08, 1.7));
  let spike = 0.05 * pow(max(sin(x * 23.0 + t * 0.5), 0.0), 12.0);
  return 0.235 + drift + ripple + noise + spike;
}

@fragment
fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let aspect = params.texel.y / params.texel.x;
  let px = params.texel;
  let t = params.time;
  let v = vec2f(uv.x, 1.0 - uv.y); // y up
  let p = vec2f(v.x * aspect, v.y);

  var col = PAPER;

  // Axes.
  let axisY = 1.0 - smoothstep(0.0, 1.3 * px.y, abs(v.y - BASELINE));
  let axisX = 1.0 - smoothstep(0.0, 1.3 * px.x, abs(v.x - LEFT_AXIS));
  col = mix(col, AXIS, max(axisY, axisX) * 0.5);

  // Bottom ticks: every ~1/48th of the width, longer every fifth.
  let ticksX = 48.0;
  let gx = v.x * ticksX;
  let dx = abs(fract(gx) - 0.5) / ticksX;
  let tickX = 1.0 - smoothstep(0.0, 1.2 * px.x, dx);
  let longX = select(0.0, 1.0, fract(floor(gx) / 5.0) < 0.05);
  let lenX = select(0.0075, 0.014, longX > 0.5);
  let spanX = step(BASELINE, v.y) * step(v.y, BASELINE + lenX);
  col = mix(col, TICK, tickX * spanX * 0.75);

  // Left ticks.
  let ticksY = 32.0;
  let gy = v.y * ticksY;
  let dy = abs(fract(gy) - 0.5) / ticksY;
  let tickY = 1.0 - smoothstep(0.0, 1.2 * px.y, dy);
  let longY = select(0.0, 1.0, fract(floor(gy) / 5.0) < 0.05);
  let lenY = select(0.0075, 0.014, longY > 0.5);
  let spanY = step(LEFT_AXIS, v.x) * step(v.x, LEFT_AXIS + lenY);
  col = mix(col, TICK, tickY * spanY * 0.75);

  // The trace, with a whisper of fill under it.
  let y = traceAt(p.x, t);
  let stroke = 1.0 - smoothstep(0.0, 1.5 * px.y, abs(v.y - y));
  let fill = step(v.y, y) * smoothstep(0.0, 0.3, y - v.y);
  col = mix(col, TRACE, fill * 0.03);
  col = mix(col, TRACE, stroke * 0.5);

  // Warm stock, and the cursor's pool of light.
  let wash = 0.5 + 0.5 * simplex2d(p * 1.3 + vec2f(t * 0.008, 0.0));
  col = mix(col, vec3f(0.973, 0.761, 0.455), wash * 0.07);
  col += warmPool(uv, aspect, params.pointer, params.warm);

  return vec4f(col, 1.0);
}
