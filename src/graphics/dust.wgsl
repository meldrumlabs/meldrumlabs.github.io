// Dust field: three parallax layers of drifting motes over the near-black
// ground. Procedural — one pass, no buffers, and it never competes with the
// mark. Same uniform block as the other backgrounds.

struct Params {
  time: f32,
  texel: vec2f,
  pointer: vec2f,
  warm: f32,
  pad: f32,
}

@group(0) @binding(0) var<uniform> params: Params;

const BG: vec3f = vec3f(0.094, 0.094, 0.106); // #18181B
const ORANGE: vec3f = vec3f(0.949, 0.549, 0.086);
const GREEN: vec3f = vec3f(0.545, 0.722, 0.412);

fn hash2(p: vec2f) -> f32 {
  let q = fract(p * vec2f(234.34, 435.345));
  return fract((q.x + q.y) * dot(q, q + 34.23));
}

// One layer: cells of dust, each mote orbiting slowly inside its own cell, so
// nothing ever pops at a cell boundary.
fn layer(p: vec2f, cells: f32, t: f32, seed: f32, radius: f32) -> f32 {
  let scaled = p * cells;
  let cell = floor(scaled);
  let local = fract(scaled) - 0.5;
  let h = vec2f(hash2(cell + seed), hash2(cell + seed + 17.3));
  let phase = h.x * 6.2831853;
  // Some cells are empty: a uniform grid of dots reads as a texture, not dust.
  let present = step(0.34, hash2(cell + seed + 41.7));
  let orbit = vec2f(
    cos(t * (0.12 + h.y * 0.18) + phase),
    sin(t * (0.1 + h.x * 0.16) + phase * 1.7),
  ) * 0.26;
  let offset = local - orbit - (h - 0.5) * 0.45;
  let core = smoothstep(radius, 0.0, length(offset));
  return core * present * (0.35 + 0.65 * h.y);
}

@fragment
fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let aspect = params.texel.y / params.texel.x;
  let t = params.time;
  let p = vec2f(uv.x * aspect, uv.y);

  // Keep the middle calm: the lockup and the headline sit there.
  let centre = vec2f(uv.x - 0.5, uv.y - 0.5) * vec2f(aspect * 0.62, 0.9);
  let edge = smoothstep(0.16, 0.8, length(centre));

  var color = BG;
  // Far, mid, near — slower and smaller the further away they read.
  color += mix(GREEN, ORANGE, 0.35) * layer(p, 22.0, t * 0.35, 3.0, 0.06) * 0.16;
  color += ORANGE * layer(p, 38.0, t * 0.6, 11.0, 0.085) * 0.15;
  color += ORANGE * layer(p * 1.02, 64.0, t * 0.9, 23.0, 0.12) * 0.13;
  color = BG + (color - BG) * (0.35 + 0.65 * edge);

  color += (hash2(uv / params.texel) - 0.5) * 0.004;
  return vec4f(color, 1.0);
}
