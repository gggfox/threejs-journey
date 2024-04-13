# Three.js Journey

## Setup
Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

``` bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```
## Monitoring
1. monitor fps
2. disable fps limit
3. monitor draw calls, spector.js can help
4. render informatics
## General
5. good javascript code, specially tick function
6. dispose of things
## Lights
7. avoid light, use cheap lights
  - ambientlight
  - directionallight
  - HemisphereLight
8. dont remove and/or add lights
## Shadows
9. avoid shadows
10. optimize at shadow map
11. only recive and cast shadow attributes when necessary
  1.  deactivate shadow auto update
## Textures
13. resize textures
    1.  use small textures
14. keep power of 2 resolutions (width, height)
15. use right format (jpeg, png)
## Geometries
16. use buffer geometries (all geometries are buffer geometries now in three.js)
17. do not update vertices
18. mutualize geomtetries
19. merge geometries, reduce draw calls
## Materials
20. mutualize materials
21. use cheap materials
## Meshes
22. use instanced mesh
## Models
23. low poly
24. draco compression
25. gzip
## Cameras
26. field of view
27. near and far
28. ???
## Renderer
29.  pixel ratio
30.  power preferences
31.  antialias
## Postprocessing
32. limit passes
## Shaders
33. specify precision
34. keep code simple, avoid ifs
35. use textures
36. use defines
37. do the calculation in the vertex shader