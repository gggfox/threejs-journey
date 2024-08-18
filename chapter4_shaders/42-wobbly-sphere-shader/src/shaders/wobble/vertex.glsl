uniform float uTime;
uniform float uPositionFrequency;
uniform float uTimeFrequency;
uniform float uStrength;
uniform float uWarpPositionFrequency;
uniform float uWarpTimeFrequency;
uniform float uWarpStrength;

varying vec2 vUv;
varying float vWobble;

attribute vec4 tangent;

#include ../includes/simplexNoise4d.glsl

float getWobble(vec3 position) {
    vec3 wrapedPosition = position;
    wrapedPosition += simplexNoise4d(vec4(
        position * uWarpPositionFrequency, 
        uTime * uWarpTimeFrequency
    )) * uWarpStrength;

    float wobble = simplexNoise4d(vec4(
        wrapedPosition * uPositionFrequency,
        uTime * uTimeFrequency
    )) * uStrength;
    return wobble;
}

void main() {
    vec3 biTangent = cross(normal, tangent.xyz);

    // Neighbours positions
    float shift = 0.01;
    vec3 positionA = csm_Position + tangent.xyz * shift;
    vec3 positionB = csm_Position + biTangent.xyz * shift;

    // Wobble
    float wobble = getWobble(csm_Position);
    csm_Position += wobble * normal;
    positionA += getWobble(positionA) * normal;
    positionB += getWobble(positionB) * normal;

    // Compute normal
    vec3 toA = normalize(positionA - csm_Position);
    vec3 toB = normalize(positionB - csm_Position);
    csm_Normal = cross(toA, toB);

    //csm_Position.x += sin(csm_Position.z * 3.0) * 0.5;
    vUv = uv;
    vWobble = wobble / uStrength;
}