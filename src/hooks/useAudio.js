// useAudio.js — Web Audio API for crystallization "lock" sound
// Governing spec: /home/nodeuser/documents/2026-03-28-bpl-landing-page-design.md
// Opt-in only. AudioContext created on first user gesture.

import { useRef, useCallback } from 'react'

export default function useAudio() {
  const ctxRef = useRef(null)
  const bufferRef = useRef(null)
  const enabledRef = useRef(false)
  const playedRef = useRef(false)

  const init = useCallback(async () => {
    if (ctxRef.current) return
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      ctxRef.current = ctx

      // Generate a synthetic "lock" click sound (no external file needed)
      const sampleRate = ctx.sampleRate
      const duration = 0.15
      const length = sampleRate * duration
      const buffer = ctx.createBuffer(1, length, sampleRate)
      const data = buffer.getChannelData(0)

      for (let i = 0; i < length; i++) {
        const t = i / sampleRate
        // Sharp attack, fast decay — mechanical click
        const envelope = Math.exp(-t * 60)
        const tone = Math.sin(t * 2400 * Math.PI * 2) * 0.3
        const noise = (Math.random() - 0.5) * 0.7
        data[i] = (tone + noise) * envelope
      }

      bufferRef.current = buffer
    } catch (e) {
      console.warn('[BPL] Web Audio not available:', e)
    }
  }, [])

  const play = useCallback(() => {
    if (!enabledRef.current || playedRef.current) return
    if (!ctxRef.current || !bufferRef.current) return

    playedRef.current = true
    const source = ctxRef.current.createBufferSource()
    source.buffer = bufferRef.current

    const gain = ctxRef.current.createGain()
    gain.gain.value = 0.15 // subtle
    source.connect(gain)
    gain.connect(ctxRef.current.destination)
    source.start()
  }, [])

  const toggle = useCallback(() => {
    enabledRef.current = !enabledRef.current
    if (enabledRef.current) init()
    return enabledRef.current
  }, [init])

  const reset = useCallback(() => {
    playedRef.current = false
  }, [])

  return { play, toggle, reset, enabledRef }
}
