precision mediump float;

uniform float uTime;
uniform float uChaos;
uniform float uGridStrength;
uniform float uSplitX;

attribute vec3 aGridPos;
attribute vec3 aOffset;
attribute float aPhase;

varying float vAlpha;

#include noise

void main() {
    // Exact same noise math as particles — guarantees zero drift
    vec3 noiseInput = aOffset + vec3(uTime * 0.3) + vec3(aPhase);
    float nx = snoise(noiseInput);
    float ny = snoise(noiseInput + vec3(31.416));
    float nz = snoise(noiseInput + vec3(62.832));
    vec3 chaosPos = aGridPos + vec3(nx, ny, nz) * uChaos * 2.5;

    // Spatial crystallization
    float normalizedX = (aGridPos.x + 10.0) / 20.0;
    float splitFactor = smoothstep(uSplitX - 0.05, uSplitX + 0.05, normalizedX);
    float localGrid = mix(0.0, uGridStrength, splitFactor);

    vec3 finalPos = mix(chaosPos, aGridPos, localGrid);

    // Lines only appear as order emerges. Max 15% opacity.
    vAlpha = smoothstep(0.4, 1.0, localGrid) * 0.15;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPos, 1.0);
}
