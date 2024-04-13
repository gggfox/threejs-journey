main components of webGL
a shader is a program written in GLSL
sent ot the GPU

we send alot of data to the shader

2 types of shaders vertex and fragment

Data -> Vertex -> Positionsnin

attributes -> values that are different between each vertex
uniforms -> values that are the same for each vertex

one the vertices are places by the vertex shader the GPUI knows which parts of our gerometry are visible

fragment shadder colors every visible part of the geometry


attributes cant be sent to fragment shadder

we send varying data from vertex shader to fragment shader

threejs materials are limited
shaders can be simple and performant
we can do coustom post-processing

# animated galax
update three.js default materials to use your own shaders

# modified material
update three.js default materials to use your own shaders