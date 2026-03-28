// DitherPass.jsx — Bayer 8x8 ordered dither post-processing
// Governing spec: /home/nodeuser/documents/2026-03-28-bpl-landing-page-design.md

import { forwardRef, useMemo } from 'react'
import { Effect } from 'postprocessing'
import { ditherShader } from '../shaders'

const ditherFragmentShader = `
precision mediump float;

uniform float uDitherIntensity;

float bayer8(vec2 pos) {
    vec2 p = floor(mod(pos, 8.0));
    float idx = p.x + p.y * 8.0;
    // Compressed Bayer 8x8 using bit manipulation approximation
    float row = floor(idx / 8.0);
    float col = mod(idx, 8.0);
    float val = mod(floor(col / 1.0) * 32.0 + floor(row / 1.0) * 16.0, 64.0);
    // Approximate Bayer pattern
    float x2 = mod(col, 2.0);
    float y2 = mod(row, 2.0);
    float x4 = mod(floor(col / 2.0), 2.0);
    float y4 = mod(floor(row / 2.0), 2.0);
    float x8 = mod(floor(col / 4.0), 2.0);
    float y8 = mod(floor(row / 4.0), 2.0);
    val = x2 * 32.0 + y2 * 16.0 + x4 * 8.0 + y4 * 4.0 + x8 * 2.0 + y8 * 1.0;
    return val / 64.0;
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    float lum = dot(inputColor.rgb, vec3(0.299, 0.587, 0.114));
    vec2 pixelPos = uv * vec2(1920.0, 1080.0);
    float threshold = bayer8(pixelPos);
    float dithered = step(threshold, lum + uDitherIntensity * 0.1);
    vec3 result = mix(inputColor.rgb, vec3(dithered) * inputColor.rgb * 1.2, uDitherIntensity * 0.4);
    outputColor = vec4(result, inputColor.a);
}
`

class DitherEffect extends Effect {
  constructor({ intensity = 0.3 } = {}) {
    super('DitherEffect', ditherFragmentShader, {
      uniforms: new Map([
        ['uDitherIntensity', { value: intensity }],
      ]),
    })
  }

  set intensity(value) {
    this.uniforms.get('uDitherIntensity').value = value
  }
}

const DitherPass = forwardRef(function DitherPass({ intensity = 0.3 }, ref) {
  const effect = useMemo(() => new DitherEffect({ intensity }), [])
  return <primitive ref={ref} object={effect} />
})

export default DitherPass
