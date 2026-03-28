// HeroSection.jsx — Split viewport: editorial left, dashboard ghost right
// Governing spec: /home/nodeuser/documents/2026-03-28-bpl-landing-page-design.md

import { useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import GlassPanel from '../components/GlassPanel'
import AmberPulse from '../components/AmberPulse'
import DataTicker from '../components/DataTicker'
import useMarketFeed from '../hooks/useMarketFeed'

const stagger = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.15, duration: 0.8, ease: 'easeOut' },
  }),
}

export default function HeroSection({ onExplore, onTerminal }) {
  const zScoreRef = useRef(null)
  const confidenceRef = useRef(null)
  const latencyRef = useRef(null)
  const signalBarRef = useRef(null)

  const flush = useCallback((data) => {
    const es = data['ES1!']
    if (!es) return
    if (zScoreRef.current) zScoreRef.current.textContent = es.zScore.toFixed(2)
    if (confidenceRef.current) confidenceRef.current.textContent = es.confidence.toFixed(1) + '%'
    if (latencyRef.current) latencyRef.current.textContent = es.latency.toFixed(1) + 'ms'
    if (signalBarRef.current) signalBarRef.current.style.width = es.confidence + '%'
  }, [])

  useMarketFeed({
    symbols: ['ES1!', 'NQ1!'],
    onTick: flush,
  })

  return (
    <section
      id="hero-section"
      className="relative h-screen flex items-center px-6 md:px-10 lg:px-16"
      aria-label="Black Pine Lab — Autonomous Quantitative Systems"
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-[6%] w-full max-w-7xl mx-auto pt-14">
        {/* Left: Editorial */}
        <div className="w-full lg:w-[58%]">
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="font-mono text-xs tracking-[0.12em] mb-4"
            style={{ color: '#6A6A62' }}
          >
            // BLACK PINE LAB — AUTONOMOUS QUANTITATIVE SYSTEMS
          </motion.p>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="font-display text-[40px] md:text-[56px] lg:text-[72px] leading-[1.05] mb-4"
            style={{ color: '#F0E8D8' }}
          >
            The Market Has a Signal.
            <br />
            <em className="italic" style={{ color: '#C9A84C' }}>
              Most Firms Can&apos;t Hear It.
            </em>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="font-mono text-xs tracking-[0.1em] mb-8"
            style={{ color: '#6A6A62' }}
          >
            // SIGNAL-TO-NOISE RATIO: CLASSIFIED
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-wrap gap-3"
          >
            <button
              onClick={onExplore}
              className="font-mono text-[11px] tracking-[0.12em] px-6 py-2.5 rounded-full transition-all hover:bg-opacity-10"
              style={{
                border: '1px solid #C9A84C',
                color: '#C9A84C',
                background: 'rgba(201, 168, 76, 0.05)',
              }}
            >
              EXPLORE INFRASTRUCTURE
            </button>
            <button
              onClick={onTerminal}
              className="font-mono text-[11px] tracking-[0.12em] px-6 py-2.5 rounded-full transition-colors"
              style={{
                border: '1px solid rgba(42, 46, 53, 0.5)',
                color: '#6A6A62',
              }}
            >
              VIEW RESEARCH TERMINAL
            </button>
          </motion.div>
        </div>

        {/* Right: Dashboard Ghost */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="w-full lg:w-[36%]"
        >
          <GlassPanel>
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[10px] tracking-[0.15em]" style={{ color: '#C9A84C' }}>
                SENTINEL // LIVE
              </span>
              <AmberPulse />
            </div>

            {/* Signal strength bar */}
            <div className="mb-3">
              <div className="flex justify-between mb-1">
                <span className="font-mono text-[9px] tracking-wider" style={{ color: '#6A6A62' }}>
                  SIGNAL STRENGTH
                </span>
                <span
                  ref={confidenceRef}
                  className="font-mono text-[9px] tracking-wider"
                  style={{ color: '#C9A84C' }}
                >
                  94.2%
                </span>
              </div>
              <div className="h-1 rounded-full" style={{ background: 'rgba(42, 46, 53, 0.5)' }}>
                <div
                  ref={signalBarRef}
                  className="h-full rounded-full transition-[width] duration-1000"
                  style={{ width: '94.2%', background: '#C9A84C' }}
                />
              </div>
            </div>

            {/* Risk status */}
            <div className="flex items-center gap-2 mb-4">
              <AmberPulse />
              <span className="font-mono text-[9px] tracking-wider" style={{ color: '#6A6A62' }}>
                RISK: CONTROLLED
              </span>
            </div>

            <div className="border-t pt-3" style={{ borderColor: 'rgba(42, 46, 53, 0.3)' }}>
              {/* Pairs data */}
              <div className="flex justify-between mb-2">
                <span className="font-mono text-[9px] tracking-wider" style={{ color: '#4A90B8' }}>
                  ES1!/NQ1! Z-SCORE
                </span>
                <span
                  ref={zScoreRef}
                  className="font-mono text-[9px] tracking-wider"
                  style={{ color: '#4A90B8' }}
                >
                  -2.31
                </span>
              </div>
              <div className="h-1 rounded-full" style={{ background: 'rgba(42, 46, 53, 0.5)' }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: '62%', background: '#4A90B8' }}
                />
              </div>

              {/* Latency */}
              <div className="flex justify-between mt-3">
                <span className="font-mono text-[9px] tracking-wider" style={{ color: '#6A6A62' }}>
                  LATENCY
                </span>
                <span
                  ref={latencyRef}
                  className="font-mono text-[9px] tracking-wider"
                  style={{ color: '#6A6A62' }}
                >
                  0.4ms
                </span>
              </div>
            </div>
          </GlassPanel>
        </motion.div>
      </div>

      {/* Bottom ticker */}
      <DataTicker />
    </section>
  )
}
