import React, { Suspense } from 'react'
import { Canvas, extend } from '@react-three/fiber'
import './style.css'
import { OrbitControls } from '@react-three/drei'
import Thing from './Thing'

export default function Scene() {
  return (
    <Canvas>
      <Suspense>
        <Thing />
        <color args={['#888']} attach="background" />
      </Suspense>
      <OrbitControls />
    </Canvas>
  )
}
