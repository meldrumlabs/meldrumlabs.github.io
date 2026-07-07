'use client'

import { motion } from 'framer-motion'

const principles = [
  {
    num: '01',
    title: 'Urgency',
    body: 'If it is worth building, then just build it.',
  },
  {
    num: '02',
    title: 'Reliability',
    body: 'Be reliable as a person, build reliable data systems.',
  },
  {
    num: '03',
    title: 'Accountability',
    body: 'Have skin in the game or don\'t participate at all.',
  },
]

export function Principles() {
  return (
    <section className="py-24 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 flex items-baseline gap-4">
          <span className="text-sm font-medium text-iroh-gray-600 tabular-nums">03</span>
          <h2 className="text-xl md:text-2xl font-bold text-meldrum-green-400 tracking-tight">
            Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {principles.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-6 rounded-xl border border-iroh-gray-800 transition-colors duration-300 hover:border-iroh-gray-700"
            >
              <span className="text-xs font-medium text-iroh-gray-600 tabular-nums">
                {p.num}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-meldrum-green-400">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-iroh-gray-400 leading-relaxed">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
