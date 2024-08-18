import React from 'react'
import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience'
import {ACESFilmicToneMapping, SRGBColorSpace, LinearEncoding} from 'three'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
    //dpr={[1,2]}
    flat
    gl={
        {
            antialias: true,
            toneMapping: ACESFilmicToneMapping,
            outputColorSpace: SRGBColorSpace
        }
    }
        camera={{
            fov: 45, 
            near: 0.1, 
            far:200, 
            position: [3,2,6]
        }}
    >
        <Experience/>
    </Canvas>
)