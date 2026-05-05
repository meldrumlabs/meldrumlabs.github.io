import Image from 'next/image'
import Link from 'next/link'

const navigation = {
  openSource: [
    { name: 'Enya', href: '/blog/enya' },
    { name: 'GitHub', href: 'https://github.com/meldrumlabs' },
  ],
  company: [
    { name: 'Team', href: '/team' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: 'mailto:contact@meldrumlabs.com' },
  ],
  socials: [
    { name: 'LinkedIn', href: 'https://linkedin.com/company/meldrumlabs' },
    { name: 'X', href: 'https://x.com/meldrumlabs' },
  ],
}

export function FooterMarketing() {
  return (
    <footer className="border-t border-iroh-gray-800" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-12 md:py-16">
        <div className="md:flex md:justify-between md:gap-8">
          {/* Brand */}
          <div className="space-y-4 md:max-w-xs">
            <div className="flex items-center gap-2">
              <Image
                src="/android-chrome-192x192.png"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-base font-semibold text-meldrum-green-400">Meldrum Labs</span>
            </div>
            <p className="text-sm text-meldrum-blue-300 leading-relaxed">
              Data systems out of Sweden.
            </p>
          </div>

          {/* Navigation */}
          <div className="mt-10 md:mt-0 flex gap-12">
            <div>
              <h3 className="text-xs font-semibold text-meldrum-green-400 uppercase tracking-wider">
                Open Source
              </h3>
              <ul className="mt-4 space-y-2.5">
                {navigation.openSource.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-meldrum-orange-400 hover:text-meldrum-green-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-meldrum-green-400 uppercase tracking-wider">
                Company
              </h3>
              <ul className="mt-4 space-y-2.5">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-meldrum-orange-400 hover:text-meldrum-green-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-meldrum-green-400 uppercase tracking-wider">
                Socials
              </h3>
              <ul className="mt-4 space-y-2.5">
                {navigation.socials.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-meldrum-orange-400 hover:text-meldrum-green-400 transition-colors"
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
        <div className="mt-12 pt-8 border-t border-iroh-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-iroh-gray-600">
            &copy; {new Date().getFullYear()} Meldrum Labs AB
          </p>
          <p className="text-xs text-iroh-gray-600">
            Crafted in Stockholm
          </p>
        </div>
      </div>
    </footer>
  )
}
