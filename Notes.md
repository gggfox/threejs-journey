# Three.js Journey

## Chapter 1

### Basic scene

- scene
- camera
- objects
- light source

### Transformation

- scale
- position
- rotation
- gimbal lock

### Animation

- delta time ticks
- clock

### Camera

- different camera types
- ortographic camera
- prevent extreme values for z fighting
- custom controls

#### Built in controls

- Fly Contols
- First person controls
- -orbit controls


### Fullscreen and resizing

- handling 
- pixel ratios (more than 2-3 is unnesessary)
- fullscreen

### Geometries

- BoxGeometry
- PlaneGeometry
- CircleGeometry
- ConeGeometry
- CylinderGeometry
- RingGeometry
- TorusGeometry
- TorusKnotGeometry
- DodecahedronGeometry

- add more triangles

### Textures

#### Main Texture Types

- color (or albedo)
- alpha
  - visible and invisible
- height
- normal
  - details
- ambient occlusion
  - shadows
- metalness
  - reflexion
- roughness
  - light dissipation

use small textures for performance

#### Where to find textures

- poliigon.com
- 3dtextures.me
- arroway-textures.ch
[label](https://www.adobe.com/products/substance3d-designer.html)

### Materials

- Basic material parameters
- Normal material
- https://github.com/nidorx/matcaps
- https://hdri-haven.com/

### 3d text

lower curve segments to gain perfomrance

frusturn culling calculate rendering

compute bounding box (or sphere)



## Chapter 2

### 15. Lights

- ambient light (omnidirectional lightning; comes from everywhere)
- directional light (parallel rays)
- hemisphere light
- point light
- rect area light (only works with the mesh standard material)
- spot light

#### baking

bake light into the texture for performance gain, the issue is that the light can't be moved

### 16. Shadows

shadow map (cast shadow, recive shadow) + lights (point, directional, spot)

Different types of algorithms can be applied to shadow maps:

    THREE.BasicShadowMap: Very performant but lousy quality
    THREE.PCFShadowMap: Less performant but smoother edges
    THREE.PCFSoftShadowMap: Less performant but even softer edges
    THREE.VSMShadowMap: Less performant, more constraints, can have unexpected results

point light does 6 renders thats a lot
baking shaws can bring performance to the render
think about how much is the shadow going to move

### 17. Haunted House

- fog
### 18. Particles

### 19. Galaxy Generator

### 20. Scroll based animation

## Chapter 3

### Physiscs

#### 3D Libraries
- ammo
- cannon
- oimo

#### 2d libraries

- matter
- p2
- plank
- box2d

#### Forces

- applyForce
- applyImpulse
- applyLocalForce
- applyLocalImpulse

#### Broad face 
can affect performance
- NaiveBroadphase test each body
- GridBroadPhase
- SAPBroadphase (Sweep And Prune)

there migh be an issue with objects traveling too fast (im thinking bullets) going though other objects

### Imported models

#### Formats

- GLTF
made by the knronus group, its becoming a standard
choose format based on the needs, do you need to change textures? 

## Performance tips

if you're using `.NearestFilter`, set `.genereateMipmaps` to `false`

``` javascript
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false
```

lover curve segemnts on text

lights are performance intensive 
low cost light are hemisphere and amniebt
moderate cost lights are directional light and point
spotlight and rect area are high cost