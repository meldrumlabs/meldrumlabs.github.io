import { ArrowLink, Section, SectionHeading } from '@/components/home/section-parts'

const elsewhere = [
  { name: 'GitHub', href: 'https://github.com/meldrumlabs' },
  { name: 'X', href: 'https://x.com/meldruum' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/meldrum-labs' },
]

export function Contact() {
  return (
    <Section id="contact">
      <SectionHeading index="05" title="Contact" />

      <p className="mt-10 max-w-3xl text-3xl font-bold leading-[1.05] tracking-tighter text-iroh-gray-100 md:text-5xl">
        Building something that needs to be{' '}
        <span className="text-meldrum-green-400">fast</span>,{' '}
        <span className="text-meldrum-orange-400">reliable</span>, and correct?
      </p>
      <p className="mt-4 text-xl text-iroh-gray-400 md:text-2xl">Let&apos;s talk.</p>

      <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5">
        <ArrowLink href="mailto:contact@meldrumlabs.com">contact@meldrumlabs.com</ArrowLink>
        {elsewhere.map((link) => (
          <ArrowLink key={link.name} href={link.href} muted>
            {link.name}
          </ArrowLink>
        ))}
      </div>
    </Section>
  )
}
