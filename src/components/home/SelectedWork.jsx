import Image from 'next/image'
import { Section, SectionHeading } from '@/components/home/section-parts'

const stack = ['Rust', 'Apache Arrow', 'DataFusion']

export function SelectedWork() {
  return (
    <Section id="work">
      <SectionHeading
        index="02"
        title="Selected work"
        intro="Long-running engagements, in production — not prototypes or proof of concept."
      />

      <article className="group mt-14 overflow-hidden rounded-xl border border-iroh-gray-800 transition-colors duration-300 hover:border-iroh-gray-700">
        <div className="md:grid md:grid-cols-2">
          <div className="p-8 md:p-10">
            <div className="mb-6 flex items-center gap-3">
              <span className="text-2xs font-medium uppercase tracking-[0.2em] text-iroh-gray-500">
                With
              </span>
              <Image
                src="/img/user-logos/massive.svg"
                alt="Massive"
                width={90}
                height={24}
                className="h-5 w-auto object-contain opacity-60 transition-opacity duration-300 group-hover:opacity-100"
              />
            </div>

            <h3 className="text-xl font-bold leading-snug tracking-tight text-meldrum-green-400 md:text-2xl">
              Modern financial data infrastructure
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-iroh-gray-400">
              Building real-time financial data infrastructure with{' '}
              <a
                href="https://massive.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-iroh-gray-400/20 transition-colors hover:decoration-iroh-gray-400"
              >
                Massive
              </a>{' '}
              — reliable, high performance, and built to stay in production.
            </p>

            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {stack.map((item) => (
                <li
                  key={item}
                  className="font-spaceMono text-[11px] uppercase tracking-[0.14em] text-iroh-gray-500"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-center border-t border-iroh-gray-800 p-8 md:border-l md:border-t-0 md:p-10">
            <span aria-hidden="true" className="-mb-2 select-none text-5xl leading-none text-meldrum-orange-400/60">
              &ldquo;
            </span>
            <blockquote className="text-base leading-relaxed text-iroh-gray-300 md:text-lg">
              Meldrum Labs operates with a level of care and ownership that shows in the systems they
              build: reliable, performant, and built for the long term.
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="h-px w-6 bg-meldrum-orange-500/40" />
              <span className="text-sm font-bold text-white">Quinton Pike, CEO Massive</span>
            </figcaption>
          </div>
        </div>
      </article>
    </Section>
  )
}
