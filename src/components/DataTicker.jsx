// DataTicker.jsx — Scrolling data ticker with Framer Motion spring-tweened values
// Governing spec: /home/nodeuser/documents/2026-03-28-bpl-landing-page-design.md
// Seamless marquee via duplicated content + rAF translateX, spring-interpolated numbers
// Both marquee copies share a single set of motion values so the wrap is invisible.

import { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import { motionValue, animate } from 'framer-motion'

const TICKER_ITEMS = [
  { label: 'ES/NQ SPREAD Z', key: 'zScore1', initial: -2.31, format: (v) => v.toFixed(2) },
  { label: 'SIGNAL CONFIDENCE', key: 'conf1', initial: 94.2, format: (v) => v.toFixed(1) + '%' },
  { label: 'LATENCY', key: 'lat1', initial: 0.4, format: (v) => v.toFixed(1) + 'ms' },
  { label: 'POSITIONS ACTIVE', key: 'pos1', initial: 847, format: (v) => String(Math.round(v)) },
  { label: 'UPTIME', key: 'up1', initial: 99.97, format: (v) => v.toFixed(2) + '%' },
  { label: 'NQ/RTY SPREAD Z', key: 'zScore2', initial: 1.87, format: (v) => v.toFixed(2) },
  { label: 'PAIRS MONITORED', key: 'pairs1', initial: 847, format: (v) => String(Math.round(v)) },
  { label: 'RISK STATUS', key: 'risk1', initial: 0, format: () => 'CONTROLLED' },
]

// Variance per key when generating a new random target
const JITTER = {
  zScore1: 0.08,
  conf1: 1.8,
  lat1: 0.15,
  pos1: 12,
  up1: 0.02,
  zScore2: 0.08,
  pairs1: 6,
}

/** Subscribes to a shared MotionValue and renders the formatted display string. */
function ValueDisplay({ mv, format }) {
  const [display, setDisplay] = useState(() => format(mv.get()))

  useEffect(() => {
    const unsub = mv.on('change', (v) => setDisplay(format(v)))
    return unsub
  }, [mv, format])

  return <span className="text-amber">{display}</span>
}

export default function DataTicker() {
  const [paused, setPaused] = useState(false)
  const trackRef = useRef(null)
  const rafRef = useRef(null)
  const offsetRef = useRef(0)
  const lastTimeRef = useRef(null)

  // Create one MotionValue per ticker item — shared across both marquee copies.
  const sharedMVs = useMemo(() => {
    const map = {}
    TICKER_ITEMS.forEach((item) => {
      map[item.key] = motionValue(item.initial)
    })
    return map
  }, [])

  // Drive jitter animations on the shared values
  useEffect(() => {
    const activeTimers = new Set()
    TICKER_ITEMS.forEach((item) => {
      const jitter = JITTER[item.key]
      if (!jitter) return
      const mv = sharedMVs[item.key]
      function scheduleNext() {
        const delay = 2000 + Math.random() * 1000 // 2-3s randomized
        const timer = setTimeout(() => {
          activeTimers.delete(timer)
          const target = item.initial + (Math.random() - 0.5) * jitter
          animate(mv, target, { duration: 1.5, ease: 'easeInOut' })
          scheduleNext()
        }, delay)
        activeTimers.add(timer)
      }
      scheduleNext()
    })
    return () => activeTimers.forEach(clearTimeout)
  }, [sharedMVs])

  // Manual rAF-based marquee for a perfectly seamless loop.
  // The track contains two identical copies of the items.
  // We translate from 0 to -halfWidth then wrap — since both copies
  // share the same motion values, the reset is invisible.
  const tick = useCallback((timestamp) => {
    if (!trackRef.current) { rafRef.current = requestAnimationFrame(tick); return }
    if (lastTimeRef.current === null) lastTimeRef.current = timestamp
    const delta = timestamp - lastTimeRef.current
    lastTimeRef.current = timestamp

    if (!paused) {
      const halfWidth = trackRef.current.scrollWidth / 2
      offsetRef.current = (offsetRef.current + (halfWidth / 30000) * delta) % halfWidth
      trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [paused])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [tick])

  const renderItems = (prefix) => TICKER_ITEMS.map((item, i) => (
    <span key={`${prefix}-${i}`} className="inline-flex items-center gap-1 mr-8">
      <span className="text-secondary">{item.label}:</span>
      <ValueDisplay mv={sharedMVs[item.key]} format={item.format} />
      <span className="text-secondary mx-2">&middot;</span>
    </span>
  ))

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed bottom-0 left-0 right-0 overflow-hidden border-t"
        style={{
          background: 'rgba(8, 10, 12, 0.92)',
          borderColor: 'rgba(42, 46, 53, 0.5)',
          zIndex: 50,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <div
          ref={trackRef}
          className="flex whitespace-nowrap py-2 px-4 font-mono text-[11px] tracking-wide"
          style={{ willChange: 'transform' }}
        >
          {renderItems('a')}
          {renderItems('b')}
        </div>
      </div>
      <div className="sr-only">
        Live market data ticker displaying current spread Z-scores and signal metrics
      </div>
    </>
  )
}
