import Image from 'next/image'
import Link from 'next/link'

const navigation = {
  openSource: [
    { name: 'GitHub', href: 'https://github.com/meldrumlabs' },
  ],
  company: [
    { name: 'Services', href: '/services' },
    { name: 'Products', href: '/products' },
    { name: 'The Lab', href: '/services#lab' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: 'mailto:contact@meldrumlabs.com' },
  ],
  socials: [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/meldrum-labs' },
    { name: 'X', href: 'https://x.com/meldruum' },
  ],
}

export function FooterMarketing() {
  return (
    <footer className="border-t border-[var(--page-rule)]" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-12 md:py-16">
        <div className="md:flex md:justify-between md:gap-8">
          {/* Brand */}
          <div className="space-y-4 md:max-w-xs">
            <div className="flex items-center">
              <Image
                src="/img/logo/wordmark-umber.svg"
                alt="Meldrum Labs"
                width={166}
                height={32}
                className="h-8 w-auto"
              />
            </div>
            <p className="text-sm leading-relaxed text-[var(--page-muted)]">
              Data systems out of Sweden.
            </p>
          </div>

          {/* Navigation */}
          <div className="mt-10 md:mt-0 flex gap-12">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--page-heading)]">
                Open Source
              </h3>
              <ul className="mt-4 space-y-2.5">
                {navigation.openSource.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-[var(--page-muted)] transition-colors hover:text-[var(--page-ink)]"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--page-heading)]">
                Company
              </h3>
              <ul className="mt-4 space-y-2.5">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-[var(--page-muted)] transition-colors hover:text-[var(--page-ink)]"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--page-heading)]">
                Socials
              </h3>
              <ul className="mt-4 space-y-2.5">
                {navigation.socials.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-[var(--page-muted)] transition-colors hover:text-[var(--page-ink)]"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-[var(--page-rule)] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--page-muted)]">
            &copy; {new Date().getFullYear()} Meldrum Labs AB
          </p>
          <p className="text-xs text-[var(--page-muted)]">
            Crafted in Stockholm
          </p>
        </div>
      </div>
    </footer>
  )
}
