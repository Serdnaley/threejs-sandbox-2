uniform vec3 color;
uniform sampler2D pointTexture;
uniform sampler2D pointTextureAlpha;

varying float vAlpha;

void main () {
    vec4 tColor = texture2D(pointTexture, gl_PointCoord);

    tColor.a *= vAlpha;

    gl_FragColor = tColor;
}
