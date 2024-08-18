import React, { useRef, useState } from 'react'
import './style.css'
import { useTexture } from '@react-three/drei'
import { Vector3 } from 'three'
import { Sampler } from './Sampler'
import { LoopOverInstancedBufferAttribute } from './LoopOverInstancedBufferAttribute'
import { Decal } from './Decal'

export default function Thing() {
    const ref = useRef()
  
    const map = useTexture('./hp.jpeg')
    const map2 = useTexture('./hp2.jpeg')
  
    const [bufferAttribute, setBufferAttribute] = useState()
  
    return (
      <>
        <mesh ref={ref}>
          <sphereGeometry args={[3, 32, 32]} />
          <meshBasicMaterial color="#222277" />
        </mesh>
  
        <Sampler
          mesh={ref}
          transform={({ dummy, position, normal }) => {
            const p = new Vector3()
            p.copy(position)
            dummy.position.copy(position)
            dummy.lookAt(p.add(normal))
          }}
          count={10}
          setBufferAttribute={setBufferAttribute}
        />
  
        <LoopOverInstancedBufferAttribute buffer={bufferAttribute}>
          {({ ...props }) => (
            <Decal debug mesh={ref} {...props}>
              <meshBasicMaterial
                color="#fff"
                toneMapped={false}
                transparent
                depthTest={false}
                alphaMap={Math.random() > 0.5 ? map : map2}
                alphaTest={0}
                polygonOffset={true}
                polygonOffsetFactor={-10}
              />
            </Decal>
          )}
        </LoopOverInstancedBufferAttribute>
      </>
    )
  }