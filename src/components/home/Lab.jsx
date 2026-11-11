import { ArrowLink, ArrowRouteLink, Section, SectionHeading } from '@/components/home/section-parts'

const stages = [
  { name: 'Ingest', detail: 'events · logs · ticks' },
  { name: 'Aggregate', detail: 'windows · incremental state' },
  { name: 'Serve', detail: 'queries · streams' },
]

export function Lab() {
  return (
    <Section id="lab">
      <SectionHeading
        index="03"
        title="The Lab"
        intro="Systems research is where the method comes from: model the workload, measure the cost, then build."
      />

      <div className="mt-14 grid gap-12 md:grid-cols-[1.15fr_1fr] md:gap-16">
        <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-iroh-gray-400">
          <p>
            Meldrum Labs was founded by Max Meldrum after years of research in data systems at
            KTH&apos;s Data Systems Lab under Assoc. Prof. Paris Carbone, co-creator of Apache Flink.
          </p>
          <p>
            That work produced <span className="text-iroh-gray-200">µWheel</span>, an award-winning
            embeddable aggregate management system — incremental computation under a fixed memory
            budget.
          </p>
          <p>
            The same rigour now goes into production systems: correctness argued, not assumed, and
            performance measured rather than promised.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3 pt-2">
            <ArrowLink href="https://github.com/Max-Meldrum">Research and code</ArrowLink>
            <ArrowRouteLink href="/services" muted>
              How we work
            </ArrowRouteLink>
          </div>
        </div>

        <div className="self-start rounded-xl border border-iroh-gray-800 p-6 md:p-8">
          <p className="font-spaceMono text-[11px] uppercase tracking-[0.14em] text-iroh-gray-600">
            Dataflow
          </p>
          <ol className="mt-6 space-y-6">
            {stages.map((stage, index) => (
              <li key={stage.name} className="relative pl-5">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 h-1.5 w-1.5 rounded-full bg-meldrum-orange-500"
                />
                {index < stages.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-[-24px] left-[2px] top-4 w-px bg-iroh-gray-800"
                  />
                )}
                <span className="block text-sm font-semibold text-iroh-gray-200">
                  {stage.name}
                </span>
                <span className="mt-1 block font-spaceMono text-[11px] text-iroh-gray-500">
                  {stage.detail}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-8 border-t border-iroh-gray-800/60 pt-5 font-spaceMono text-[11px] text-iroh-gray-600">
            bounded memory · deterministic results
          </p>
        </div>
      </div>
    </Section>
  )
}
