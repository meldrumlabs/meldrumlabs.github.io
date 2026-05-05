import Image from 'next/image'
import { HeaderSparse } from '@/components/HeaderSparse'
import { FooterMarketing } from '@/components/FooterMarketing'
import { GithubIcon } from '@/components/icons/GithubIcon'
import { TwitterIcon } from '@/components/Footer'
import { TeamHero } from '@/components/home/TeamHero'

function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export const metadata = {
  title: 'Team',
  description: 'Meet the team at Meldrum Labs',
}

export default function Team() {
  return (
    <div className="relative bg-iroh-gray-900 text-iroh-gray-100 font-space">
      <HeaderSparse />

      <main className="flex flex-col">
        <TeamHero />

        {/* Builders */}
        <section className="max-w-6xl mx-auto px-6 md:px-10 w-full pt-8 pb-24">
          <div className="relative">
            {/* Editorial margin line */}
            <div className="absolute -left-6 md:-left-10 top-0 bottom-0 w-px bg-iroh-gray-800/60" />

            <p className="text-base md:text-lg text-iroh-gray-400 mb-8 leading-relaxed text-center">
              We build with urgency, reliability, and accountability.
            </p>

            <div className="mb-10 flex items-baseline gap-4">
              <span className="text-sm font-medium text-iroh-gray-600 tabular-nums">01</span>
              <h2 className="text-xl md:text-2xl font-bold text-meldrum-green-400 tracking-tight">
                Builders
              </h2>
            </div>

            <div className="md:grid md:grid-cols-[auto_1fr] md:gap-10 md:items-start">
              <div className="shrink-0">
                <Image
                  src="/images/team/max.jpg"
                  alt="Max Meldrum"
                  width={160}
                  height={160}
                  className="object-cover w-[120px] h-[120px] md:w-[140px] md:h-[140px] rounded-full"
                />
              </div>
              <div className="mt-6 md:mt-0">
                <h3 className="text-xl md:text-2xl font-bold text-meldrum-green-400 tracking-tight">
                  Max Meldrum
                </h3>
                <p className="mt-1 text-xs text-iroh-gray-500 font-spaceMono">
                  Founder
                </p>
                <p className="mt-4 text-base text-meldrum-blue-300 leading-relaxed">
                  A former PhD student at KTH&apos;s Data Systems Lab under Prof. Paris Carbone (co-creator of Apache Flink), he created µWheel, an award-winning embeddable aggregate management system. Now partnering with companies to build data systems they can trust in production.
                </p>
                <div className="mt-5 flex items-center gap-5 text-iroh-gray-400">
                  <a
                    href="https://github.com/Max-Meldrum"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="hover:text-meldrum-orange-400 transition-colors"
                  >
                    <GithubIcon className="w-5 h-5 fill-current" />
                  </a>
                  <a
                    href="https://x.com/meldruum"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X"
                    className="hover:text-meldrum-orange-400 transition-colors"
                  >
                    <TwitterIcon className="w-[18px] h-[18px]" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/max-meldrum-1a46a291/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="hover:text-meldrum-orange-400 transition-colors"
                  >
                    <LinkedInIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterMarketing />
    </div>
  )
}
