// Ordered-dither field: a two-ink halftone of a slow, edge-weighted glow.
// Print texture on a near-black ground — graphic where the currents field is
// soft. Same uniform block as backdrop.wgsl so the engine can swap shaders.

struct Params {
  time: f32,
  texel: vec2f,
  pad: f32,
}

@group(0) @binding(0) var<uniform> params: Params;

const BG: vec3f = vec3f(0.094, 0.094, 0.106); // #18181B
const ORANGE: vec3f = vec3f(0.949, 0.549, 0.086); // #F28C16
const CREAM: vec3f = vec3f(0.965, 0.929, 0.851);

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
  for (var i = 0; i < 3; i += 1) {
    v += a * vnoise(q);
    q = q * 2.07 + vec2f(9.1, 3.7);
    a *= 0.5;
  }
  return v;
}

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
  let t = params.time * 0.04;
  let p = vec2f(uv.x * aspect, uv.y);

  // Everything fades away from the middle, where the lockup sits.
  let centre = vec2f(uv.x - 0.5, uv.y - 0.5) * vec2f(aspect * 0.6, 0.9);
  let radial = smoothstep(0.24, 0.95, length(centre));
  // Clear of the nav and the footer: dots behind type are noise, not texture.
  let band = smoothstep(0.0, 0.24, uv.y) * smoothstep(0.0, 0.13, 1.0 - uv.y);
  let drift = fbm(p * 1.8 + vec2f(t, -t * 0.5));
  // Coverage, not brightness: at most ~40% of cells ink over at the corners.
  let value = radial * band * (0.08 + 0.34 * drift);

  // Cells sit on the pixel grid, so the dither never crawls or shimmers.
  let cell = vec2u(floor(uv * (1.0 / params.texel) / 3.0));
  let threshold = bayer4(cell);

  var color = BG;
  if (value > threshold) {
    // Two inks: orange body, cream where the field is densest.
    color = mix(ORANGE, CREAM, smoothstep(0.3, 0.42, value));
  }

  color += (hash2(uv / params.texel) - 0.5) * 0.004;
  return vec4f(color, 1.0);
}
