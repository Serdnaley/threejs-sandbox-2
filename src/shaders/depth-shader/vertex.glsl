uniform float focusFarFadeOutLength;
uniform float focusNearFadeOutLength;
uniform float focusFar;
uniform float focusNear;
varying float vAlpha;

#define PI 3.14159265359

void main () {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

    // Calculate alpha by focus distance to focus area
    float dCamera = distance(mvPosition.xyz, cameraPosition);
    vAlpha =
        smoothstep(focusNear, focusNear + focusNearFadeOutLength, dCamera)
        - smoothstep(focusFar - focusFarFadeOutLength, focusFar, dCamera);

    gl_PointSize = 10.0 + (1.0 - vAlpha) * 30.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
