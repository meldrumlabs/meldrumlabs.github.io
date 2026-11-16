import { HeroParticles } from '@/components/home/HeroParticles'

/**
 * The landing page: the particle mark and the wordmark as one lockup, a single
 * line under it saying what the company does, and two ways in.
 *
 * The lockup's font size sets the mark and the wordmark is sized relative to it
 * (1.08em), so the two keep their proportions at every width. The mark is 2.92em
 * wide against a 1.85em-tall cap, matching the brand's own wordmark file. The
 * label and actions are offset by that same width at every breakpoint, so they
 * hang off the wordmark rather than the mark — the whole lockup is centred and
 * the tagline/buttons centre under the wordmark at every width.
 */
const MARK_OFFSET = 'pl-[3.37em]'

export function HeroSection() {
  return (
    <section className="relative flex w-full flex-1 flex-col items-center justify-center overflow-hidden">
      {/* Warms the centre of the paper so the lockup sits in light, not on flat colour. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(58% 46% at 50% 44%, color-mix(in oklab, var(--page-accent) 5%, transparent), transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-24 text-center sm:pt-32 md:px-10">
        <div
          className="flex flex-col items-center"
          style={{ fontSize: 'clamp(1.6rem, 8.2vw, 5.25rem)' }}
        >
          <div className="flex animate-rise items-center justify-center gap-[0.45em] motion-reduce:animate-none">
            <HeroParticles className="w-[2.92em] shrink-0" />
            <h1 className="whitespace-nowrap font-space font-semibold text-[1.08em] tracking-[-0.03em] text-[var(--page-heading)]">
              Meldrum Labs
            </h1>
          </div>

          <div className={`-mt-[0.15em] animate-rise motion-reduce:animate-none ${MARK_OFFSET}`} style={{ animationDelay: '90ms' }}>
            <p className="font-space text-[0.6rem] font-medium uppercase leading-[1.5] tracking-[0.16em] text-[var(--page-heading)] sm:whitespace-nowrap sm:text-[clamp(0.72rem,1.05vw,0.95rem)] sm:leading-[1.6] sm:tracking-[0.18em] md:-mt-8">
              Reliable Data Systems, Built with Care
              <span aria-hidden="true" className="text-[var(--page-accent)]">
                .
              </span>
            </p>
          </div>

          {/* The offset lives in `em` of the lockup's font size, so it must not sit
              on an element that sets its own text size — hence the extra wrapper. */}
          <div
            className={`mt-[0.6em] animate-rise motion-reduce:animate-none md:mt-7 ${MARK_OFFSET}`}
            style={{ animationDelay: '180ms' }}
          >
            <div className="flex flex-wrap items-center justify-center gap-6 font-space text-xs font-semibold uppercase tracking-[0.14em]">
              <a
                href="#work"
                className="bg-[var(--page-ink)] px-7 py-3.5 text-[var(--page-bg)] shadow-[3px_3px_0_var(--page-accent)] transition-[transform,box-shadow] hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[1.5px_1.5px_0_var(--page-accent)]"
              >
                Our work
              </a>
              <a
                href="mailto:contact@meldrumlabs.com"
                className="group inline-flex items-center px-0 py-3.5 text-[var(--page-ink)] transition-colors hover:text-[var(--page-link)]"
              >
                Let&rsquo;s build
                <svg className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
