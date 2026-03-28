// useFPSMonitor.js — Adaptive performance degradation
// Governing spec: /home/nodeuser/documents/2026-03-28-bpl-landing-page-design.md
// Tier 0: full quality | Tier 1: no dither/grain | Tier 2: reduced particles

import { useRef, useState, useEffect } from 'react'

export default function useFPSMonitor() {
  const [tier, setTier] = useState(0)
  const samples = useRef([])
  const rafId = useRef(null)
  const lastTime = useRef(0)
  const done = useRef(false)

  useEffect(() => {
    if (done.current) return

    const measure = (time) => {
      if (lastTime.current > 0) {
        samples.current.push(time - lastTime.current)
      }
      lastTime.current = time

      if (samples.current.length >= 120) {
        // Compute median frame time
        const sorted = [...samples.current].sort((a, b) => a - b)
        const median = sorted[Math.floor(sorted.length / 2)]

        if (median > 22) {
          setTier(2) // <45fps: reduce particles + kill post-processing
        } else if (median > 18) {
          setTier(1) // 45-55fps: kill post-processing only
        }
        // else tier 0 (default)

        done.current = true
        return
      }

      rafId.current = requestAnimationFrame(measure)
    }

    rafId.current = requestAnimationFrame(measure)

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return tier
}
