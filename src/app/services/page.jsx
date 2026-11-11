import { HeaderSparse } from '@/components/HeaderSparse'
import { FooterMarketing } from '@/components/FooterMarketing'
import { ArrowLink, Section, SectionHeading } from '@/components/home/section-parts'

export const metadata = {
  title: 'Services',
  description: 'How Meldrum Labs partners with companies to build data infrastructure.',
}

export default function Services() {
  return (
    <div className="relative font-space text-[var(--page-ink)]">
      <HeaderSparse />

      <main className="flex flex-col">
        <Section divider={false}>
          <div className="relative mt-16 max-w-3xl md:mt-24">
            {/* Editorial margin line */}
            <div className="absolute -left-6 top-0 bottom-0 w-px bg-iroh-gray-800/60 md:-left-10" />

            <h1 className="text-5xl font-bold leading-[0.9] tracking-tighter text-[var(--page-heading)] sm:text-6xl md:text-7xl">
              Services
            </h1>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-[var(--page-muted)] md:text-lg">
              Meldrum Labs partners with a small number of companies to design, build, and harden
              real-time data infrastructure.
            </p>
          </div>
        </Section>

        <Section id="capabilities">
          <SectionHeading
            index="01"
            title="Capabilities"
            intro="Research-level depth, applied to systems that have to run in production."
          />
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-[var(--page-muted)] md:text-xl">
            Meldrum Labs combines research-level depth with hands-on experience building production
            systems. We specialize in Rust, distributed systems, stream processing, database
            internals, and high-performance infrastructure where correctness, reliability, and
            latency matter.
          </p>
        </Section>

        <Section id="how">
          <SectionHeading
            index="02"
            title="How we work"
            intro="A build partner, not a body shop: we take ownership and stay close to the code."
          />
          <div className="mt-10 max-w-2xl space-y-4 text-lg leading-relaxed text-[var(--page-muted)]">
            <p>
              We embed with your team to build critical infrastructure—systems where correctness,
              performance, and reliability are non-negotiable.
            </p>
            <p>We take ownership, stay close to the code, and build for the long term.</p>
            <p className="pt-2 text-sm italic text-[var(--page-muted)]">
              Meldrum Labs works with a small number of partners at a time, so every engagement gets
              our full attention.
            </p>
          </div>
        </Section>

        <Section id="lab">
          <SectionHeading
            index="03"
            title="The Lab"
            intro="Where the method comes from — and what keeps it sharp."
          />
          <div className="mt-10 max-w-2xl">
            <p className="text-lg leading-relaxed text-[var(--page-muted)] md:text-xl">
              Meldrum Labs was founded by Max Meldrum after years of research in data systems at
              KTH&apos;s Data Systems Lab under Assoc. Prof. Paris Carbone, co-creator of Apache
              Flink. During that time, he created µWheel, an award-winning embeddable aggregate
              management system. Today, he helps companies build reliable data infrastructure.
            </p>
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
              <ArrowLink href="https://github.com/Max-Meldrum">GitHub</ArrowLink>
              <ArrowLink href="https://x.com/meldruum" muted>
                X
              </ArrowLink>
              <ArrowLink
                href="https://www.linkedin.com/in/max-meldrum-1a46a291/"
                muted
              >
                LinkedIn
              </ArrowLink>
            </div>
          </div>
        </Section>

        <Section id="contact">
          <SectionHeading index="04" title="Contact" />
          <p className="mt-10 max-w-xl text-2xl font-light leading-relaxed text-[var(--page-muted)] md:text-3xl">
            If you are building infrastructure where reliability matters, let&apos;s talk.
          </p>
          <div className="mt-10">
            <ArrowLink href="mailto:contact@meldrumlabs.com">Start a conversation</ArrowLink>
          </div>
        </Section>
      </main>

      <FooterMarketing />
    </div>
  )
}
