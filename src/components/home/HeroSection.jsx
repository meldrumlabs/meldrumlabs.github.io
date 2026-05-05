'use client'

import { motion } from 'framer-motion'
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


        </div>
      </div>
    </section>
  )
}
