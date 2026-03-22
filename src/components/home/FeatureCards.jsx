'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const features = [
  {
    title: 'Data Systems',
    description: 'We partner with companies to design, build, and operate specialized data systems that demand both reliability and innovation.',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    href: '/blog/announcement',
    color: 'meldrum-green'
  },
  {
    title: 'Enya',
    description: "An open-source toolkit for builders that combines observability, SQL, terminals, and code review in a single interface.",
    icon: (
      <Image src="/images/enya.png" alt="Enya" width={48} height={48} className="w-12 h-12 object-contain" />
    ),
    href: '/blog/enya',
    color: 'meldrum-green'
  }
]

function FeatureCard({ feature, index }) {
  const [isHovered, setIsHovered] = useState(false)

  const colorClasses = {
    'meldrum-green': {
      icon: 'text-meldrum-green-400',
      border: 'group-hover:border-meldrum-green-500/50',
      glow: 'group-hover:shadow-meldrum-green-500/10',
      gradient: 'from-meldrum-green-500/10 to-transparent'
    },
    'meldrum-blue': {
      icon: 'text-meldrum-blue-400',
      border: 'group-hover:border-meldrum-blue-500/50',
      glow: 'group-hover:shadow-meldrum-blue-500/10',
      gradient: 'from-meldrum-blue-500/10 to-transparent'
    },
    'meldrum-orange': {
      icon: 'text-meldrum-orange-400',
      border: 'group-hover:border-meldrum-orange-500/50',
      glow: 'group-hover:shadow-meldrum-orange-500/10',
      gradient: 'from-meldrum-orange-500/10 to-transparent'
    }
  }

  const colors = colorClasses[feature.color] || colorClasses['meldrum-green']

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={feature.href} className="block h-full">
        <div className={`
          group relative h-full p-6 rounded-xl
          bg-iroh-gray-900/50 backdrop-blur-sm
          border border-iroh-gray-800
          transition-all duration-500 ease-out
          hover:-translate-y-1
          hover:shadow-2xl
          ${colors.border}
          ${colors.glow}
        `}>
          {/* Gradient overlay on hover */}
          <div className={`
            absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
            bg-gradient-to-br ${colors.gradient}
            transition-opacity duration-500
          `} />

          {/* Content */}
          <div className="relative z-10">
            {/* Icon */}
            <div className={`
              inline-flex mb-4
              ${colors.icon}
              transition-transform duration-300
              group-hover:scale-110
            `}>
              {feature.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-meldrum-green-400 mb-2 tracking-tight">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-meldrum-blue-300 text-sm leading-relaxed mb-4">
              {feature.description}
            </p>

            {/* Learn more link */}
            <div className="flex items-center text-sm font-medium text-meldrum-pink-100 transition-transform duration-300 group-hover:translate-x-1">
              Learn more
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Animated border gradient (visible on hover) */}
          <div className={`
            absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
            transition-opacity duration-500
            pointer-events-none
          `}>
            <div className="absolute inset-[-1px] rounded-xl bg-gradient-to-r from-transparent via-current to-transparent opacity-20"
                 style={{ color: feature.color === 'meldrum-green' ? '#8ec07c' : '#fe8019' }} />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function FeatureCards() {
  return (
    <div className="py-12 px-6 md:px-10">
      {/* Section header */}
      <div className="mb-10">
        <h2 className="text-sm font-semibold text-meldrum-green-400 uppercase tracking-wider mb-2">
          What We Do
        </h2>
        <p className="text-2xl md:text-3xl font-bold text-meldrum-orange-400">
          We build data systems and tools to enable builders
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <FeatureCard key={feature.title} feature={feature} index={index} />
        ))}
      </div>
    </div>
  )
}
