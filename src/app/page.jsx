import { HeaderSparse } from '@/components/HeaderSparse'
import { LandingBackground } from '@/components/home/LandingBackground'
import { HeroSection } from '@/components/home/HeroSection'

export const metadata = {
  title: 'Software Factory out of Stockholm',
  description:
    'Meldrum Labs builds reliable, high-performance data infrastructure: real-time data systems, database internals, and distributed systems in Rust.',
}

const links = [{ name: 'contact@meldrumlabs.com', href: 'mailto:contact@meldrumlabs.com' }]

export default function Page() {
  return (
    <LandingBackground>
      <HeaderSparse revealLogoOnScroll />

      <main className="flex flex-1">
        <HeroSection />
      </main>

      <footer className="relative border-t border-[var(--page-rule)]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-8 font-spaceMono text-[0.68rem] uppercase tracking-[0.16em] text-[var(--page-muted)] md:flex-row md:items-center md:justify-between md:px-10">
          <p>&copy; {new Date().getFullYear()} Meldrum Labs AB &middot; Stockholm</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  {...(link.href.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="transition-colors hover:text-[var(--page-ink)]"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </LandingBackground>
  )
}
