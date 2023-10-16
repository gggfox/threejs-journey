import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import * as CANNON from 'cannon-es'

THREE.ColorManagement.enabled = false

/**
 * Debug
 */
const gui = new dat.GUI()
const debugObject = {
    createSphere: () => createSphere(
        Math.random() * 0.5, 
        {
            x: Math.random() - 0.5, 
            y: 3,
            z: Math.random() - 0.5,
        }
    ),
    createBox: () => createBox(
        Math.random() * 0.7,
        {
            x: Math.random() - 0.5, 
            y: 3,
            z: Math.random() - 0.5,
        }
    ),
    reset: () => {
        for (const {body, mesh} of objectToUpdate) {
            body.removeEventListener('collide', playHitSound)
            world.removeBody(body)

            scene.remove(mesh)
        }
        objectToUpdate = []
    }
}
gui.add(debugObject, 'createSphere')
gui.add(debugObject, 'createBox')
gui.add(debugObject, 'reset')

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Sounds
 */

const hitSound = new Audio('/sounds/hit.mp3')
function playHitSound(collision) {
    const impactStrength = collision.contact.getImpactVelocityAlongNormal()
    console.log(impactStrength)
    if (impactStrength > 1.5) {
        hitSound.volume = impactStrength / 15
    hitSound.currentTime = 0 // stop sound if sound is playing
    hitSound.play()
    }
}
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.png',
    '/textures/environmentMaps/0/nx.png',
    '/textures/environmentMaps/0/py.png',
    '/textures/environmentMaps/0/ny.png',
    '/textures/environmentMaps/0/pz.png',
    '/textures/environmentMaps/0/nz.png'
])

/**
 * Physics
 */
// World
const world = new CANNON.World()
world.broadphase = new CANNON.SAPBroadphase(world)
world.allowSleep = true
world.gravity.set(0,-9.8,0)


// Material
// const concreteMaterial = new CANNON.Material('concrete')
// const plasticMaterial = new CANNON.Material('plastic')

const defaultMaterial = new CANNON.Material('default')

const concretePlasticContactMaterial = new CANNON.ContactMaterial(
    defaultMaterial,
    defaultMaterial, {
        friction: 0.1,
        restitution: 0.7,
    }
)
world.addContactMaterial(concretePlasticContactMaterial)

// Floor
const floorShape = new CANNON.Plane()
const floorBody = new CANNON.Body()
floorBody.mass = 0
floorBody.addShape(floorShape)
floorBody.quaternion.setFromAxisAngle(
    new CANNON.Vec3(-1, 0, 0), 
    Math.PI / 2
)
floorBody.material = defaultMaterial

world.addBody(floorBody)

/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: '#777777',
        metalness: 0.3,
        roughness: 0.4,
        envMap: environmentMapTexture,
        envMapIntensity: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

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
camera.position.set(- 3, 3, 3)
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
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Utils
 */

let objectToUpdate: {mesh: any, body:any}[] = []

const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)
const meshMaterial = new THREE.MeshStandardMaterial({
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture
})

function createSphere(radius, position) {
    // Three.js Mesh
    const mesh = new THREE.Mesh(sphereGeometry, meshMaterial)
    mesh.scale.set(radius, radius, radius)

    mesh.castShadow = true
    mesh.position.copy(position)
    scene.add(mesh)

    // CANNON.js 

    const shape = new CANNON.Sphere(radius)
    const body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(),
        shape,
        material: defaultMaterial
    })
    body.position.copy(position)
        body.addEventListener('collide', playHitSound)

    world.addBody(body)

    // Save in object to update
    objectToUpdate.push({mesh, body})
}

const boxGeometry = new THREE.BoxGeometry(1,1,1)
function createBox(scale, position) {
    const mesh = new THREE.Mesh(boxGeometry, meshMaterial)
    mesh.scale.set(scale,scale,scale)

    mesh.castShadow = true
    mesh.position.copy(position)
    scene.add(mesh)

    const shape = new CANNON.Box(new CANNON.Vec3(scale/2,scale/2,scale/2)) // cannon starts from center
    const body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(),
        shape,
        material: defaultMaterial
    })
    body.position.copy(position)
    body.addEventListener('collide', playHitSound)
    world.addBody(body)

    objectToUpdate.push({mesh, body})
}


/**
 * Animate
 */
const clock = new THREE.Clock()

let previousTime = 0
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Update controls
    controls.update()


    // Update physics world
    world.step(1 / 60, deltaTime, 3)

    for (const {mesh, body} of objectToUpdate) {
        mesh.position.copy(body.position)
        mesh.quaternion.copy(body.quaternion)
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()