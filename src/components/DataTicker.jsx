// DataTicker.jsx — Scrolling data ticker with DOM mutation
// Governing spec: /home/nodeuser/documents/2026-03-28-bpl-landing-page-design.md
// CSS marquee + JS value mutation, touch-hold pause, aria-hidden

import { useRef, useEffect, useState } from 'react'

const TICKER_ITEMS = [
  { label: 'ES/NQ SPREAD Z', key: 'zScore1', initial: '-2.31' },
  { label: 'SIGNAL CONFIDENCE', key: 'conf1', initial: '94.2%' },
  { label: 'LATENCY', key: 'lat1', initial: '0.4ms' },
  { label: 'POSITIONS ACTIVE', key: 'pos1', initial: '847' },
  { label: 'UPTIME', key: 'up1', initial: '99.97%' },
  { label: 'NQ/RTY SPREAD Z', key: 'zScore2', initial: '1.87' },
  { label: 'PAIRS MONITORED', key: 'pairs1', initial: '847' },
  { label: 'RISK STATUS', key: 'risk1', initial: 'CONTROLLED' },
]

export default function DataTicker() {
  const [paused, setPaused] = useState(false)
  const valueRefs = useRef({})

  // Mutate values periodically via direct DOM access
  useEffect(() => {
    const interval = setInterval(() => {
      const refs = valueRefs.current
      if (refs.zScore1) refs.zScore1.textContent = (-2.31 + (Math.random() - 0.5) * 0.06).toFixed(2)
      if (refs.conf1) refs.conf1.textContent = (94.2 + (Math.random() - 0.5) * 1.5).toFixed(1) + '%'
      if (refs.lat1) refs.lat1.textContent = (0.4 + (Math.random() - 0.5) * 0.1).toFixed(1) + 'ms'
      if (refs.zScore2) refs.zScore2.textContent = (1.87 + (Math.random() - 0.5) * 0.06).toFixed(2)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const tickerContent = TICKER_ITEMS.map((item, i) => (
    <span key={i} className="inline-flex items-center gap-1 mr-8">
      <span className="text-secondary">{item.label}:</span>
      <span
        className="text-amber"
        ref={(el) => { if (el) valueRefs.current[item.key] = el }}
      >
        {item.initial}
      </span>
      <span className="text-secondary mx-2">&middot;</span>
    </span>
  ))

  return (
    <>
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 overflow-hidden border-t"
        style={{
          background: 'rgba(8, 10, 12, 0.9)',
          borderColor: 'rgba(42, 46, 53, 0.5)',
          zIndex: 10,
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <div
          className="flex whitespace-nowrap py-2 px-4 font-mono text-[11px] tracking-wide"
          style={{
            animation: `ticker-scroll 30s linear infinite`,
            animationPlayState: paused ? 'paused' : 'running',
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
        >
          {tickerContent}
          {/* Duplicate for seamless loop */}
          {tickerContent}
        </div>
      </div>
      <div className="sr-only">
        Live market data ticker displaying current spread Z-scores and signal metrics
      </div>
    </>
  )
}
