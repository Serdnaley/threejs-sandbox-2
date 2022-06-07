varying vec4 vColor;
varying float vSize;

void main () {
    float d = 1.0 - distance(gl_PointCoord.xy, vec2(0.5, 0.5));
    float alpha = smoothstep(0.5, 1.0, d) * vColor.a;

    gl_FragColor = vec4(vColor.xyz, alpha);
}
