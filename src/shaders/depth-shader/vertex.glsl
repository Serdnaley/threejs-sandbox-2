uniform float focusFarFadeOutLength;
uniform float focusNearFadeOutLength;
uniform float focusFar;
uniform float focusNear;
uniform float minOpacity;
uniform float maxOpacity;

varying vec4 vColor;
varying float vSize;

#define PI 3.14159265359

float random (vec2 st, float seed) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * (43758.5453123 + seed));
}

void main () {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

    mvPosition.x += random(position.xy, position.z * 10000.0) * 20.0;
    mvPosition.y += random(position.xy, position.z * 10000.0) * 20.0;
    mvPosition.z += random(position.xy, position.z * 10000.0) * 20.0;

    // Calculate alpha by distance to focus area
    float dCamera = distance(mvPosition.xyz, cameraPosition);
    float vAlpha =
        smoothstep(focusNear, focusNear + focusNearFadeOutLength, dCamera)
        - smoothstep(focusFar - focusFarFadeOutLength, focusFar, dCamera);

    vec3 color1 = vec3(194, 240, 158) / 255.0;
    vec3 color2 = vec3(240, 184, 158) / 255.0;

    vColor = vec4(mix(color1, color2, position.x / 100.0), vAlpha / 1.5);

    float baseSize = 1.0 + smoothstep(focusFar, focusNear, dCamera) * 3.0;
    gl_PointSize = vSize = baseSize + (1.0 - vAlpha) * baseSize * 5.0;

    gl_Position = projectionMatrix * mvPosition;
}
