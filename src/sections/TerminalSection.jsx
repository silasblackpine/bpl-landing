// TerminalSection.jsx — Where Statistical Arbitrage Lives
// Governing spec: /home/nodeuser/documents/2026-03-28-bpl-landing-page-design.md

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import GlassPanel from '../components/GlassPanel'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

// Generate mock ECM spread path
function generateSpreadPath() {
  const points = []
  const width = 400
  const height = 120
  const mean = height / 2
  let y = mean

  for (let x = 0; x <= width; x += 2) {
    y += (Math.random() - 0.5) * 8
    // Mean reversion pull
    y += (mean - y) * 0.03
    points.push(`${x},${Math.max(10, Math.min(height - 10, y))}`)
  }

  return `M${points.join(' L')}`
}

const FEATURES = [
  '// Johansen Cointegration Test — Real-Time',
  '// Error Correction Model Signal Engine',
  '// Pairs Universe: 847 Instruments Monitored',
  '// Z-Score Threshold Alerts via Telegram',
]

export default function TerminalSection() {
  const pathRef = useRef(null)
  const spreadPath = useRef(generateSpreadPath())

  // Animate SVG path draw on viewport entry
  useEffect(() => {
    const el = pathRef.current
    if (!el) return

    const length = el.getTotalLength()
    el.style.strokeDasharray = length
    el.style.strokeDashoffset = length

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = 'stroke-dash-offset 2s ease-out'
          el.style.strokeDashoffset = '0'
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el.closest('section'))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="terminal-section"
      className="relative min-h-screen flex items-center px-6 md:px-10 lg:px-16 py-32"
      aria-label="Terminal — ECM and Cointegration Pairs Signal Dashboard"
    >
      <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16 w-full max-w-7xl mx-auto">
        {/* Left: Spread Chart */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20%' }}
          variants={fadeUp}
          className="w-full lg:w-1/2"
        >
          <GlassPanel>
            <div className="flex justify-between items-center mb-4">
              <span className="font-mono text-[10px] tracking-[0.15em]" style={{ color: '#4A90B8' }}>
                ECM SPREAD CHART
              </span>
              <span className="font-mono text-[9px] tracking-wider" style={{ color: '#6A6A62' }}>
                ES1! / NQ1!
              </span>
            </div>

            <svg viewBox="0 0 400 120" className="w-full" style={{ overflow: 'visible' }}>
              {/* Mean line */}
              <line
                x1="0" y1="60" x2="400" y2="60"
                stroke="#6A6A62" strokeWidth="0.5" strokeDasharray="4,4"
              />
              {/* Spread path */}
              <path
                ref={pathRef}
                d={spreadPath.current}
                fill="none"
                stroke="#4A90B8"
                strokeWidth="1.5"
              />
              {/* Current position marker */}
              <circle cx="400" cy="42" r="3" fill="#4A90B8" />
            </svg>

            <div className="flex justify-between mt-4 pt-3 border-t" style={{ borderColor: 'rgba(42, 46, 53, 0.3)' }}>
              <span className="font-mono text-[10px] tracking-wider" style={{ color: '#4A90B8' }}>
                SPREAD Z-SCORE: -2.31
              </span>
              <span
                className="font-mono text-[10px] tracking-wider px-2 py-0.5 rounded"
                style={{ color: '#4A90B8', background: 'rgba(74, 144, 184, 0.1)' }}
              >
                LONG SIGNAL
              </span>
            </div>
          </GlassPanel>
        </motion.div>

        {/* Right: Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20%' }}
          variants={fadeUp}
          className="w-full lg:w-1/2"
        >
          <h2
            className="font-display text-[52px] md:text-[72px] lg:text-[96px] leading-[0.95] mb-4"
            style={{ color: '#F0E8D8' }}
          >
            TERMINAL
          </h2>
          <p
            className="font-display text-lg italic mb-8"
            style={{ color: '#4A90B8' }}
          >
            Where Statistical Arbitrage Lives
          </p>

          <div className="space-y-3">
            {FEATURES.map((feature, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="font-mono text-xs tracking-wide"
                style={{ color: '#6A6A62' }}
              >
                {feature}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
