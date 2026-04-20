import Image from 'next/image'
import Link from 'next/link'

const navigation = {
  product: [
    { name: 'Enya', href: '/blog/enya' },
    { name: 'Blog', href: '/blog' },
  ],
  company: [
    { name: 'Team', href: '/team' },
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
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        {/* Main footer content */}
        <div className="md:flex md:justify-between md:gap-8">
          {/* Left side - Brand */}
          <div className="space-y-6 md:max-w-xs">
            {/* Logo + Company name */}
            <div className="flex items-center gap-0">
              <Image
                src="/android-chrome-192x192.png"
                alt="Meldrum Labs"
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <span className="text-lg font-semibold text-meldrum-green-400">Meldrum Labs</span>
            </div>

            {/* Tagline */}
            <p className="text-sm text-iroh-gray-400 leading-relaxed">
              Data Systems out of Sweden.
            </p>

          </div>

          {/* Right side - Navigation columns */}
          <div className="mt-12 md:mt-0 flex gap-12 justify-end">
            {/* Product column */}
            <div>
              <h3 className="text-sm font-semibold text-meldrum-green-400 uppercase tracking-wider">
                Product
              </h3>
              <ul className="mt-4 space-y-3">
                {navigation.product.map((item) => (
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

            {/* Company column */}
            <div>
              <h3 className="text-sm font-semibold text-meldrum-green-400 uppercase tracking-wider">
                Company
              </h3>
              <ul className="mt-4 space-y-3">
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

            {/* Socials column */}
            <div>
              <h3 className="text-sm font-semibold text-meldrum-green-400 uppercase tracking-wider">
                Socials
              </h3>
              <ul className="mt-4 space-y-3">
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
          <p className="text-xs text-iroh-gray-500">
            &copy; {new Date().getFullYear()} Meldrum Labs AB. All rights reserved.
          </p>
          <p className="text-xs text-iroh-gray-600">
            Crafted in Stockholm
          </p>
        </div>
      </div>
    </footer>
  )
}
