import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

THREE.ColorManagement.enabled = false

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('/textures/particles/2.png')
console.log(particleTexture)
/**
 * Particles
 */
// 
const particlesMaterials = new THREE.PointsMaterial({
    size: 0.1,
    sizeAttenuation: true,
})
//particlesMaterials.color = new THREE.Color(0x88ffff)
particlesMaterials.transparent = true
particlesMaterials.alphaMap = particleTexture
//particlesMaterials.alphaTest = 0.001
//particlesMaterials.depthTest = false
particlesMaterials.depthWrite = false
particlesMaterials.vertexColors = true

// aditive blending can impact performance
particlesMaterials.blending = THREE.AdditiveBlending 

const particlesGeometry = new THREE.BufferGeometry()
const count = 5000

const positions = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)

for (let i = 0; i < count * 3; i++) {
    colors[i] = (Math.random())
    positions[i] = (Math.random() - 0.5 ) * 10
}

particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
)

particlesGeometry.setAttribute(
    'color',
    new THREE.BufferAttribute(colors,3)
)
// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterials)
scene.add(particles)

const dotSphere = new THREE.SphereGeometry(1,32,32)
const cube = new THREE.Points(dotSphere, new THREE.MeshBasicMaterial())
scene.add(cube)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.outputColorSpace = THREE.LinearSRGBColorSpace
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    // particles.rotation.z = Math.PI * 0.15

    // particles.rotation.y = elapsedTime

    // Update controls

    // particles.rotation.x = elapsedTime / 8
    for (let i = 0; i < count; i++) {
        const i3 = i * 3
        const x = particlesGeometry.attributes.position.array[i3 + 0]
        particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x)
         
    }
    particlesGeometry.attributes.position.needsUpdate = true

    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()