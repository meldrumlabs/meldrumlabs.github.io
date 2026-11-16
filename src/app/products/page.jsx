import { HeaderSparse } from '@/components/HeaderSparse'
import { FooterMarketing } from '@/components/FooterMarketing'
import { ArrowLink, Section, SectionHeading } from '@/components/home/section-parts'

export const metadata = {
  title: 'Products',
  description: 'Software Meldrum Labs builds for itself, alongside client work.',
}

/**
 * The portfolio. Fill this list as things ship — the page is written to work
 * with nothing in it, so it never needs a "coming soon" placeholder page.
 *
 * status: 'shipped' | 'beta' | 'lab'
 */
const products = []

const STATUS_LABEL = {
  shipped: 'Shipped',
  beta: 'Beta',
  lab: 'In the lab',
}

export default function Products() {
  return (
    <div className="relative font-space text-[var(--page-ink)]">
      <HeaderSparse />

      <main className="flex flex-col">
        <Section divider={false}>
          <div className="relative mt-16 max-w-3xl md:mt-24">
            {/* Editorial margin line */}
            <div className="absolute -left-6 top-0 bottom-0 w-px bg-iroh-gray-800/60 md:-left-10" />

            <h1 className="text-5xl font-bold leading-[0.9] tracking-tighter text-[var(--page-heading)] sm:text-6xl md:text-7xl">
              Products
            </h1>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-[var(--page-muted)] md:text-lg">
              The other half of the workshop: tools we build for ourselves, held to the same
              standard as client work.
            </p>
          </div>
        </Section>

        <Section id="index">
          <SectionHeading
            index="01"
            title="Index"
            intro="Everything we have released, and what is still on the bench."
          />

          {products.length === 0 ? (
            <div className="mt-10 max-w-2xl border-t border-[var(--page-rule)] pt-8">
              <p className="text-lg leading-relaxed text-[var(--page-muted)] md:text-xl">
                Nothing published yet. Two are on the bench.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--page-muted)]">
                Client systems are the active line of work. The products follow from the same
                problems — if you want to see one before it ships, ask.
              </p>
            </div>
          ) : (
            <ul className="mt-10 border-t border-[var(--page-rule)]">
              {products.map((product) => (
                <li key={product.name} className="border-b border-[var(--page-rule)]">
                  <div className="flex flex-col gap-2 py-8 md:flex-row md:items-baseline md:justify-between md:gap-12">
                    <div>
                      <div className="flex items-baseline gap-3">
                        <h3 className="text-xl font-semibold tracking-tight text-[var(--page-heading)] md:text-2xl">
                          {product.name}
                        </h3>
                        <span className="font-spaceMono text-[0.68rem] uppercase tracking-[0.16em] text-[var(--page-muted)]">
                          {STATUS_LABEL[product.status]}
                        </span>
                      </div>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--page-muted)]">
                        {product.blurb}
                      </p>
                    </div>
                    {product.href && <ArrowLink href={product.href}>Open</ArrowLink>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section id="services">
          <SectionHeading
            index="02"
            title="Client work"
            intro="The consultancy side: systems built to someone else's deadline."
          />
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-[var(--page-muted)] md:text-xl">
            Research-level depth applied to production infrastructure — Rust, distributed systems,
            stream processing, database internals.
          </p>
          <div className="mt-10">
            <ArrowLink href="/services">What we do for clients</ArrowLink>
          </div>
        </Section>

        <Section id="contact">
          <SectionHeading index="03" title="Contact" />
          <p className="mt-10 max-w-xl text-2xl font-light leading-relaxed text-[var(--page-muted)] md:text-3xl">
            Building something adjacent? We are usually happy to talk shop.
          </p>
          <div className="mt-10">
            <ArrowLink href="mailto:contact@meldrumlabs.com">Get in touch</ArrowLink>
          </div>
        </Section>
      </main>

      <FooterMarketing />
    </div>
  )
}
