// Footer.jsx — Minimal footer
// Governing spec: /home/nodeuser/documents/2026-03-28-bpl-landing-page-design.md

import { motion as Motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative px-6 md:px-10 lg:px-16 py-12 border-t"
      style={{
        borderColor: 'rgba(42, 46, 53, 0.3)',
        paddingBottom: 'calc(3rem + env(safe-area-inset-bottom))',
      }}
    >
      <Motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <span className="font-display text-sm" style={{ color: '#E8E0D0' }}>
          BLACK PINE LAB
        </span>

        <p
          className="font-mono text-[10px] tracking-[0.08em] text-center md:text-right leading-relaxed"
          style={{ color: '#6A6A62' }}
        >
          // BLACK PINE LAB LLC — ALGORITHMIC SYSTEMS — ALL STRATEGIES INVOLVE RISK — NOT FINANCIAL ADVICE
        </p>
      </Motion.div>
    </footer>
  )
}
