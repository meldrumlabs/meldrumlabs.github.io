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
      <div className="group relative rounded-xl bg-iroh-gray-900/50 backdrop-blur-sm border border-iroh-gray-800 transition-all duration-500 hover:border-meldrum-orange-500/30 hover:shadow-2xl hover:shadow-meldrum-orange-500/5 overflow-hidden">
        {/* Hover gradient */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-gradient-to-br from-meldrum-orange-500/5 to-transparent transition-opacity duration-500" />

        <div className="relative z-10 md:grid md:grid-cols-2">
          {/* Left: narrative */}
          <div className="p-8 md:p-10 lg:p-12">
            {/* Label + logo */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-2xs uppercase tracking-[0.2em] text-iroh-gray-500 font-medium">With</span>
              <Image
                src="/img/user-logos/massive.svg"
                alt="Massive logo"
                width={90}
                height={24}
                className="object-contain opacity-40 group-hover:opacity-70 transition-opacity duration-300"
              />
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-meldrum-green-400 mb-4 tracking-tight leading-tight">
              Modern Financial Data Infrastructure
            </h3>
            <p className="text-meldrum-blue-300 text-sm leading-relaxed mb-6">
              Building real-time financial data infrastructure together with <a href="https://massive.com" target="_blank" rel="noopener noreferrer" className="text-meldrum-blue-300 underline decoration-meldrum-blue-300/30 hover:decoration-meldrum-blue-300 transition-colors">Massive</a> — reliable, high-performance, built in Rust on Apache DataFusion and Arrow.
            </p>
          </div>

          {/* Right: Testimonial */}
          <div className="py-8 md:py-10 lg:py-12 px-6 md:px-7 lg:px-8 md:border-l border-t md:border-t-0 border-iroh-gray-800/50 flex flex-col justify-center">
            <span
              aria-hidden="true"
              className="font-serif text-5xl md:text-6xl leading-none text-meldrum-orange-400/60 -mb-1 select-none"
            >
              &ldquo;
            </span>
            <blockquote className="text-lg md:text-xl text-iroh-gray-300 leading-relaxed font-light">
              Meldrum Labs operates with a level of care and ownership that shows in the systems they build: reliable, performant, and built for the long term.
            </blockquote>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-8 h-px bg-meldrum-orange-500/50" />
              <span className="text-sm text-iroh-gray-200 font-medium tracking-tight">
                Quinton Pike, CEO Massive
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}


function DataFusionCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <a href="https://datafusion.apache.org/" target="_blank" rel="noopener noreferrer" className="block">
        <div className="group relative rounded-xl bg-iroh-gray-900/50 backdrop-blur-sm border border-iroh-gray-800 transition-all duration-500 hover:border-meldrum-orange-500/30 hover:shadow-2xl hover:shadow-meldrum-orange-500/5 overflow-hidden">
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-gradient-to-br from-meldrum-orange-500/5 to-transparent transition-opacity duration-500" />

          <div className="relative z-10 p-8 md:p-10">
            <div className="flex items-center justify-between mb-6">
              <span className="text-2xs uppercase tracking-[0.2em] text-iroh-gray-500 font-medium">Core Technology</span>
              <Image
                src="/img/user-logos/apache-datafusion.svg"
                alt="Apache DataFusion"
                width={120}
                height={28}
                className="object-contain opacity-40 group-hover:opacity-70 transition-opacity duration-300"
              />
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-meldrum-green-400 mb-3 tracking-tight leading-tight">
              Apache DataFusion
            </h3>
            <p className="text-meldrum-blue-300 text-sm leading-relaxed max-w-2xl">
              An extensible query engine written in Rust, using Apache Arrow as its in-memory format. We leverage DataFusion to build high-performance analytical systems at Massive — custom query planning, optimized execution, and native integration with financial data pipelines.
            </p>

            <div className="flex flex-wrap gap-2 mt-5">
              {['Rust', 'Apache Arrow', 'Query Planning', 'Analytical Processing'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-2xs font-medium rounded-full bg-iroh-gray-800/80 text-iroh-gray-400 border border-iroh-gray-700/50 group-hover:border-meldrum-orange-500/20 group-hover:text-iroh-gray-300 transition-colors duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </a>
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
        <div className="group relative rounded-xl bg-iroh-gray-900/50 backdrop-blur-sm border border-iroh-gray-800 transition-all duration-500 hover:border-meldrum-green-500/30 hover:shadow-2xl hover:shadow-meldrum-green-500/5 overflow-hidden">
          {/* Hover gradient */}
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-gradient-to-br from-meldrum-green-500/5 to-transparent transition-opacity duration-500" />

          <div className="relative z-10 md:grid md:grid-cols-2">
            {/* Left: narrative */}
            <div className="p-8 md:p-10 lg:p-12 flex flex-col">
              {/* Label + logo */}
              <div className="flex items-center justify-between mb-8">
                <span className="text-2xs uppercase tracking-[0.2em] text-iroh-gray-500 font-medium">For Everyone</span>
                <Image
                  src="/images/enya.png"
                  alt="Enya"
                  width={28}
                  height={28}
                  className="object-contain opacity-50 group-hover:opacity-80 transition-opacity duration-300"
                />
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-meldrum-green-400 mb-4 tracking-tight leading-tight">
                Enya — A Builder&apos;s Best Friend
              </h3>
              <p className="text-meldrum-blue-300 text-sm leading-relaxed mb-6">
                An open-source toolkit designed for both humans and AI agents. Everything a builder needs in one place — observability, SQL, terminals, and code review. Built for those who build, ship, and get paged.
              </p>


              {/* CTA */}
              <div className="mt-auto pt-6 border-t border-iroh-gray-800/50">
                <div className="flex items-center text-sm font-medium text-meldrum-pink-100 transition-transform duration-300 group-hover:translate-x-1">
                  Learn more
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Right: video */}
            <div className="p-6 md:p-8 lg:p-10 md:border-l border-t md:border-t-0 border-iroh-gray-800/50 flex items-center">
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
    <div className="py-16 px-6 md:px-10">
      {/* Section header */}
      <div className="mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-meldrum-green-400 uppercase tracking-[0.2em]">
          What We Build
        </h2>
      </div>

      {/* Massive — full width split with code */}
      <div className="mb-4">
        <MassiveSplitSection />
      </div>

      {/* Enya — full width split with video */}
      <div>
        <EnyaSplitSection />
      </div>
    </div>
  )
}
