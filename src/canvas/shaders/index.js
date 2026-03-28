// Shader source loader — imports GLSL as raw strings via Vite's ?raw suffix
import noiseGlsl from './noise.glsl?raw'
import particlesVert from './particles.vert?raw'
import particlesFrag from './particles.frag?raw'
import linesVert from './lines.vert?raw'
import linesFrag from './lines.frag?raw'
import ditherFrag from './dither.frag?raw'
import grainFrag from './grain.frag?raw'

// Inject shared noise.glsl into shaders that use #include noise
const injectNoise = (src) => src.replace('#include noise', noiseGlsl)

export const particleShaders = {
  vertex: injectNoise(particlesVert),
  fragment: particlesFrag,
}

export const lineShaders = {
  vertex: injectNoise(linesVert),
  fragment: linesFrag,
}

export const ditherShader = { fragment: ditherFrag }
export const grainShader = { fragment: grainFrag }
