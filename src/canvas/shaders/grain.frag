precision mediump float;

uniform sampler2D tDiffuse;
uniform float uTime;
uniform float uGrainStrength;

varying vec2 vUv;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
    vec4 color = texture2D(tDiffuse, vUv);
    float grain = (hash(vUv * 1000.0 + vec2(uTime)) - 0.5) * uGrainStrength;
    gl_FragColor = vec4(color.rgb + grain, 1.0);
}
