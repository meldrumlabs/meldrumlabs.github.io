// A dim field of drifting data behind the landing page: slow currents sheared
// into long horizontal streaks, pushed to the edges so the middle stays clean
// for type. Deliberately dark — atmosphere, not decoration.

struct Params {
  time: f32,
  texel: vec2f,
  pad: f32,
}

@group(0) @binding(0) var<uniform> params: Params;

// #18181B, the page's own background.
const BG: vec3f = vec3f(0.094, 0.094, 0.106);
const GREEN: vec3f = vec3f(0.545, 0.722, 0.412); // #8BB869
const ORANGE: vec3f = vec3f(0.949, 0.549, 0.086); // #E08C16

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

@fragment
fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let t = params.time * 0.03;
  let aspect = params.texel.y / params.texel.x;
  let p = vec2f(uv.x * aspect, uv.y);

  // Two currents; the second shears the first into long horizontal streaks.
  let current = vec2f(
    fbm(p * 1.3 + vec2f(t, -t * 0.4)),
    fbm(p * 1.3 - vec2f(t * 0.3, -t * 0.5) + 13.0),
  );
  let streaks = fbm(vec2f(p.x * 0.55 + t * 0.9, p.y * 7.0 + current.x * 3.2) + current.y);

  let ridge = smoothstep(0.52, 0.9, streaks);

  // Keep the middle calm: the lockup and the headline sit there.
  let centre = vec2f(uv.x - 0.5, uv.y - 0.5) * vec2f(aspect * 0.62, 0.9);
  let edge = smoothstep(0.18, 0.85, length(centre));

  let tint = mix(GREEN, ORANGE, smoothstep(0.25, 0.85, current.x));

  var color = BG;
  color += tint * ridge * edge * 0.14;
  color += tint * edge * edge * 0.03;
  // Debanding grain
  color += (hash2(uv / params.texel) - 0.5) * 0.004;

  return vec4f(color, 1.0);
}
