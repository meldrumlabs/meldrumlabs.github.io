import { Halo } from '@/components/angel/Halo'
import { Reveal } from '@/components/angel/Reveal'

export const metadata = {
  title: 'Meldrum Labs — Angel concept',
  description: 'A light, ethereal redesign concept for Meldrum Labs.',
}

const products = [
  {
    name: 'Consultancy',
    kind: 'Services',
    glow: 'rgba(248, 194, 116, 0.35)', // gold
    copy: 'A build partner that treats your stack like their own. Data systems, Rust, real-time infrastructure — built for the long term.',
    href: '/services',
  },
  {
    name: 'Products',
    kind: 'Studio',
    glow: 'rgba(255, 179, 217, 0.35)', // rose
    copy: 'Our own instruments, forged in the same workshop. Software we ship, own, and maintain.',
    href: '/',
  },
]

export default function AngelPage() {
  return (
    <div className="relative min-h-screen bg-[#FCFBF7] font-sans text-[#221F1A] antialiased">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <div className="absolute inset-0">
          <Halo />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-[#8a8378]">
              Meldrum Labs
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <h1 className="mt-6 max-w-4xl text-6xl font-extralight leading-[0.95] tracking-tighter sm:text-7xl md:text-8xl">
              Software,
              <br />
              <span className="font-light italic text-[#6b6252]">
                built with care.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.28}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-[#6b6252]">
              A software factory. Consultancy for companies who need a build
              partner — and products of our own, made in the same light.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-12 flex items-center gap-8">
              <a
                href="/services"
                className="group inline-flex items-center rounded-full border border-[#221F1A]/10 bg-white/50 px-6 py-3 text-sm font-medium backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/80 hover:shadow-[0_16px_40px_-16px_rgba(248,194,116,0.5)]"
              >
                How we work
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="#workshop"
                className="text-sm text-[#8a8378] underline decoration-[#8a8378]/30 underline-offset-4 transition-colors hover:text-[#221F1A]"
              >
                The workshop
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Workshop ─────────────────────────────────────── */}
      <section id="workshop" className="relative mx-auto max-w-6xl px-6 py-32 md:px-10">
        <Reveal>
          <div className="mb-14 flex items-baseline gap-4">
            <span className="text-sm tabular-nums text-[#b5ad9e]">01</span>
            <h2 className="text-2xl font-light tracking-tight md:text-3xl">
              Two doors, one workshop
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={0.1 + i * 0.12}>
              <a
                href={p.href}
                className="group block rounded-3xl border border-[#221F1A]/[0.06] bg-white/60 p-10 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:bg-white/90 hover:shadow-[0_30px_80px_-30px_var(--glow)]"
                style={{ ['--glow']: p.glow }}
              >
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#b5ad9e]">
                  {p.kind}
                </p>
                <h3 className="mt-4 text-3xl font-light tracking-tight">
                  {p.name}
                </h3>
                <p className="mt-4 leading-relaxed text-[#6b6252]">{p.copy}</p>
                <span className="mt-8 inline-block text-sm text-[#8a8378] transition-transform duration-300 group-hover:translate-x-1">
                  Enter →
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Testimonial ──────────────────────────────────── */}
      <section className="relative mx-auto max-w-4xl px-6 pb-32 md:px-10">
        <Reveal>
          <figure className="text-center">
            <blockquote className="text-2xl font-light leading-snug tracking-tight text-[#4a4438] md:text-3xl">
              “Meldrum Labs operates with a level of care and ownership that
              shows in the systems they build.”
            </blockquote>
            <figcaption className="mt-6 text-sm text-[#8a8378]">
              Quinton Pike — CEO, Massive
            </figcaption>
          </figure>
        </Reveal>
      </section>

      {/* ── Footer wisp ──────────────────────────────────── */}
      <footer className="border-t border-[#221F1A]/[0.06] py-10 text-center text-xs tracking-[0.2em] text-[#b5ad9e] uppercase">
        Meldrum Labs — concept
      </footer>
    </div>
  )
}
