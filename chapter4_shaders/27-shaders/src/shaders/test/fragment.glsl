precision mediump float; // float precision highp, mdiump, lowp

// Random Shader Texture
varying float vRandom;
varying float vTime;

// COLOR
uniform vec3 uColor;

// FLAG
uniform sampler2D uTexture;
varying vec2 vUv;
varying float vElevation;


void main() {
    gl_FragColor = vec4(cos(vTime * vRandom), vRandom, sin(vTime), 0.5);

    //COLOR
    //gl_FragColor = vec4(uColor, 1.0);

    // FLAG
    // vec4 textureColor = texture2D(uTexture, vUv);
    // textureColor.rgb *= vElevation * 2.0 + 0.5;
    // gl_FragColor = textureColor;
}