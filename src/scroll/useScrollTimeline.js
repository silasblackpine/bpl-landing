// useScrollTimeline.js — Lenis + GSAP ScrollTrigger → shader uniform mapping
// Governing spec: /home/nodeuser/documents/2026-03-28-bpl-landing-page-design.md

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function debounce(fn, ms) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }
}

export default function useScrollTimeline(uniformsRef, audioRef) {
  const lenisRef = useRef(null)

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.8,
    })
    lenisRef.current = lenis

    // Bridge Lenis → GSAP
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    // Mobile vh shift handler
    const onResize = debounce(() => ScrollTrigger.refresh(), 250)
    window.addEventListener('resize', onResize)

    const u = uniformsRef.current

    // === HERO (0-100vh) — initial state set in ref defaults ===

    // === PRE-CRYSTALLIZATION (100vh-115vh) ===
    ScrollTrigger.create({
      trigger: '#sentinel-section',
      start: 'top-=15% bottom',
      end: 'top bottom',
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress
        u.uChaos = 0.7 - p * 0.4        // 0.7 → 0.3
        u.uSplitX = 0.58 - p * 0.38     // 0.58 → 0.2
      },
    })

    // === CRYSTALLIZATION (115vh-130vh) ===
    ScrollTrigger.create({
      trigger: '#sentinel-section',
      start: 'top bottom',
      end: 'top 70%',
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress
        u.uChaos = 0.3 - p * 0.2               // 0.3 → 0.1
        u.uGridStrength = 0.3 + p * 0.6         // 0.3 → 0.9
        u.uSplitX = 0.2 - p * 0.2               // 0.2 → 0.0
        u.uDitherIntensity = 0.3 + p * 0.2      // 0.3 → 0.5

        // Sound trigger at crystallization peak
        if (p > 0.8 && u.uSplitX < 0.05) {
          audioRef?.play?.()
        }
      },
    })

    // === SENTINEL (130vh-230vh) ===
    ScrollTrigger.create({
      trigger: '#sentinel-section',
      start: 'top 70%',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress
        u.uChaos = 0.1
        u.uGridStrength = 0.9
        u.uCameraZ = 5.0 + p * 3.0               // 5 → 8 (pull back)
        // Tint toward amber
        u.uColorBase = [
          0.94 - p * 0.15,   // → 0.79 (#C9...)
          0.91 - p * 0.25,   // → 0.66
          0.85 - p * 0.55,   // → 0.30
        ]
      },
    })

    // === TERMINAL (230vh-330vh) ===
    ScrollTrigger.create({
      trigger: '#terminal-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress
        u.uChaos = 0.1 + p * 0.3                // 0.1 → 0.4
        u.uGridStrength = 0.9 - p * 0.3          // 0.9 → 0.6
        u.uDitherIntensity = 0.5 - p * 0.2       // 0.5 → 0.3
        // Tint toward arctic blue
        u.uColorBase = [
          0.79 - p * 0.50,   // → 0.29 (#4A...)
          0.66 - p * 0.10,   // → 0.56
          0.30 + p * 0.42,   // → 0.72
        ]
      },
    })

    // === COMPANION (330vh-430vh) ===
    ScrollTrigger.create({
      trigger: '#companion-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress
        u.uChaos = 0.4 + p * 0.2                // 0.4 → 0.6
        u.uGridStrength = 0.6 - p * 0.3          // 0.6 → 0.3
        u.uCameraZ = 8.0 - p * 2.0               // 8 → 6 (push in)
        // Tint back to warm ivory
        u.uColorBase = [
          0.29 + p * 0.65,   // → 0.94
          0.56 + p * 0.35,   // → 0.91
          0.72 + p * 0.13,   // → 0.85
        ]
      },
    })

    // === ELITE SAIS (430vh-530vh) ===
    ScrollTrigger.create({
      trigger: '#sais-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress
        u.uChaos = 0.6 - p * 0.6                // 0.6 → 0.0
        u.uGridStrength = 0.3 + p * 0.7          // 0.3 → 1.0
        u.uCameraZ = 6.0 + p * 6.0               // 6 → 12 (max pullback)
        u.uDitherIntensity = 0.3 + p * 0.3       // 0.3 → 0.6
        // Tint toward pure white
        u.uColorBase = [
          0.94 + p * 0.06,   // → 1.0
          0.91 + p * 0.09,   // → 1.0
          0.85 + p * 0.15,   // → 1.0
        ]
      },
    })

    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach((t) => t.kill())
      window.removeEventListener('resize', onResize)
    }
  }, [uniformsRef, audioRef])

  return lenisRef
}
