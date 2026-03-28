// useMobileHighlight.js — IntersectionObserver center-viewport highlight for GlassPanels
// Governing spec: /home/nodeuser/documents/2026-03-28-bpl-landing-page-design.md

import { useEffect, useRef } from 'react'

export default function useMobileHighlight(elementRef) {
  const isHighlighted = useRef(false)

  useEffect(() => {
    const el = elementRef.current
    if (!el || window.innerWidth >= 768) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isHighlighted.current) {
          isHighlighted.current = true
          el.style.transition = 'box-shadow 300ms ease'
          el.style.boxShadow = 'inset 0 0 0 1px rgba(201,168,76,0.25)'
        } else if (!entry.isIntersecting && isHighlighted.current) {
          isHighlighted.current = false
          el.style.boxShadow = 'inset 0 0 0 1px rgba(201,168,76,0.12)'
        }
      },
      {
        threshold: 0.5,
        rootMargin: '-45% 0px -45% 0px',
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [elementRef])
}
