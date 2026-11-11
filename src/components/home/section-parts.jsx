import Link from 'next/link'
import { FadeInSection } from '@/components/FadeInSection'

/**
 * Every homepage section sits on the same measure and rhythm.
 *
 * The reveal lives on an inner element: a transformed section would move after
 * the browser has already resolved an anchor jump into it.
 */
export function Section({ id, children, className = '', divider = true }) {
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-6xl scroll-mt-28 px-6 py-24 md:px-10 md:py-32 ${
        divider ? 'border-t border-iroh-gray-800/60' : ''
      } ${className}`}
    >
      <FadeInSection>{children}</FadeInSection>
    </section>
  )
}

/** Numbered eyebrow + section title + the one-line framing. */
export function SectionHeading({ index, title, intro }) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
      <div className="flex items-baseline gap-4">
        <span className="font-spaceMono text-sm tabular-nums text-[var(--page-muted)]">{index}</span>
        <h2 className="text-2xl font-bold tracking-tight text-[var(--page-heading)] md:text-3xl">
          {title}
        </h2>
      </div>
      {intro && (
        <p className="max-w-md text-sm leading-relaxed text-[var(--page-muted)] lg:text-right">{intro}</p>
      )}
    </div>
  )
}

/** The site's one link treatment: underlined label, arrow that leans in. */
export function ArrowLink({ href, children, muted = false, className = '' }) {
  const tone = muted
    ? 'text-[var(--page-muted)] hover:text-[var(--page-ink)]'
    : 'text-[var(--page-link)] hover:text-[var(--page-ink)]'
  const rule = muted
    ? 'bg-[var(--page-muted)] opacity-30 group-hover:opacity-50'
    : 'bg-[var(--page-link)] opacity-40 group-hover:opacity-60'
  const external = href.startsWith('http')

  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`group inline-flex items-center text-sm font-medium transition-colors duration-300 ${tone} ${className}`}
    >
      <span className="relative">
        {children}
        <span className={`absolute -bottom-1 left-0 h-px w-full transition-colors duration-300 ${rule}`} />
      </span>
      <svg
        className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
      </svg>
    </a>
  )
}

/** Same treatment, for navigation that should stay a client-side route. */
export function ArrowRouteLink({ href, children, muted = false }) {
  const tone = muted
    ? 'text-[var(--page-muted)] hover:text-[var(--page-ink)]'
    : 'text-[var(--page-link)] hover:text-[var(--page-ink)]'

  return (
    <Link href={href} className={`group inline-flex items-center text-sm font-medium transition-colors duration-300 ${tone}`}>
      <span className="relative">
        {children}
        <span
          className={`absolute -bottom-1 left-0 h-px w-full transition-opacity duration-300 ${
            muted ? 'bg-[var(--page-muted)] opacity-30' : 'bg-[var(--page-link)] opacity-40'
          }`}
        />
      </span>
      <svg
        className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
      </svg>
    </Link>
  )
}
