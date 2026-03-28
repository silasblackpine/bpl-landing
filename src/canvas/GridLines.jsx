// GridLines.jsx — Static LineSegments with GPU-driven animation
// Governing spec: /home/nodeuser/documents/2026-03-28-bpl-landing-page-design.md

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { lineShaders } from './shaders'

export default function GridLines({ uniformsRef, isMobile, lineData }) {
  const linesRef = useRef()

  const { geometry, material } = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(lineData.positions, 3))
    geo.setAttribute('aGridPos', new THREE.BufferAttribute(lineData.positions, 3))
    geo.setAttribute('aOffset', new THREE.BufferAttribute(lineData.offsets, 3))
    geo.setAttribute('aPhase', new THREE.BufferAttribute(lineData.phases, 1))

    const mat = new THREE.ShaderMaterial({
      vertexShader: lineShaders.vertex,
      fragmentShader: lineShaders.fragment,
      uniforms: {
        uTime: { value: 0 },
        uChaos: { value: 0.7 },
        uGridStrength: { value: 0.3 },
        uSplitX: { value: 0.58 },
        uColorBase: { value: new THREE.Vector3(0.16, 0.19, 0.25) },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    return { geometry: geo, material: mat }
  }, [lineData, isMobile])

  useFrame((state) => {
    if (!linesRef.current) return
    const u = uniformsRef.current
    const mat = linesRef.current.material

    mat.uniforms.uTime.value = state.clock.elapsedTime
    mat.uniforms.uChaos.value = u.uChaos
    mat.uniforms.uGridStrength.value = u.uGridStrength
    mat.uniforms.uSplitX.value = u.uSplitX
    mat.uniforms.uColorBase.value.set(u.uColorBase[0], u.uColorBase[1], u.uColorBase[2])
  })

  return (
    <lineSegments ref={linesRef} geometry={geometry} material={material} frustumCulled={false} />
  )
}
