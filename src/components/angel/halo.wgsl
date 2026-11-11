struct Params {
  time: f32,
  texel: vec2f,
  pointer: vec2f,
}
@group(0) @binding(0) var<uniform> params: Params;

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
  var a = 0.55;
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
  let t = params.time * 0.12;
  let aspect = params.texel.y / params.texel.x; // width/height
  let p = vec2f(uv.x * aspect, uv.y);

  // Pearl base
  var col = vec3f(0.975, 0.97, 0.958);

  // Iridescent veils — tint toward pastel gold / rose / sage
  let gold = vec3f(0.984, 0.792, 0.451); // meldrumOrange-300
  let rose = vec3f(1.0, 0.702, 0.851);   // meldrumPink-100
  let sage = vec3f(0.792, 0.886, 0.733); // meldrumGreen-200
  let veil = fbm(p * 2.2 + vec2f(t, -t * 0.6));
  let veil2 = fbm(p * 1.4 - vec2f(t * 0.7, t * 0.4) + 40.0);
  col = mix(col, gold, smoothstep(0.5, 0.95, veil) * 0.35);
  col = mix(col, rose, smoothstep(0.5, 0.95, veil2) * 0.28);
  col = mix(col, sage, smoothstep(0.55, 1.0, fbm(p * 1.8 + veil + t * 0.3)) * 0.22);

  // The sun above, breathing
  let sun = vec2f(0.5 * aspect, 1.08);
  let toFrag = p - sun;
  let d = length(toFrag);
  let breathe = 0.85 + 0.15 * sin(params.time * 0.5);
  col += vec3f(1.0, 0.95, 0.82) * exp(-d * d * 2.2) * 0.28 * breathe;

  // Crepuscular rays — angular shafts sweeping slowly around the sun
  let ang = atan2(toFrag.x, -toFrag.y);
  let shafts = fbm(vec2f(ang * 4.0 + params.time * 0.07, d * 1.5 - params.time * 0.05));
  let rayMask = smoothstep(0.45, 0.85, shafts) * exp(-d * 1.6);
  col += vec3f(1.0, 0.94, 0.78) * rayMask * 0.18 * smoothstep(0.15, 0.9, uv.y);

  // Cursor halo — a warm presence that follows the visitor
  let pd = distance(uv, params.pointer);
  col += vec3f(1.0, 0.92, 0.78) * exp(-pd * pd * 9.0) * 0.20;

  // Debanding grain (in pixel space)
  col += (hash2(uv / params.texel) - 0.5) * 0.012;

  return vec4f(col, 1.0);
}
