import BlogHeader from '@/components/BlogHeader'
import { FooterMarketing } from '@/components/FooterMarketing'
import { FadeInSection } from '@/components/FadeInSection'
import Link from 'next/link'

function SectionDivider() {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-8">
      <div className="h-px bg-gradient-to-r from-transparent via-iroh-gray-700 to-transparent" />
    </div>
  )
}

export default function Services() {
  return (
    <div className="bg-iroh-gray-900 text-iroh-gray-100">
      <BlogHeader />

      <main>
        {/* Hero */}
        <section className="max-w-3xl mx-auto px-6 md:px-8 pt-40 pb-24">
          <span className="text-2xs uppercase tracking-[0.25em] text-iroh-gray-500 font-medium">
            Services
          </span>
          <p className="mt-10 text-2xl md:text-3xl text-iroh-gray-300 leading-relaxed font-light max-w-xl">
            Meldrum Labs partners with a small number of teams to design, build, and harden real-time data infrastructure.
          </p>
        </section>

        <SectionDivider />

        {/* Tiers */}
        <section className="max-w-3xl mx-auto px-6 md:px-8 py-24">
          <FadeInSection>
            <span className="text-2xs uppercase tracking-[0.25em] text-iroh-gray-500 font-medium">
              Engagements
            </span>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Advisory */}
              <div className="group relative rounded-xl border border-iroh-gray-800 bg-iroh-gray-900/30 p-8 transition-all duration-500 hover:border-meldrum-green-500/20">
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-gradient-to-br from-meldrum-green-500/[0.03] to-transparent transition-opacity duration-500" />
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-meldrum-green-400 tracking-tight">
                    Advisory
                  </h2>
                  <p className="mt-4 text-sm text-iroh-gray-400 leading-relaxed">
                    Strategic guidance for teams with execution capacity that need senior validation on architecture and design.
                  </p>
                  <ul className="mt-8 space-y-3">
                    {[
                      'Architecture & design reviews',
                      'Performance & reliability audits',
                      'Technology selection guidance',
                      'Weekly or bi-weekly calls',
                      'Written recommendations',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-iroh-gray-300">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-meldrum-green-400/50" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Embedded Partner */}
              <div className="group relative rounded-xl border border-iroh-gray-800 bg-iroh-gray-900/30 p-8 transition-all duration-500 hover:border-meldrum-green-500/20">
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-gradient-to-br from-meldrum-green-500/[0.03] to-transparent transition-opacity duration-500" />
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-meldrum-green-400 tracking-tight">
                    Embedded Partner
                  </h2>
                  <p className="mt-4 text-sm text-iroh-gray-400 leading-relaxed">
                    Hands-on collaboration for teams building core infrastructure and needing senior ownership on critical systems.
                  </p>
                  <ul className="mt-8 space-y-3">
                    {[
                      'Hands-on architecture & development',
                      'Code review & pair programming',
                      'Production hardening',
                      'On-call support during rollout',
                      'Knowledge transfer',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-iroh-gray-300">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-meldrum-green-400/50" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <p className="mt-14 text-iroh-gray-400 leading-relaxed text-sm">
              Meldrum Labs only takes on a few selective partners to ensure quality and focus.
            </p>
          </FadeInSection>
        </section>

        <SectionDivider />

        {/* Capabilities */}
        <section className="max-w-3xl mx-auto px-6 md:px-8 py-24">
          <FadeInSection>
            <span className="text-2xs uppercase tracking-[0.25em] text-iroh-gray-500 font-medium">
              Capabilities
            </span>
          </FadeInSection>

          <div className="mt-12 space-y-6">
            {[
              {
                label: 'Stream Processing',
                terms: 'Apache Kafka · Apache Flink · Event-driven architecture · Backpressure & flow control',
              },
              {
                label: 'Distributed Systems',
                terms: 'Kubernetes · Rust · Production operations · Observability',
              },
              {
                label: 'Storage & Query Engines',
                terms: 'Apache Arrow · Apache DataFusion · µWheel · Embedded aggregations',
              },
              {
                label: 'Deterministic Simulation Testing',
                terms: 'Antithesis · FoundationDB-style testing · Fault injection · Chaos engineering',
              },
            ].map((domain) => (
              <div key={domain.label} className="md:flex md:items-baseline md:gap-8">
                <h3 className="text-2xs uppercase tracking-[0.25em] text-iroh-gray-500 font-medium shrink-0 w-56">
                  {domain.label}
                </h3>
                <p className="mt-1 md:mt-0 text-base text-iroh-gray-300 leading-relaxed font-light">
                  {domain.terms}
                </p>
              </div>
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* Contact */}
        <section className="max-w-3xl mx-auto px-6 md:px-8 py-24 pb-32">
          <FadeInSection>
            <span className="text-2xs uppercase tracking-[0.25em] text-iroh-gray-500 font-medium">
              Contact
            </span>
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <p className="mt-8 text-2xl md:text-3xl text-iroh-gray-300 leading-relaxed font-light max-w-xl">
              If you are building something hard and need a build partner, let&apos;s talk.
            </p>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <div className="mt-12">
              <Link
                href="mailto:contact@meldrumlabs.com"
                className="group inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-iroh-gray-900 bg-meldrum-green-400 rounded-md hover:bg-meldrum-green-300 transition-all duration-300 hover:shadow-lg hover:shadow-meldrum-green-400/20"
              >
                Say hello
                <svg
                  className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </FadeInSection>
        </section>
      </main>

      <FooterMarketing />
    </div>
  )
}
