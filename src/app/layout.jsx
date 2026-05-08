import glob from 'fast-glob';
import Script from 'next/script';

import {Providers} from '@/app/providers';
import '@/styles/tailwind.css';

export const metadata = {
  metadataBase: new URL('https://www.meldrumlabs.com'),
  title: {
    template: '%s - Meldrum Labs',
    default: 'Meldrum Labs',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Meldrum Labs',
    description: 'Data Systems, Built with care.',
    images: [{
      url: '/api/og?title=meldrum&subtitle=data systems, built with care',
      width: 1200,
      height: 630,
      alt: 'Data Systems, Built with care',
      type: 'image/png',
    }],
    type: 'website'
  }
};

export default async function RootLayout({children}) {
  let pages = await glob('**/*.mdx', {cwd: 'src/app'});
  let allSectionEntries = await Promise.all(
      pages.map(async (filename) => [
        '/' + filename.replace(/(^|\/)page\.mdx$/, ''),
        (await import(`./${filename}`)).sections,
      ]),
  );
  let allSections = Object.fromEntries(allSectionEntries);

  return (
    <html lang="en" className="h-full dark" suppressHydrationWarning>
      <head>
      </head>
      <body className="flex min-h-full bg-zinc-900">
        <Providers>
          <div className="w-full dark">
            {children}
          </div>
        </Providers>
      </body>
      <Script defer data-domain="meldrumlabs.com" src="https://plausible.io/js/script.outbound-links.js" />
    </html>
  );
}
