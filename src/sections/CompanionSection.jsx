// CompanionSection.jsx — Your AI Strategic Mentor
// Governing spec: /home/nodeuser/documents/2026-03-28-bpl-landing-page-design.md

import { motion as Motion } from 'framer-motion'
import GlassPanel from '../components/GlassPanel'

const MESSAGES = [
  {
    sender: 'COMPANION',
    text: 'ES is approaching the 4hr VWAP. Vol profile shows thin air above. Reduce to half if price stalls here.',
    align: 'left',
  },
  {
    sender: 'TRADER',
    text: 'Holding. Watching the tape.',
    align: 'right',
  },
  {
    sender: 'COMPANION',
    text: 'Noted. R/R still favorable. Stop remains valid at 5482.',
    align: 'left',
  },
]

export default function CompanionSection() {
  return (
    <section
      id="companion-section"
      className="relative min-h-screen flex items-center justify-center px-6 md:px-10 lg:px-16 py-32"
      aria-label="Companion — AI Strategic Mentor"
    >
      <div className="max-w-2xl w-full text-center">
        <Motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.8 }}
          className="font-display text-[40px] md:text-[56px] lg:text-[72px] leading-[1.05] mb-3"
          style={{ color: '#F0E8D8' }}
        >
          You Don&apos;t Trade Alone.
        </Motion.h2>

        <Motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-sans text-base mb-12"
          style={{ color: '#E8E0D0' }}
        >
          <span style={{ color: '#C9A84C' }}>COMPANION</span> — Your AI Strategic Mentor.
          In-Session. In Real Time.
        </Motion.p>

        {/* Chat Interface */}
        <GlassPanel className="text-left">
          <div className="space-y-4">
            {MESSAGES.map((msg, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 1.2, duration: 0.6, ease: 'easeOut' }}
                className={`flex ${msg.align === 'right' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] ${msg.align === 'left' ? 'border-l-2 pl-4' : 'pr-4'}`}
                  style={{
                    borderColor: msg.align === 'left' ? 'rgba(201, 168, 76, 0.3)' : 'transparent',
                  }}
                >
                  <span
                    className="font-mono text-[9px] tracking-[0.15em] block mb-1"
                    style={{ color: msg.sender === 'COMPANION' ? '#C9A84C' : '#6A6A62' }}
                  >
                    {msg.sender}
                  </span>
                  <p
                    className="font-sans text-sm leading-relaxed"
                    style={{ color: msg.sender === 'COMPANION' ? '#E8E0D0' : '#6A6A62' }}
                  >
                    {msg.text}
                  </p>
                </div>
              </Motion.div>
            ))}
          </div>
        </GlassPanel>

        <Motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 4.5, duration: 0.6 }}
          className="font-mono text-[11px] tracking-[0.12em] mt-8"
          style={{ color: '#6A6A62' }}
        >
          Available for Futures // Crypto // Equities
        </Motion.p>
      </div>
    </section>
  )
}
