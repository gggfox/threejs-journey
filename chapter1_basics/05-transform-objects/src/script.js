import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const group = new THREE.Group();
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(2,1,1),
    new THREE.MeshBasicMaterial({ color: 0xff0000})
)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,2,1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00})
)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,2),
    new THREE.MeshBasicMaterial({ color: 0x0000ff})
)
cube2.position.x = -2
cube3. position.x = 2
group.add(cube1)
group.add(cube2)
group.add(cube3)
group.position.y = -1
/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
mesh.position.x = 0.7
mesh.position.y = -1.6
mesh.position.z = 1
//mesh.position.set(0.7,-0.6,1)
scene.add(mesh)
mesh.scale.set(2,1,0.5)

mesh.rotation.reorder('YXZ') // prevent gimbal lock
mesh.rotation.y = 1

const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)
/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(1,1,3)
scene.add(camera)

camera.lookAt(mesh.position)

// Position
console.log(mesh.position.length())
console.log(mesh.position.distanceTo(camera.position))
console.log(mesh.position.normalize())
console.log(mesh.position.length())

// 

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)