// Cursor warmth: a soft pool of light on the stock near the pointer. Shared by
// every paper background, so it is a modifier rather than its own look.

export fn warmPool(uv: vec2f, aspect: f32, pointer: vec2f, strength: f32) -> vec3f {
  // Distance in aspect-corrected space, so the pool stays round on any screen.
  let p = vec2f(uv.x * aspect, uv.y);
  let q = vec2f(pointer.x * aspect, pointer.y);
  let d = length(p - q);
  // Warmth is less blue, not more light: adding light to near-white paper just
  // clips to white and loses the tint.
  let falloff = exp(-d * d * 12.0) * strength;
  return vec3f(0.022, 0.006, -0.05) * falloff;
}
