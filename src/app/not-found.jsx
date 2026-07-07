import Link from 'next/link';
import { HeaderSparse } from '@/components/HeaderSparse';
import { FooterMarketing } from '@/components/FooterMarketing';

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col bg-iroh-gray-900 text-iroh-gray-100 font-space">
      <HeaderSparse />

      <main className="flex-1 flex items-center justify-center px-6 md:px-10 py-32">
        <div className="max-w-xl text-center">
          <p className="text-sm font-semibold text-meldrum-orange-400">404</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-meldrum-green-400">
            Page not found
          </h1>
          <p className="mt-3 text-base text-iroh-gray-400 leading-relaxed">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
          <div className="mt-8">
            <Link
              href="/"
              className="group inline-flex items-center text-sm font-medium text-meldrum-pink-100 hover:text-meldrum-pink-200 transition-colors duration-300"
            >
              <span className="relative">
                Back home
                <span className="absolute left-0 -bottom-1 w-full h-px bg-meldrum-pink-100/40 group-hover:bg-meldrum-pink-200/60 transition-colors duration-300" />
              </span>
              <svg
                className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </main>

      <FooterMarketing />
    </div>
  )
}
