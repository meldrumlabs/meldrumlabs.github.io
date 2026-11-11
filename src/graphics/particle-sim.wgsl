// One thread per particle: springs it from its scattered start onto its place
// in the logo, lets a few keep drifting once assembled, pushes it away from the
// cursor, and writes the brightness the draw pass emits. In place — each
// invocation touches only its own element, so no ping-pong buffers are needed.

struct Particle {
  pos: vec4f,    // xyz position, w seed
  vel: vec4f,    // xyz velocity, w brightness (read by the draw pass)
  goal: vec4f,    // xyz logo target
  start: vec4f,  // xyz scattered start
}

struct Params {
  pointer: vec2f,
  time: f32,
  intro: f32,
  dt: f32,
  repel: f32,
  repelRadius: f32,
  count: u32,
  idle: f32,
  brightness: f32,
  pad0: f32,
  pad1: f32,
}

@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var<storage, read_write> particles: array<Particle>;

const TAU: f32 = 6.28318530718;

fn easeOutCubic(t: f32) -> f32 {
  let x = clamp(t, 0.0, 1.0);
  return 1.0 - pow(1.0 - x, 3.0);
}

@compute @workgroup_size(64)
fn cs_main(@builtin(global_invocation_id) id: vec3u) {
  let index = id.x;
  if (index >= params.count) {
    return;
  }

  var p = particles[index];
  let seed = p.pos.w;

  // Staggered formation: every particle leaves the volume on its own beat, so
  // the mark assembles as a wave instead of snapping into place.
  let pull = easeOutCubic((params.intro - seed * 0.35) / 0.65);

  // Unformed, everything drifts like loose data; formed, only a few percent
  // keep moving along the geometry.
  let drifter = select(0.0, 1.0, seed > 0.94);
  let wander = mix(0.012, 0.002, pull) + drifter * 0.006 * pull;
  let phase = seed * TAU * 40.0;
  let drift = vec3f(
    sin(params.time * 0.6 + phase),
    cos(params.time * 0.5 + phase * 1.7),
    sin(params.time * 0.35 + phase * 0.6),
  ) * wander * params.idle;

  let home = mix(p.start.xyz, p.goal.xyz, pull) + drift;

  // Spring home, damped enough to settle rather than bounce. Stiffer once the
  // mark exists so the silhouette stays exact.
  let stiffness = mix(7.0, 30.0, pull);
  let damping = mix(2.6, 7.0, pull);
  var velocity = p.vel.xyz + (home - p.pos.xyz) * stiffness * params.dt;
  velocity *= exp(-damping * params.dt);

  // Cursor repulsion: weak and local, and the spring above always brings the
  // particle back to where it belongs.
  let away = p.pos.xy - params.pointer;
  let near = 1.0 - smoothstep(0.0, params.repelRadius, length(away));
  let push = near * near * params.repel;
  velocity = vec3f(velocity.xy + normalize(away + vec2f(1e-5)) * push * params.dt, velocity.z);

  p.pos = vec4f(p.pos.xyz + velocity * params.dt, p.pos.w);
  p.vel = vec4f(velocity, p.vel.w);

  // Brightness: a per-particle base, a stream travelling across the mark, and
  // a glow on whatever the cursor is pushing.
  let wave = sin(params.time * 0.9 - (p.goal.x * 1.7 + p.goal.y * 2.3));
  let stream = smoothstep(0.9, 1.0, wave);
  var intensity = (0.55 + 0.45 * fract(seed * 91.7)) * (1.0 + stream * 1.4 + near * 1.6);
  // No fade tied to the intro: the first frame of the loop has to carry light,
  // otherwise the boot screen is blank between the ghost mark and the cloud.
  intensity *= mix(0.55, 1.0, pull) * params.brightness;
  p.vel.w = intensity;

  particles[index] = p;
}
