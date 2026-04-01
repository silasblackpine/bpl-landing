// SaisSection.jsx — Secure Algorithmic Infrastructure as a Service
// Governing spec: /home/nodeuser/documents/2026-03-28-bpl-landing-page-design.md

import { motion as Motion } from 'framer-motion'
import GlassPanel from '../components/GlassPanel'

const FEATURES = [
  {
    title: 'White-Glove Deployment',
    description: 'Custom execution environment per client. Dedicated infrastructure. Zero shared state.',
    icon: '◆',
  },
  {
    title: 'Compliance-Native',
    description: 'Audit logs. Kill switches. Position limits. SOC 2 ready.',
    icon: '◆',
  },
  {
    title: 'Institutional API Access',
    description: 'Co-location ready. FIX protocol. REST + WebSocket. Sub-millisecond.',
    icon: '◆',
  },
]

export default function SaisSection({ onApply }) {
  return (
    <section
      id="sais-section"
      className="relative min-h-screen flex items-center justify-center px-6 md:px-10 lg:px-16 py-32"
      aria-label="Elite SAIS — Secure Algorithmic Infrastructure as a Service"
    >
      <div className="max-w-5xl w-full text-center">
        <Motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.8 }}
          className="font-display text-[52px] md:text-[72px] lg:text-[96px] leading-[0.95] mb-3"
          style={{ color: '#F0E8D8' }}
        >
          ELITE SAIS
        </Motion.h2>

        <Motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-display text-lg italic mb-16"
          style={{ color: '#E8E0D0' }}
        >
          Secure Algorithmic Infrastructure. As a Service.
        </Motion.p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {FEATURES.map((feature, i) => (
            <Motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.6, ease: 'easeOut' }}
            >
              <GlassPanel className="h-full text-left">
                <span
                  className="font-mono text-[10px] tracking-wider block mb-3"
                  style={{ color: '#C9A84C' }}
                >
                  {feature.icon} {String(i + 1).padStart(2, '0')}
                </span>
                <h3
                  className="font-mono text-sm tracking-wide mb-3"
                  style={{ color: '#F0E8D8' }}
                >
                  {feature.title}
                </h3>
                <p
                  className="font-sans text-sm leading-relaxed"
                  style={{ color: '#6A6A62' }}
                >
                  {feature.description}
                </p>
              </GlassPanel>
            </Motion.div>
          ))}
        </div>

        <Motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="font-sans text-base mb-8"
          style={{ color: '#6A6A62' }}
        >
          Built for funds. Priced for the serious.
          <br />
          <span style={{ color: '#E8E0D0' }}>Not for everyone — by design.</span>
        </Motion.p>

        <Motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <button
            onClick={onApply}
            className="font-mono text-[11px] tracking-[0.12em] px-8 py-3 rounded-full transition-all hover:bg-opacity-10"
            style={{
              border: '1px solid #C9A84C',
              color: '#C9A84C',
              background: 'rgba(201, 168, 76, 0.05)',
            }}
          >
            APPLY FOR ACCESS
          </button>
        </Motion.div>
      </div>
    </section>
  )
}
