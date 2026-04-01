// ParticleField.jsx — InstancedMesh particle system
// Governing spec: /home/nodeuser/documents/2026-03-28-bpl-landing-page-design.md

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { particleShaders } from './shaders'

export default function ParticleField({ uniformsRef, isMobile, gridData }) {
  const meshRef = useRef()

  const { geometry, material } = useMemo(() => {
    const { gridPos, offsets, phases } = gridData

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(gridPos, 3))
    geo.setAttribute('aGridPos', new THREE.BufferAttribute(gridPos, 3))
    geo.setAttribute('aOffset', new THREE.BufferAttribute(offsets, 3))
    geo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))

    const mat = new THREE.ShaderMaterial({
      vertexShader: particleShaders.vertex,
      fragmentShader: particleShaders.fragment,
      uniforms: {
        uTime: { value: 0 },
        uChaos: { value: 0.7 },
        uGridStrength: { value: 0.3 },
        uSplitX: { value: 0.58 },
        uPointScale: { value: isMobile ? 0.6 : 1.0 },
        uColorBase: { value: new THREE.Vector3(0.94, 0.91, 0.85) },
        uAlphaBase: { value: 0.8 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    return { geometry: geo, material: mat }
  }, [gridData, isMobile])

  useFrame((state) => {
    if (!meshRef.current) return
    const u = uniformsRef.current
    const mat = meshRef.current.material

    mat.uniforms.uTime.value = state.clock.elapsedTime
    mat.uniforms.uChaos.value = u.uChaos
    mat.uniforms.uGridStrength.value = u.uGridStrength
    mat.uniforms.uSplitX.value = u.uSplitX
    mat.uniforms.uPointScale.value = u.uPointScale
    mat.uniforms.uColorBase.value.set(u.uColorBase[0], u.uColorBase[1], u.uColorBase[2])
    mat.uniforms.uAlphaBase.value = u.uAlphaBase ?? 0.8
  })

  return (
    <points ref={meshRef} geometry={geometry} material={material} frustumCulled={false} />
  )
}
