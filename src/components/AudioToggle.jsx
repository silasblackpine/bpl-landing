// AudioToggle.jsx — Opt-in audio control
// Governing spec: /home/nodeuser/documents/2026-03-28-bpl-landing-page-design.md

import { useState } from 'react'

export default function AudioToggle({ onToggle }) {
  const [enabled, setEnabled] = useState(false)

  const handleClick = () => {
    const newState = onToggle()
    setEnabled(newState)
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Toggle audio"
      className="font-mono text-[10px] tracking-wider text-secondary hover:text-primary transition-colors"
      style={{ color: enabled ? '#C9A84C' : '#6A6A62' }}
    >
      AUDIO: {enabled ? 'ON' : 'OFF'}
    </button>
  )
}
