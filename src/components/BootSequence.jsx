// BootSequence.jsx — Shader compilation overlay
// Governing spec: /home/nodeuser/documents/2026-03-28-bpl-landing-page-design.md
// Fades after: first R3F frame AND minimum 1.5s elapsed
// Failsafe: auto-dismisses after 4s even if canvas fails

import { useState, useEffect } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'

export default function BootSequence({ ready }) {
  const [minElapsed, setMinElapsed] = useState(false)
  const [failsafeElapsed, setFailsafeElapsed] = useState(false)

  useEffect(() => {
    // Minimum display time
    const minTimer = setTimeout(() => {
      setMinElapsed(true)
    }, 1500)

    // Failsafe: dismiss after 4s regardless
    const failsafe = setTimeout(() => {
      setFailsafeElapsed(true)
    }, 4000)

    return () => {
      clearTimeout(minTimer)
      clearTimeout(failsafe)
    }
  }, [])

  const visible = !failsafeElapsed && !(ready && minElapsed)

  return (
    <AnimatePresence>
      {visible && (
        <Motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: '#080A0C' }}
        >
          <span
            className="font-mono text-xs md:text-sm tracking-widest text-center px-6"
            style={{ color: '#6A6A62' }}
          >
            // BLACK PINE LAB :<br className="md:hidden" /> INITIALIZING INFRASTRUCTURE...
          </span>
        </Motion.div>
      )}
    </AnimatePresence>
  )
}
