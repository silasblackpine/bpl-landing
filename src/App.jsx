// App.jsx — Root application component
// Governing spec: /home/nodeuser/documents/2026-03-28-bpl-landing-page-design.md

import { useRef, useState, useCallback } from 'react'
import ParticleCanvas from './canvas/ParticleCanvas'
import Nav from './components/Nav'
import BootSequence from './components/BootSequence'
import AccessModal from './components/AccessModal'
import HeroSection from './sections/HeroSection'
import SentinelSection from './sections/SentinelSection'
import TerminalSection from './sections/TerminalSection'
import CompanionSection from './sections/CompanionSection'
import SaisSection from './sections/SaisSection'
import Footer from './sections/Footer'
import useScrollTimeline from './scroll/useScrollTimeline'
import useAudio from './hooks/useAudio'

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [canvasReady, setCanvasReady] = useState(false)

  // Shader uniforms ref — GSAP writes, useFrame reads
  const uniformsRef = useRef({
    uChaos: 0.7,
    uGridStrength: 0.3,
    uSplitX: 0.58,
    uCameraZ: 5.0,
    uDitherIntensity: 0.3,
    uGrainStrength: 0.03,
    uColorBase: [0.94, 0.91, 0.85],
    uPointScale: 1.0,
    uAlphaBase: 0.8,
  })

  const audio = useAudio()

  // Initialize scroll timeline (Lenis + GSAP)
  useScrollTimeline(uniformsRef, audio)

  const handleFirstFrame = useCallback(() => {
    setCanvasReady(true)
  }, [])

  return (
    <div className="relative" style={{ minHeight: '100vh' }}>
      <BootSequence ready={canvasReady} />

      <ParticleCanvas
        uniformsRef={uniformsRef}
        onFirstFrame={handleFirstFrame}
      />

      <Nav
        onRequestAccess={() => setModalOpen(true)}
        onAudioToggle={audio.toggle}
      />

      <AccessModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      <main>
        <HeroSection
          onExplore={() => {
            document.getElementById('sentinel-section')?.scrollIntoView({ behavior: 'smooth' })
          }}
          onTerminal={() => {
            document.getElementById('terminal-section')?.scrollIntoView({ behavior: 'smooth' })
          }}
        />
        <SentinelSection />
        <TerminalSection />
        <CompanionSection />
        <SaisSection onApply={() => setModalOpen(true)} />
        <Footer />
      </main>
    </div>
  )
}
