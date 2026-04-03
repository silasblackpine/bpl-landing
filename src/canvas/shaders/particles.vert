precision mediump float;

uniform float uTime;
uniform float uChaos;
uniform float uGridStrength;
uniform float uSplitX;
uniform float uPointScale;

attribute vec3 aGridPos;
attribute vec3 aOffset;
attribute float aPhase;

varying float vAlpha;

#include noise

void main() {
    // Brownian chaos position
    vec3 noiseInput = aOffset + vec3(uTime * 0.3) + vec3(aPhase);
    float nx = snoise(noiseInput);
    float ny = snoise(noiseInput + vec3(31.416));
    float nz = snoise(noiseInput + vec3(62.832));
    vec3 chaosPos = aGridPos + vec3(nx, ny, nz) * uChaos * 2.5;

    // Spatial crystallization threshold
    // Normalization spans full ±20 grid extent. At Z=12 on 16:9 displays,
    // horizontal half-width reaches ~16.4 units — must cover entire grid.
    float normalizedX = (aGridPos.x + 20.0) / 40.0;
    float splitFactor = smoothstep(uSplitX - 0.05, uSplitX + 0.05, normalizedX);

    // Local grid strength
    float localGrid = mix(0.0, uGridStrength, splitFactor);

    // Final position: interpolate between chaos and lattice
    vec3 finalPos = mix(chaosPos, aGridPos, localGrid);

    // Point size with perspective
    vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
    gl_PointSize = clamp(uPointScale * (300.0 / -mvPosition.z), 1.0, 3.5);
    gl_Position = projectionMatrix * mvPosition;

    // Ordered particles slightly brighter
    vAlpha = 0.6 + localGrid * 0.4;
}
