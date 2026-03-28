precision mediump float;

uniform sampler2D tDiffuse;
uniform float uDitherIntensity;

varying vec2 vUv;

// Bayer 8x8 ordered dither matrix
float bayer8(vec2 pos) {
    vec2 p = floor(mod(pos, 8.0));
    float idx = p.x + p.y * 8.0;

    // Row 0
    if (idx < 1.0) return 0.0 / 64.0;
    if (idx < 2.0) return 48.0 / 64.0;
    if (idx < 3.0) return 12.0 / 64.0;
    if (idx < 4.0) return 60.0 / 64.0;
    if (idx < 5.0) return 3.0 / 64.0;
    if (idx < 6.0) return 51.0 / 64.0;
    if (idx < 7.0) return 15.0 / 64.0;
    if (idx < 8.0) return 63.0 / 64.0;
    // Row 1
    if (idx < 9.0) return 32.0 / 64.0;
    if (idx < 10.0) return 16.0 / 64.0;
    if (idx < 11.0) return 44.0 / 64.0;
    if (idx < 12.0) return 28.0 / 64.0;
    if (idx < 13.0) return 35.0 / 64.0;
    if (idx < 14.0) return 19.0 / 64.0;
    if (idx < 15.0) return 47.0 / 64.0;
    if (idx < 16.0) return 31.0 / 64.0;
    // Row 2
    if (idx < 17.0) return 8.0 / 64.0;
    if (idx < 18.0) return 56.0 / 64.0;
    if (idx < 19.0) return 4.0 / 64.0;
    if (idx < 20.0) return 52.0 / 64.0;
    if (idx < 21.0) return 11.0 / 64.0;
    if (idx < 22.0) return 59.0 / 64.0;
    if (idx < 23.0) return 7.0 / 64.0;
    if (idx < 24.0) return 55.0 / 64.0;
    // Row 3
    if (idx < 25.0) return 40.0 / 64.0;
    if (idx < 26.0) return 24.0 / 64.0;
    if (idx < 27.0) return 36.0 / 64.0;
    if (idx < 28.0) return 20.0 / 64.0;
    if (idx < 29.0) return 43.0 / 64.0;
    if (idx < 30.0) return 27.0 / 64.0;
    if (idx < 31.0) return 39.0 / 64.0;
    if (idx < 32.0) return 23.0 / 64.0;
    // Row 4
    if (idx < 33.0) return 2.0 / 64.0;
    if (idx < 34.0) return 50.0 / 64.0;
    if (idx < 35.0) return 14.0 / 64.0;
    if (idx < 36.0) return 62.0 / 64.0;
    if (idx < 37.0) return 1.0 / 64.0;
    if (idx < 38.0) return 49.0 / 64.0;
    if (idx < 39.0) return 13.0 / 64.0;
    if (idx < 40.0) return 61.0 / 64.0;
    // Row 5
    if (idx < 41.0) return 34.0 / 64.0;
    if (idx < 42.0) return 18.0 / 64.0;
    if (idx < 43.0) return 46.0 / 64.0;
    if (idx < 44.0) return 30.0 / 64.0;
    if (idx < 45.0) return 33.0 / 64.0;
    if (idx < 46.0) return 17.0 / 64.0;
    if (idx < 47.0) return 45.0 / 64.0;
    if (idx < 48.0) return 29.0 / 64.0;
    // Row 6
    if (idx < 49.0) return 10.0 / 64.0;
    if (idx < 50.0) return 58.0 / 64.0;
    if (idx < 51.0) return 6.0 / 64.0;
    if (idx < 52.0) return 54.0 / 64.0;
    if (idx < 53.0) return 9.0 / 64.0;
    if (idx < 54.0) return 57.0 / 64.0;
    if (idx < 55.0) return 5.0 / 64.0;
    if (idx < 56.0) return 53.0 / 64.0;
    // Row 7
    if (idx < 57.0) return 42.0 / 64.0;
    if (idx < 58.0) return 26.0 / 64.0;
    if (idx < 59.0) return 38.0 / 64.0;
    if (idx < 60.0) return 22.0 / 64.0;
    if (idx < 61.0) return 41.0 / 64.0;
    if (idx < 62.0) return 25.0 / 64.0;
    if (idx < 63.0) return 37.0 / 64.0;
    return 21.0 / 64.0;
}

void main() {
    vec4 color = texture2D(tDiffuse, vUv);
    float lum = dot(color.rgb, vec3(0.299, 0.587, 0.114));

    vec2 pixelPos = vUv * vec2(1920.0, 1080.0); // approximate resolution
    float threshold = bayer8(pixelPos);

    float dithered = step(threshold, lum + uDitherIntensity * 0.1);
    vec3 result = mix(color.rgb, vec3(dithered) * color.rgb * 1.2, uDitherIntensity * 0.4);

    gl_FragColor = vec4(result, 1.0);
}
