import { HeaderSparse } from '@/components/HeaderSparse'
import { CaseStudyTeaser } from '@/components/home/CaseStudyTeaser'
import { FooterSimple } from '@/components/FooterSimple'
import { LandingBackground } from '@/components/home/LandingBackground'
import { HeroSection } from '@/components/home/HeroSection'
import { Section } from '@/components/home/section-parts'

export const metadata = {
  title: 'Reliable Data Systems, Built with Care',
  description:
    'Meldrum Labs builds reliable, high-performance data infrastructure: real-time data systems, database internals, and distributed systems in Rust.',
}

export default function Page() {
  return (
    <LandingBackground>
      <HeaderSparse revealLogoOnScroll />

      <main className="flex min-h-svh">
        <HeroSection />
      </main>

      <Section id="work" fade={false}>
        <CaseStudyTeaser />
      </Section>

      <FooterSimple />
    </LandingBackground>
  )
}
