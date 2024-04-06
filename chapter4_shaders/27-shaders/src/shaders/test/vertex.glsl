// uniform mat4 projectionMatrix; // transform the coordinates based on clipspace
// uniform mat4 viewMatrix; // apply transformaations based on camea (position, rotation, field of view, near, far)
// uniform mat4 modelMatrix; // will apply transformations based on mesh position, rotation, scale
uniform vec2 uFrequency;
uniform float uTime;

// uniform mat4 modelViewMatrix; // joins matrixes

// attribute vec3 position;
// attribute vec2 uv;
attribute float aRandom;

varying float vRandom;
varying float vTime;
varying vec2 vUv;
varying float vElevation;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
   // modelPosition.z += sin(modelPosition.x * uFrequency.x) * 0.1;
    //modelPosition.z += sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
    //modelPosition.z += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;
    

    float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
    elevation +=  sin(modelPosition.y * uFrequency.y - uTime) * 0.1;

    modelPosition.z += aRandom * 0.2;
    modelPosition.z += elevation;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    vRandom = aRandom;
    vTime = uTime;
    vUv = uv;
    vElevation = elevation;
}

// clipspace
// x,y,z
// homogenous coordinates

// uniform same for every vertex
// need to use mat4 for vec4