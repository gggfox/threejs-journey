varying vec2 vUv;

#include ../includes/simplexNoise4d.glsl

void main() {
    // Wobble
    float wobble = simplexNoise4d(vec4(
        csm_Position,0.0
    ));

    csm_Position += wobble * normal;
    //csm_Position.x += sin(csm_Position.z * 3.0) * 0.5;
    vUv = uv;
}