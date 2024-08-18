import { extend, useThree } from '@react-three/fiber'
import React from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

extend({ OrbitControls })

export default function Experience() {
    const {camera, gl } = useThree()
    return <>
        <orbitControls args={[camera, gl.domElement]}/>

<directionalLight position={[1,2,3]} intensity={4.5}/>
<ambientLight intensity={1.5}/>
<group >
<mesh scale={1} position={[-2,0,0]}>
        <sphereGeometry scale={1.5}/>
        <meshStandardMaterial color= 'orange'/>
    </mesh>

    <mesh  scale={1.5} position={[0,0,0]}>
        <boxGeometry scale={1.5}/>
        <meshStandardMaterial color= 'mediumpurple' />
    </mesh>
</group>


    <mesh scale={10} position-y={-1} rotation-x={ - Math.PI * 0.5 }>
        <planeGeometry/>
        <meshBasicMaterial color= 'greenyellow' />
    </mesh>


</>
    
}