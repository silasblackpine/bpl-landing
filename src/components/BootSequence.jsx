// BootSequence.jsx — Shader compilation overlay
// Governing spec: /home/nodeuser/documents/2026-03-28-bpl-landing-page-design.md
// Fades after: first R3F frame AND minimum 1.5s elapsed
// Failsafe: auto-dismisses after 4s even if canvas fails

import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function BootSequence({ ready }) {
  const [visible, setVisible] = useState(true)
  const minTimeRef = useRef(false)

  useEffect(() => {
    // Minimum display time
    const minTimer = setTimeout(() => {
      minTimeRef.current = true
      if (ready) setVisible(false)
    }, 1500)

    // Failsafe: dismiss after 4s regardless
    const failsafe = setTimeout(() => {
      setVisible(false)
    }, 4000)

    return () => {
      clearTimeout(minTimer)
      clearTimeout(failsafe)
    }
  }, [])

  useEffect(() => {
    if (ready && minTimeRef.current) {
      setVisible(false)
    }
  }, [ready])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
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
        </motion.div>
      )}
    </AnimatePresence>
  )
}
