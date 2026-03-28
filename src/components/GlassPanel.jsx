// GlassPanel.jsx — Reusable frosted glass container
// Governing spec: /home/nodeuser/documents/2026-03-28-bpl-landing-page-design.md
// backdrop-blur-2xl, 45% opacity, amber inner catch border, IO highlight on mobile

import { forwardRef } from 'react'

const GlassPanel = forwardRef(function GlassPanel({ children, className = '', style = {} }, ref) {
  return (
    <div
      ref={ref}
      className={`relative rounded-lg p-5 md:p-8 ${className}`}
      style={{
        background: 'rgba(17, 20, 24, 0.45)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        boxShadow: 'inset 0 0 0 1px rgba(201, 168, 76, 0.12), 0 0 40px rgba(0, 0, 0, 0.5)',
        transition: 'box-shadow 300ms ease',
        ...style,
      }}
    >
      {children}
    </div>
  )
})

export default GlassPanel
