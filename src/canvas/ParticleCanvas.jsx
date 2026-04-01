// ParticleCanvas.jsx — R3F Canvas with particle system
// Governing spec: /home/nodeuser/documents/2026-03-28-bpl-landing-page-design.md
// pointer-events: none prevents canvas from swallowing UI clicks

import { useRef, useState, Component } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import ParticleField from './ParticleField'
import GridLines from './GridLines'
import useParticleData from './useParticleData'

// Error boundary
class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error) {
    console.error('[BPL] Canvas error:', error)
    this.props.onError?.()
  }
  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

// Camera controller
function CameraController({ uniformsRef }) {
  const { camera } = useThree()
  useFrame(() => {
    const targetZ = uniformsRef.current.uCameraZ
    // eslint-disable-next-line react-hooks/immutability -- R3F camera updates are per-frame imperative mutations.
    camera.position.z += (targetZ - camera.position.z) * 0.05
  })
  return null
}

// First frame notifier
function FirstFrameNotifier({ onFirstFrame }) {
  const fired = useRef(false)
  useFrame(() => {
    if (!fired.current) {
      fired.current = true
      requestAnimationFrame(() => onFirstFrame?.())
    }
  })
  return null
}

// Scene contents — must be inside Canvas for hooks to work
function Scene({ uniformsRef, isMobile, onFirstFrame }) {
  const { grid, lines } = useParticleData(isMobile)

  return (
    <>
      <CameraController uniformsRef={uniformsRef} />
      <ParticleField uniformsRef={uniformsRef} isMobile={isMobile} gridData={grid} />
      <GridLines uniformsRef={uniformsRef} lineData={lines} />
      <FirstFrameNotifier onFirstFrame={onFirstFrame} />
    </>
  )
}

export default function ParticleCanvas({ uniformsRef, onFirstFrame }) {
  const [isMobile] = useState(() => window.innerWidth < 768)

  const handleCreated = ({ gl, scene }) => {
    scene.background = new THREE.Color('#080A0C')
    const canvas = gl.domElement
    canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault()
      console.warn('[BPL] WebGL context lost')
    })
    canvas.addEventListener('webglcontextrestored', () => {
      console.info('[BPL] WebGL context restored')
      uniformsRef.current.uTime = 0
    })
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <CanvasErrorBoundary onError={onFirstFrame}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 100 }}
          dpr={Math.min(window.devicePixelRatio, 2)}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          onCreated={handleCreated}
          style={{ background: 'transparent' }}
        >
          <Scene uniformsRef={uniformsRef} isMobile={isMobile} onFirstFrame={onFirstFrame} />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  )
}
