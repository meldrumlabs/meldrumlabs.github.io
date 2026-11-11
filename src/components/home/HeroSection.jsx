import { HeroParticles } from '@/components/home/HeroParticles'

/**
 * The landing page: the particle mark and the wordmark as one lockup, filling
 * the screen.
 *
 * The lockup's font size sets the mark and the wordmark is sized relative to it
 * (1.08em), so the two keep their proportions at every width. The mark is 2.92em
 * wide against a 1.85em-tall cap, matching the brand's own wordmark file.
 */
export function HeroSection() {
  return (
    <section className="relative flex w-full flex-1 flex-col items-center justify-center overflow-hidden">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-32 text-center md:px-10">
        <div
          className="flex animate-rise items-center justify-center gap-[0.45em] motion-reduce:animate-none"
          style={{ fontSize: 'clamp(1.6rem, 8.2vw, 5.25rem)' }}
        >
          <HeroParticles className="w-[2.92em] shrink-0" />
          <h1 className="whitespace-nowrap font-space font-semibold text-[1.08em] tracking-[-0.03em] text-[var(--page-heading)]">
            Meldrum Labs
          </h1>
        </div>
      </div>
    </section>
  )
}
