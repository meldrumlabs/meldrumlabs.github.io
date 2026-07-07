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

            <p className="mt-8 text-base md:text-lg text-iroh-gray-400 max-w-xl leading-relaxed">
              Meldrum Labs partners with a small number of companies to design, build, and harden real-time data infrastructure.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 w-full">
          <div className="bg-gradient-to-r from-transparent via-iroh-gray-800/60 to-transparent h-px" />
        </div>

        {/* 01 — Capabilities */}
        <section className="max-w-6xl mx-auto px-6 md:px-10 w-full py-24 md:py-32">
          <FadeInSection>
            <div className="max-w-3xl relative">
              {/* Editorial margin line */}
              <div className="absolute -left-6 md:-left-10 top-0 bottom-0 w-px bg-iroh-gray-800/60" />

              <div className="mb-10 flex items-baseline gap-4">
                <span className="text-sm font-medium text-iroh-gray-600 tabular-nums font-spaceMono">01</span>
                <h2 className="text-xl md:text-2xl font-bold text-meldrum-green-400 tracking-tight">
                  Capabilities
                </h2>
              </div>

              <FadeInSection delay={0.1}>
                <p className="mt-12 text-lg md:text-xl text-iroh-gray-400 leading-relaxed max-w-2xl">
                  Meldrum Labs combines research-level depth with hands-on experience building production systems. We specialize in Rust, distributed systems, stream processing, database internals, and high-performance infrastructure where correctness, reliability, and latency matter.
                </p>
              </FadeInSection>
            </div>
          </FadeInSection>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 w-full">
          <div className="bg-gradient-to-r from-transparent via-iroh-gray-800/60 to-transparent h-px" />
        </div>

        {/* 02 — Engagements */}
        <section className="max-w-6xl mx-auto px-6 md:px-10 w-full py-24 md:py-32">
          <FadeInSection>
            <div className="max-w-3xl">
              <div className="mb-6 flex items-baseline gap-4">
                <span className="text-sm font-medium text-iroh-gray-600 tabular-nums font-spaceMono">02</span>
                <h2 className="text-3xl md:text-4xl font-bold text-meldrum-green-400 tracking-tight">
                  How we work
                </h2>
              </div>
              <p className="mt-6 text-lg text-iroh-gray-400 leading-relaxed">
                We embed with your team to build critical infrastructure—systems where correctness, performance, and reliability are non-negotiable.
              </p>
              <p className="mt-4 text-lg text-iroh-gray-400 leading-relaxed">
                We take ownership, stay close to the code, and build for the long term.
              </p>
              <p className="mt-6 text-sm text-iroh-gray-400 italic">
                Meldrum Labs works with a small number of partners at a time, so every engagement gets our full attention.
              </p>
            </div>
          </FadeInSection>


        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 w-full">
          <div className="bg-gradient-to-r from-transparent via-iroh-gray-800/60 to-transparent h-px" />
        </div>

        {/* 03 — The Lab */}
        <section className="max-w-6xl mx-auto px-6 md:px-10 w-full py-24 md:py-32">
          <FadeInSection>
            <div className="max-w-3xl relative">
              {/* Editorial margin line */}
              <div className="absolute -left-6 md:-left-10 top-0 bottom-0 w-px bg-iroh-gray-800/60" />

              <div className="mb-10 flex items-baseline gap-4">
                <span className="text-sm font-medium text-iroh-gray-600 tabular-nums font-spaceMono">03</span>
                <h2 className="text-xl md:text-2xl font-bold text-meldrum-green-400 tracking-tight">
                  The Lab
                </h2>
              </div>

              <FadeInSection delay={0.1}>
                <div className="mt-8 max-w-2xl">
                  <p className="mt-4 text-lg md:text-xl text-iroh-gray-400 leading-relaxed">
                    Meldrum Labs was founded by Max Meldrum after years of research in data systems at KTH&apos;s Data Systems Lab under Assoc. Prof. Paris Carbone, co-creator of Apache Flink. During that time, he created µWheel, an award-winning embeddable aggregate management system. Today, he helps companies build reliable data infrastructure.
                  </p>
                </div>
              </FadeInSection>

              <FadeInSection delay={0.2}>
                <div className="mt-12 flex gap-6 text-sm text-meldrum-pink-100">
                  <a href="https://github.com/Max-Meldrum" target="_blank" rel="noopener noreferrer" className="hover:text-meldrum-pink-200 transition-colors">
                    GitHub
                  </a>
                  <a href="https://x.com/meldruum" target="_blank" rel="noopener noreferrer" className="hover:text-meldrum-pink-200 transition-colors">
                    X
                  </a>
                  <a href="https://www.linkedin.com/in/max-meldrum-1a46a291/" target="_blank" rel="noopener noreferrer" className="hover:text-meldrum-pink-200 transition-colors">
                    LinkedIn
                  </a>
                </div>
              </FadeInSection>
            </div>
          </FadeInSection>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 w-full">
          <div className="bg-gradient-to-r from-transparent via-iroh-gray-800/60 to-transparent h-px" />
        </div>

        {/* 04 — Contact */}
        <section className="max-w-6xl mx-auto px-6 md:px-10 w-full py-24 md:py-32 pb-32">
          <FadeInSection>
            <div className="mb-10 flex items-baseline gap-4">
              <span className="text-sm font-medium text-iroh-gray-600 tabular-nums font-spaceMono">04</span>
              <h2 className="text-xl md:text-2xl font-bold text-meldrum-green-400 tracking-tight">
                Contact
              </h2>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <p className="mt-8 text-2xl md:text-3xl text-iroh-gray-400 leading-relaxed font-light max-w-xl">
              If you are building infrastructure where reliability matters, let&apos;s talk.
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
