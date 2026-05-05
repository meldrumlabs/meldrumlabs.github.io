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

export function TeamHero() {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-10 w-full pt-32 md:pt-40 pb-24">
      <div className="max-w-3xl relative">
        {/* Editorial margin line */}
        <div className="absolute -left-6 md:-left-10 top-0 bottom-0 w-px bg-iroh-gray-800/60" />

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-[0.9] text-meldrum-green-400">
          <AnimatedLine
            text="Team"
            baseDelay={0.15}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 text-base md:text-lg text-meldrum-orange-400 max-w-xl leading-relaxed"
        >
          Meldrum Labs is a small team of data systems builders shaped by research, open source, and running systems in production.
        </motion.p>
      </div>
    </section>
  )
}
