'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

function MassiveSplitSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="group relative rounded-xl border border-iroh-gray-800 transition-all duration-300 hover:border-iroh-gray-700 hover:-translate-y-px overflow-hidden">
        <div className="relative md:grid md:grid-cols-2">
          {/* Left: narrative */}
          <div className="p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xs uppercase tracking-[0.2em] text-iroh-gray-500 font-medium">With</span>
              <Image
                src="/img/user-logos/massive.svg"
                alt="Massive"
                width={90}
                height={24}
                className="object-contain opacity-30 group-hover:opacity-60 transition-opacity duration-300"
              />
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-meldrum-green-400 tracking-tight leading-snug">
              Modern Financial Data Infrastructure
            </h3>
            <p className="mt-3 text-sm text-meldrum-blue-300 leading-relaxed">
              Building real-time financial data infrastructure with <a href="https://massive.com" target="_blank" rel="noopener noreferrer" className="underline decoration-meldrum-blue-300/20 hover:decoration-meldrum-blue-300 transition-colors">Massive</a> — reliable, high-performance, built in Rust on Apache DataFusion and Arrow.
            </p>
          </div>

          {/* Right: Testimonial */}
          <div className="p-8 md:p-10 md:border-l border-t md:border-t-0 border-iroh-gray-800 flex flex-col justify-center">
            <span className="text-4xl leading-none text-meldrum-orange-400/40 -mb-2 select-none">
              &ldquo;
            </span>
            <blockquote className="text-base md:text-lg text-iroh-gray-300 leading-relaxed">
              Meldrum Labs operates with a level of care and ownership that shows in the systems they build: reliable, performant, and built for the long term.
            </blockquote>
            <div className="mt-5 flex items-center gap-3">
              <div className="w-6 h-px bg-meldrum-orange-500/40" />
              <span className="text-sm text-white font-bold">
                Quinton Pike, CEO Massive
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function EnyaSplitSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      <Link href="/blog/enya" className="block">
        <div className="group relative rounded-xl border border-iroh-gray-800 transition-all duration-300 hover:border-iroh-gray-700 hover:-translate-y-px overflow-hidden">
          <div className="relative md:grid md:grid-cols-2">
            {/* Left: narrative */}
            <div className="p-8 md:p-10 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <span className="text-2xs uppercase tracking-[0.2em] text-iroh-gray-500 font-medium">Open-source</span>
                <Image
                  src="/images/enya.png"
                  alt="Enya"
                  width={24}
                  height={24}
                  className="object-contain opacity-40 group-hover:opacity-70 transition-opacity duration-300"
                />
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-meldrum-green-400 tracking-tight leading-snug">
                Enya — A Builder&apos;s Best Friend
              </h3>
              <p className="mt-3 text-sm text-meldrum-blue-300 leading-relaxed">
                An open-source toolkit for humans and AI agents. Observability, SQL, terminals, and code review — everything a builder needs in one place.
              </p>

              <div className="mt-auto pt-5 flex items-center text-sm text-meldrum-pink-100 transition-colors">
                Learn more
                <svg className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Right: video */}
            <div className="p-6 md:p-8 md:border-l border-t md:border-t-0 border-iroh-gray-800 flex items-center">
              <div className="relative rounded-lg overflow-hidden border border-iroh-gray-800 w-full">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto"
                >
                  <source src="/videos/landing.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function BentoGrid() {
  return (
    <div>
      <div className="mb-10 flex items-baseline gap-4">
        <span className="text-sm font-medium text-iroh-gray-600 tabular-nums">01</span>
        <h2 className="text-xl md:text-2xl font-bold text-meldrum-green-400 tracking-tight">
          What we build
        </h2>
      </div>

      <div className="space-y-6">
        <MassiveSplitSection />
        <EnyaSplitSection />
      </div>
    </div>
  )
}
