// AmberPulse.jsx — Animated status dot
// Governing spec: /home/nodeuser/documents/2026-03-28-bpl-landing-page-design.md

export default function AmberPulse({ className = '' }) {
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full ${className}`}
      style={{
        background: '#C9A84C',
        animation: 'pulse-amber 2s ease-in-out infinite',
      }}
    />
  )
}
