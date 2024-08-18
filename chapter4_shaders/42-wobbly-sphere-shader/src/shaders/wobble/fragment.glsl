varying vec2 vUv;
varying float vWobble;

uniform vec3 uColorA;
uniform vec3 uColorB;

void main() {
    float mixStrength = smoothstep(-1.0, 1.0, vWobble);
    vec3 color = mix(uColorA, uColorB, mixStrength);
    csm_DiffuseColor.rgb = color;

    // Mirror step
    // csm_Metalness =step(0.25, vWobble);
    // csm_Roughness = 1.0 - csm_Metalness;

    //Shiny tip
    csm_Roughness = 1.0 - mixStrength;
    // csm_Metalness = step(0.0, sin(vUv.x * 100.0 + 0.5));
    // csm_Roughness = 1.0 - csm_Metalness;
    // csm_DiffuseColor.rgb = vec3(1.0,0.5,0.5);
}