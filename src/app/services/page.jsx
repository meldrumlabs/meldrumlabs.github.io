import { HeaderSparse } from '@/components/HeaderSparse'
import { FooterMarketing } from '@/components/FooterMarketing'
import { FadeInSection } from '@/components/FadeInSection'
import Link from 'next/link'

export const metadata = {
  title: 'Services',
  description: 'How Meldrum Labs partners with companies to build data infrastructure.',
}

export default function Services() {
  return (
    <div className="relative bg-iroh-gray-900 text-iroh-gray-100 font-space">
      <HeaderSparse />

      <main className="flex flex-col">
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 md:px-10 w-full pt-32 md:pt-40 pb-12">
          <div className="max-w-3xl relative">
            {/* Editorial margin line */}
            <div className="absolute -left-6 md:-left-10 top-0 bottom-0 w-px bg-iroh-gray-800/60" />

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-[0.9] text-meldrum-green-400">
              Services
            </h1>

            <p className="mt-8 text-base md:text-lg text-meldrum-orange-400 max-w-xl leading-relaxed">
              Meldrum Labs partners with a small number of companies to design, build, and harden real-time data infrastructure.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 w-full">
          <div className="border-t border-iroh-gray-800/60" />
        </div>

        {/* 01 — Capabilities */}
        <section className="max-w-6xl mx-auto px-6 md:px-10 w-full py-24 md:py-32">
          <FadeInSection>
            <div className="max-w-3xl relative">
              {/* Editorial margin line */}
              <div className="absolute -left-6 md:-left-10 top-0 bottom-0 w-px bg-iroh-gray-800/60" />

              <div className="mb-10 flex items-baseline gap-4">
                <span className="text-sm font-medium text-iroh-gray-600 tabular-nums">01</span>
                <h2 className="text-xl md:text-2xl font-bold text-meldrum-green-400 tracking-tight">
                  Capabilities
                </h2>
              </div>

              <FadeInSection delay={0.1}>
                <p className="mt-12 text-lg md:text-xl text-meldrum-blue-300 leading-relaxed max-w-2xl">
                  Meldrum Labs combines a background in research with hands-on experience building and running systems in production. We have deep expertise in the <span className="text-meldrum-pink-100 font-medium">Rust</span> ecosystem and a strong command of <span className="text-meldrum-pink-100 font-medium">distributed systems</span>, <span className="text-meldrum-pink-100 font-medium">stream processing</span>, and <span className="text-meldrum-pink-100 font-medium">database internals</span>.
                </p>
              </FadeInSection>
            </div>
          </FadeInSection>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 w-full">
          <div className="border-t border-iroh-gray-800/60" />
        </div>

        {/* 02 — Engagements */}
        <section className="max-w-6xl mx-auto px-6 md:px-10 w-full py-24 md:py-32">
          <FadeInSection>
            <div className="mb-10 flex items-baseline gap-4">
              <span className="text-sm font-medium text-iroh-gray-600 tabular-nums">02</span>
              <h2 className="text-xl md:text-2xl font-bold text-meldrum-green-400 tracking-tight">
                Engagements
              </h2>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Advisory */}
              <div className="group relative rounded-xl p-8 transition-all duration-500 hover:-translate-y-px">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-meldrum-orange-400 tracking-tight">
                    Advisor
                  </h3>
                  <p className="mt-4 text-sm text-meldrum-blue-300 leading-relaxed">
                    Independent review of internal systems and architecture guidance for new planned infrastructure.
                  </p>
                  <p className="mt-3 text-xs text-meldrum-pink-100 italic">
                    For systems where getting it right the first time matters.
                  </p>

                </div>
              </div>

              {/* Build partner */}
              <div className="group relative rounded-xl p-8 transition-all duration-500 hover:-translate-y-px">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-meldrum-orange-400 tracking-tight">
                    Build Partner
                  </h3>
                  <p className="mt-4 text-sm text-meldrum-blue-300 leading-relaxed">
                    A selective, deep engagement for companies building core infrastructure where the stakes are high and ownership matters.
                  </p>
                  <p className="mt-3 text-xs text-meldrum-pink-100 italic">
                    An extension of your team, not a vendor on the sidelines.
                  </p>

                </div>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <div className="mt-14 text-center">
              <p className="text-sm text-iroh-gray-400 leading-relaxed">
                Meldrum Labs takes on a small number of partners at a time — Selective engagement. Undivided focus.
              </p>
            </div>
          </FadeInSection>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 w-full">
          <div className="border-t border-iroh-gray-800/60" />
        </div>

        {/* 03 — Contact */}
        <section className="max-w-6xl mx-auto px-6 md:px-10 w-full py-24 md:py-32 pb-32">
          <FadeInSection>
            <div className="mb-10 flex items-baseline gap-4">
              <span className="text-sm font-medium text-iroh-gray-600 tabular-nums">03</span>
              <h2 className="text-xl md:text-2xl font-bold text-meldrum-green-400 tracking-tight">
                Contact
              </h2>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <p className="mt-8 text-2xl md:text-3xl text-meldrum-blue-300 leading-relaxed font-light max-w-xl">
              If you are building something that matters, let&apos;s talk.
            </p>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <div className="mt-12">
              <Link
                href="mailto:contact@meldrumlabs.com"
                className="group inline-flex items-center text-sm font-medium text-meldrum-pink-100 hover:text-meldrum-pink-200 transition-colors duration-300"
              >
                <span className="relative">
                  Start a conversation
                  <span className="absolute left-0 -bottom-1 w-full h-px bg-meldrum-pink-100/40 group-hover:bg-meldrum-pink-200/60 transition-colors duration-300" />
                </span>
                <svg
                  className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
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
