'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function FadeInSection({
  children,
  delay = 0,
  className = '',
  direction = 'up' // 'up', 'down', 'left', 'right'
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  }

  const { x, y } = directions[direction] || directions.up

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, x }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y, x }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98] // custom easing for smooth feel
      }}
    >
      {children}
    </motion.div>
  )
}
