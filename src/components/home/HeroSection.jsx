'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
function AnimatedLine({ text, className, baseDelay = 0 }) {
  const characters = text.split('')

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.025,
        delayChildren: baseDelay,
      },
    },
  }

  const child = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  }

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

export function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center">
      {/* Flat, pure dark background */}
      <div className="absolute inset-0 bg-iroh-gray-900" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 w-full">
        <div className="max-w-3xl relative">
          {/* Editorial margin line */}
          <div className="absolute -left-6 md:-left-10 top-0 bottom-0 w-px bg-iroh-gray-800/60" />

          {/* Headline — staggered character animation */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-[0.9]">
            <AnimatedLine
              text="Data systems,"
              className="text-meldrum-green-400"
              baseDelay={0.15}
            />
            <br />
            <AnimatedLine
              text="built with care."
              className="text-meldrum-orange-400"
              baseDelay={0.6}
            />
          </h1>

          {/* Subheadline + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mt-10 md:mt-12"
          >
            <p className="text-lg md:text-xl text-meldrum-blue-300 leading-relaxed max-w-xl">
              For companies who need a build partner that treats their stack like their own.
            </p>

            <div className="mt-10">
              <Link
                href="/services"
                className="group inline-flex items-center text-sm font-medium text-meldrum-pink-100 hover:text-meldrum-pink-200 transition-colors duration-300"
              >
                <span className="relative">
                  How we work
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
          </motion.div>

        </div>
      </div>
    </section>
  )
}
