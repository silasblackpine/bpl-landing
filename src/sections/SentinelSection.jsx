// SentinelSection.jsx — The Execution Engine That Never Sleeps
// Governing spec: /home/nodeuser/documents/2026-03-28-bpl-landing-page-design.md

import { useRef, useCallback } from 'react'
import { motion as Motion } from 'framer-motion'
import GlassPanel from '../components/GlassPanel'
import AmberPulse from '../components/AmberPulse'
import useMarketFeed from '../hooks/useMarketFeed'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

export default function SentinelSection() {
  const signalRef = useRef(null)
  const entryRef = useRef(null)
  const exitRef = useRef(null)

  const flush = useCallback((data) => {
    const es = data['ES1!']
    if (!es) return
    if (signalRef.current) {
      signalRef.current.style.width = es.confidence + '%'
    }
  }, [])

  useMarketFeed({ symbols: ['ES1!'], onTick: flush })

  return (
    <section
      id="sentinel-section"
      className="relative min-h-screen flex items-center px-6 md:px-10 lg:px-16 py-32"
      aria-label="Sentinel — Autonomous Execution Engine"
    >
      <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16 w-full max-w-7xl mx-auto">
        {/* Left: Headline */}
        <Motion.div
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
            SENTINEL
          </h2>
          <p
            className="font-display text-lg italic mb-8"
            style={{ color: '#C9A84C' }}
          >
            The Execution Engine That Never Sleeps
          </p>
          <p
            className="font-sans text-base leading-relaxed max-w-md"
            style={{ color: '#9A9A8E' }}
          >
            Autonomous position management with institutional-grade risk controls.
            Sentinel monitors, executes, and adapts — continuously, without fatigue,
            without emotion, without hesitation.
          </p>
        </Motion.div>

        {/* Right: Dashboard Panel */}
        <Motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="w-full lg:w-1/2"
        >
          <GlassPanel>
            {/* Position Calculator */}
            <div className="mb-5">
              <span className="font-mono text-[10px] tracking-[0.15em]" style={{ color: '#C9A84C' }}>
                POSITION CALCULATOR
              </span>
              <div className="grid grid-cols-3 gap-4 mt-3">
                {[
                  { label: 'SIZE', value: '12 ES' },
                  { label: 'ENTRY', value: '5,487.25' },
                  { label: 'RISK', value: '$2,400' },
                ].map((item) => (
                  <div key={item.label}>
                    <span className="font-mono text-[8px] tracking-wider block" style={{ color: '#6A6A62' }}>
                      {item.label}
                    </span>
                    <span className="font-mono text-sm" style={{ color: '#E8E0D0' }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Signal Strength */}
            <div className="mb-5">
              <div className="flex justify-between mb-1">
                <span className="font-mono text-[9px] tracking-wider" style={{ color: '#6A6A62' }}>
                  SIGNAL STRENGTH
                </span>
                <span className="font-mono text-[9px] tracking-wider" style={{ color: '#C9A84C' }}>
                  STRONG
                </span>
              </div>
              <div className="h-1.5 rounded-full" style={{ background: 'rgba(42, 46, 53, 0.5)' }}>
                <div
                  ref={signalRef}
                  className="h-full rounded-full transition-[width] duration-1000"
                  style={{ width: '87%', background: '#C9A84C' }}
                />
              </div>
            </div>

            {/* Entry/Exit Triggers */}
            <div className="border-t pt-4 space-y-2" style={{ borderColor: 'rgba(42, 46, 53, 0.3)' }}>
              <div className="flex justify-between">
                <span className="font-mono text-[9px] tracking-wider" style={{ color: '#6A6A62' }}>
                  ENTRY TRIGGER
                </span>
                <span ref={entryRef} className="font-mono text-[9px] tracking-wider" style={{ color: '#E8E0D0' }}>
                  14:32:07.441 UTC
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-[9px] tracking-wider" style={{ color: '#6A6A62' }}>
                  EXIT TARGET
                </span>
                <span ref={exitRef} className="font-mono text-[9px] tracking-wider" style={{ color: '#E8E0D0' }}>
                  5,512.50 (+0.46%)
                </span>
              </div>
            </div>

            {/* Risk Badge */}
            <div className="flex items-center gap-2 mt-4 pt-3 border-t" style={{ borderColor: 'rgba(42, 46, 53, 0.3)' }}>
              <AmberPulse />
              <span className="font-mono text-[10px] tracking-wider" style={{ color: '#C9A84C' }}>
                RISK: CONTROLLED
              </span>
            </div>
          </GlassPanel>
        </Motion.div>
      </div>

      {/* Stat bar */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <span className="font-mono text-[11px] tracking-[0.12em]" style={{ color: '#6A6A62' }}>
          LATENCY: 0.4ms &nbsp;&nbsp;// &nbsp;&nbsp;UPTIME: 99.97% &nbsp;&nbsp;// &nbsp;&nbsp;POSITIONS MANAGED: ∞
        </span>
      </div>
    </section>
  )
}
