// GrainPass.jsx — Film grain post-processing effect
// Governing spec: /home/nodeuser/documents/2026-03-28-bpl-landing-page-design.md

import { forwardRef, useMemo } from 'react'
import { Effect } from 'postprocessing'

const grainFragmentShader = `
precision mediump float;

uniform float uGrainStrength;
uniform float uTime;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    float grain = (hash(uv * 1000.0 + vec2(uTime)) - 0.5) * uGrainStrength;
    outputColor = vec4(inputColor.rgb + grain, inputColor.a);
}
`

class GrainEffect extends Effect {
  constructor({ strength = 0.03 } = {}) {
    super('GrainEffect', grainFragmentShader, {
      uniforms: new Map([
        ['uGrainStrength', { value: strength }],
        ['uTime', { value: 0 }],
      ]),
    })
  }

  update(renderer, inputBuffer, deltaTime) {
    this.uniforms.get('uTime').value += deltaTime
  }
}

const GrainPass = forwardRef(function GrainPass({ strength = 0.03 }, ref) {
  const effect = useMemo(() => new GrainEffect({ strength }), [])
  return <primitive ref={ref} object={effect} />
})

export default GrainPass
