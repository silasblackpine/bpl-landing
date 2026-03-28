// Nav.jsx — Fixed navigation bar
// Governing spec: /home/nodeuser/documents/2026-03-28-bpl-landing-page-design.md
// Transparent over hero → frosted on scroll. Audio toggle + CTA.

import { useRef, useEffect, useState } from 'react'
import AudioToggle from './AudioToggle'

export default function Nav({ onRequestAccess, onAudioToggle }) {
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-14 transition-all duration-500"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        background: scrolled ? 'rgba(17, 20, 24, 0.7)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(42, 46, 53, 0.3)' : '1px solid transparent',
      }}
    >
      {/* Wordmark */}
      <a href="#" className="font-display text-base tracking-wide" style={{ color: '#E8E0D0' }}>
        BLACK PINE LAB
      </a>

      {/* Center links */}
      <div className="hidden md:flex items-center gap-8">
        {['SENTINEL', 'TERMINAL', 'COMPANION', 'SAIS'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}-section`}
            className="font-mono text-[10px] tracking-[0.15em] transition-colors hover:text-primary"
            style={{ color: '#6A6A62' }}
          >
            {item}
          </a>
        ))}
      </div>

      {/* Right: Audio + CTA */}
      <div className="flex items-center gap-4">
        <AudioToggle onToggle={onAudioToggle} />
        <button
          onClick={onRequestAccess}
          className="font-mono text-[10px] tracking-[0.12em] px-4 py-1.5 rounded-full transition-all hover:bg-opacity-10"
          style={{
            border: '1px solid #C9A84C',
            color: '#C9A84C',
            background: 'rgba(201, 168, 76, 0.05)',
          }}
        >
          REQUEST ACCESS
        </button>
      </div>
    </nav>
  )
}
