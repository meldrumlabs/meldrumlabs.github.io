import { Section, SectionHeading } from '@/components/home/section-parts'

const capabilities = [
  {
    name: 'Real-time data systems',
    copy: 'Stream processing, event-driven infrastructure, and low-latency computation.',
    detail: 'Kafka · Flink · custom operators',
  },
  {
    name: 'Database internals',
    copy: 'Query execution, storage engines, and performance optimization.',
    detail: 'Arrow · DataFusion · columnar storage',
  },
  {
    name: 'Distributed infrastructure',
    copy: 'Reliable systems designed for correctness, scale, and operational simplicity.',
    detail: 'Rust · consensus · observability',
  },
]

export function Capabilities() {
  return (
    <Section id="what">
      <SectionHeading
        index="01"
        title="What we build"
        intro="Engineering reliable, high-performance data infrastructure — the layer a product cannot afford to get wrong."
      />

      <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-3">
        {capabilities.map((capability) => (
          <article key={capability.name} className="border-t border-iroh-gray-800 pt-6">
            <h3 className="text-lg font-semibold tracking-tight text-meldrum-green-400">
              {capability.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-iroh-gray-400">{capability.copy}</p>
            <p className="mt-5 font-spaceMono text-[11px] uppercase tracking-[0.14em] text-iroh-gray-600">
              {capability.detail}
            </p>
          </article>
        ))}
      </div>
    </Section>
  )
}
