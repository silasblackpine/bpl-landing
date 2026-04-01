// AccessModal.jsx — Lead capture modal (prototype)
// Governing spec: /home/nodeuser/documents/2026-03-28-bpl-landing-page-design.md
// No backend. Mock form → success state.

import { useState, useRef, useEffect, useCallback } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'

export default function AccessModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const handleClose = useCallback(() => {
    setSubmitted(false)
    onClose()
  }, [onClose])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    if (isOpen) window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, handleClose])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[80] flex items-center justify-center"
          style={{ background: 'rgba(8, 10, 12, 0.85)' }}
          onClick={(e) => {
            if (e.target === e.currentTarget && window.innerWidth >= 768) handleClose()
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Request Access"
        >
          <Motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-md mx-4 rounded-lg p-8"
            style={{
              background: 'rgba(17, 20, 24, 0.8)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              boxShadow: 'inset 0 0 0 1px rgba(201, 168, 76, 0.12), 0 0 60px rgba(0, 0, 0, 0.6)',
            }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 font-mono text-xs hover:opacity-100 transition-opacity"
              style={{ color: '#6A6A62', opacity: 0.6 }}
              aria-label="Close modal"
            >
              [X]
            </button>

            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <h3
                  className="font-mono text-sm tracking-widest mb-2"
                  style={{ color: '#C9A84C' }}
                >
                  ACCESS RESTRICTED
                </h3>
                <p
                  className="font-display text-xl mb-6"
                  style={{ color: '#E8E0D0' }}
                >
                  Institutional Verification Required
                </p>
                <input
                  ref={inputRef}
                  type="email"
                  required
                  placeholder="institutional@email.com"
                  className="w-full rounded px-4 py-3 font-mono text-sm mb-4 outline-none focus:ring-1"
                  style={{
                    background: 'rgba(8, 10, 12, 0.6)',
                    border: '1px solid rgba(42, 46, 53, 0.5)',
                    color: '#E8E0D0',
                    caretColor: '#C9A84C',
                  }}
                />
                <button
                  type="submit"
                  className="w-full rounded-full py-3 font-mono text-xs tracking-widest transition-all hover:bg-opacity-10"
                  style={{
                    border: '1px solid #C9A84C',
                    color: '#C9A84C',
                    background: 'rgba(201, 168, 76, 0.05)',
                  }}
                >
                  REQUEST ACCESS
                </button>
              </form>
            ) : (
              <div className="text-center py-4">
                <p
                  className="font-mono text-sm tracking-widest"
                  style={{ color: '#C9A84C' }}
                >
                  // REQUEST RECEIVED
                </p>
                <p
                  className="font-mono text-xs mt-2 tracking-wide"
                  style={{ color: '#6A6A62' }}
                >
                  VERIFICATION PENDING
                </p>
              </div>
            )}
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  )
}
