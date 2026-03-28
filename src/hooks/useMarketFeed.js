// useMarketFeed.js — WebSocket-ready mock data hook with DOM mutation
// Governing spec: /home/nodeuser/documents/2026-03-28-bpl-landing-page-design.md
// Prototype: mock emitter. Production: swap url for real wss:// endpoint.

import { useRef, useEffect, useCallback } from 'react'

const BASE_DATA = {
  'ES1!': { zScore: -2.31, confidence: 94.2, latency: 0.4 },
  'NQ1!': { zScore: 1.87, confidence: 87.6, latency: 0.3 },
}

function randomDrift(base, range) {
  return base + (Math.random() - 0.5) * range
}

export default function useMarketFeed({ url = null, symbols = [], onTick }) {
  const intervalRef = useRef(null)
  const dataRef = useRef({ ...BASE_DATA })

  const tick = useCallback(() => {
    for (const sym of symbols) {
      if (!dataRef.current[sym]) continue
      const d = dataRef.current[sym]
      dataRef.current[sym] = {
        zScore: randomDrift(d.zScore, 0.06),
        confidence: Math.max(80, Math.min(99, randomDrift(d.confidence, 1.5))),
        latency: Math.max(0.1, randomDrift(d.latency, 0.1)),
      }
    }
    onTick?.(dataRef.current)
  }, [symbols, onTick])

  useEffect(() => {
    if (url) {
      // Production: WebSocket mode
      // const ws = new WebSocket(url)
      // ws.onmessage = (e) => { dataRef.current = JSON.parse(e.data); onTick?.(dataRef.current) }
      // return () => ws.close()
    }

    // Prototype: mock interval (2-4s randomized)
    const scheduleTick = () => {
      const delay = 2000 + Math.random() * 2000
      intervalRef.current = setTimeout(() => {
        tick()
        scheduleTick()
      }, delay)
    }

    scheduleTick()

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current)
    }
  }, [url, tick])

  return dataRef
}
