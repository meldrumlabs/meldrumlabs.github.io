import { ClientLogo } from '@/components/home/ClientLogo'

/**
 * The one client on the landing page. Unboxed on purpose: the section rule and
 * whitespace do the framing, so the card reads as a printed page rather than a
 * container. Statement, not a door — there is no case study to read yet.
 */
const WORK = {
  client: 'Massive',
  engagement: 'Modern financial data infrastructure',
  blurb:
    'Real-time financial data infrastructure — reliable, high performance, and built to stay in production.',
  stack: ['Rust', 'Apache Arrow', 'DataFusion'],
  quote:
    'Meldrum Labs operates with a level of care and ownership that shows in the systems they build: reliable, performant, and built for the long term.',
  author: 'Quinton Pike',
  role: 'CEO, Massive',
}

const MONO = 'font-spaceMono text-[0.68rem] uppercase tracking-[0.16em] text-[var(--page-muted)]'

export function CaseStudyTeaser() {
  return (
    <div className="grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-20">
      <div>
        <div className="flex items-center gap-3">
          <span className={MONO}>With</span>
          <ClientLogo className="opacity-80" />
        </div>

        <h3 className="mt-7 text-3xl font-semibold leading-[1.05] tracking-tight text-[var(--page-heading)] md:text-4xl">
          {WORK.engagement}
        </h3>

        <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--page-muted)]">
          {WORK.blurb}
        </p>

        <ul className={`${MONO} mt-7 flex flex-wrap gap-x-4 gap-y-2`}>
          {WORK.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <blockquote className="relative">
        <span
          aria-hidden="true"
          className="absolute -left-7 -top-8 hidden select-none font-space text-7xl leading-none text-[var(--page-accent)]/40 md:block"
        >
          &ldquo;
        </span>
        <p className="font-space text-xl leading-[1.45] tracking-tight text-[var(--page-ink)] md:text-[1.65rem] md:leading-[1.4]">
          {WORK.quote}
        </p>
        <footer className="mt-8 flex items-center gap-3">
          <span className="h-px w-8 bg-[var(--page-accent)]/60" />
          <span className={MONO}>
            {WORK.author} — {WORK.role}
          </span>
        </footer>
      </blockquote>
    </div>
  )
}
