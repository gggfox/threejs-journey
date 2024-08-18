import React, { useLayoutEffect, useRef, useState } from 'react'
import { extend } from '@react-three/fiber'
import './style.css'
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry'
import { Euler, Vector3 } from 'three'

extend({
    DecalGeometry
  })

  function setProp(value, targetProp) {
    if (Array.isArray(value)) {
      if (targetProp.fromArray) targetProp.fromArray(value)
      else targetProp.set(...value)
    } else {
      targetProp.copy(value)
    }
  }


export function Decal({ debug, mesh, children, position, rotation, scale }) {
    const $ref = useRef()
  
    const [[p, r, s]] = useState(() => {
      return [new Vector3(), new Euler(), new Vector3(1, 1, 1)]
    })
  
    useLayoutEffect(() => {
      const parent = mesh.current || $ref.current.parent
      if (parent) {
        setProp(position, p)
        setProp(rotation, r)
        setProp(scale, s)
  
        $ref.current.geometry = new DecalGeometry(parent, p, r, s)
      }
    }, [mesh, position, scale, rotation, p, r, s])
  
    return (
      <mesh ref={$ref}>
        {children || (
          <meshNormalMaterial
            transparent={true}
            depthTest={true}
            depthWrite={false}
            polygonOffset={true}
            polygonOffsetFactor={-4}
          />
        )}
  
        {debug && (
          <mesh position={position} rotation={rotation} scale={scale}>
            <boxGeometry />
            <meshNormalMaterial wireframe />
            <axesHelper />
          </mesh>
        )}
      </mesh>
    )
  }