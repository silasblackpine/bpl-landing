precision mediump float;

uniform vec3 uColorBase;
uniform float uAlphaBase;

varying float vAlpha;

void main() {
    float dist = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.15, dist) * vAlpha * uAlphaBase;
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(uColorBase, alpha);
}
