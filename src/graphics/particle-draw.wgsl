// Expands each particle into a tiny screen-aligned quad and shades it as a soft
// additive dot. At ~15k instances the mark reads as a dense field of light
// rather than as individual sprites.

struct Particle {
  pos: vec4f,    // xyz position, w seed
  vel: vec4f,    // xyz velocity, w brightness
  goal: vec4f,    // xyz logo target
  start: vec4f,  // xyz scattered start
}

struct View {
  resolution: vec2f,
  dpr: f32,
  sizeScale: f32,
  ink: f32,
}

@group(0) @binding(0) var<storage, read> particles: array<Particle>;
@group(0) @binding(1) var<uniform> view: View;

struct VertexOut {
  @builtin(position) position: vec4f,
  @location(0) local: vec2f,
  @location(1) intensity: f32,
  @location(2) tint: f32,
}

@vertex
fn vs_main(@builtin(vertex_index) vertex: u32, @builtin(instance_index) instance: u32) -> VertexOut {
  var corners = array<vec2f, 6>(
    vec2f(-1.0, -1.0), vec2f(1.0, -1.0), vec2f(-1.0, 1.0),
    vec2f(-1.0, 1.0), vec2f(1.0, -1.0), vec2f(1.0, 1.0),
  );

  let p = particles[instance];
  let seed = p.pos.w;
  let depth = p.goal.z;

  var out: VertexOut;
  out.local = corners[vertex];
  // Nearer particles sit a touch larger and brighter; a few carry a cream tint
  // like the highlights on the printed mark.
  let diameter = (2.4 + 2.2 * fract(seed * 37.0)) * (1.0 - depth * 1.5) * view.dpr * view.sizeScale;
  out.position = vec4f(p.pos.xy + out.local * diameter / view.resolution, 0.0, 1.0);
  out.intensity = p.vel.w * (1.0 - depth * 0.8);
  out.tint = step(0.88, fract(seed * 13.7));
  return out;
}

@fragment
fn fs_main(in: VertexOut) -> @location(0) vec4f {
  let distance = length(in.local);
  let alpha = pow(1.0 - smoothstep(0.0, 1.0, distance), 1.6);
  if (alpha <= 0.0) {
    discard;
  }
  let orange = vec3f(0.949, 0.451, 0.098); // #F28C16, the mark's own orange
  let cream = vec3f(0.988, 0.965, 0.902);
  var color = mix(orange, cream, in.tint * 0.85);

  // Light: additive blending, so overlapping sprites stack into light.
  // Ink: the coverage goes in alpha and normal blending lays it on the paper.
  if (view.ink > 0.5) {
    // Solid ink, coverage pushed up so the stipple reads as a printed dot
    // instead of a pale wash. There is no additive stacking to help it.
    return vec4f(0.85, 0.33, 0.07, clamp(alpha * in.intensity * 1.7, 0.0, 1.0));
  }
  return vec4f(color * in.intensity * alpha, 1.0);
}
