precision mediump float;

uniform vec3 uColorBase;

varying float vAlpha;

void main() {
    if (vAlpha < 0.01) discard;
    gl_FragColor = vec4(uColorBase, vAlpha);
}
