import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import {
  ToneMapping,
  Vignette,
  EffectComposer,
  Glitch,
  Noise,
  Bloom,
  DepthOfField,
} from "@react-three/postprocessing";
import { BlendFunction, GlitchMode } from "postprocessing";
import Drunk from "./Drunk";
import { useRef } from "react";
import { useControls } from "leva";

// performance is more efficient than older postprocessing solution
export default function Experience() {
  const drunkRef = useRef();
  const { frequency, amplitude } = useControls("cube", {
    frequency: {
      value: 10,
      step: 0.1,
      min: 0,
      max: 20,
    },
    amplitude: {
      value: 0.2,
      step: 0.01,
      min: 0,
      max: 1,
    },
  });

  return (
    <>
      <color attach="background" args={["#ffffff"]} />

      <EffectComposer
        //disableNormalPass
        multisampling={0} // anti alias
      >
        {/* <Vignette
          offset={0.1}
          darkness={0.9}
          blendFunction={BlendFunction.NORMAL}
        /> */}
        {/* <Glitch
          delay={[0.5, 1]}
          duration={[0.1, 0.3]}
          strength={[0.2, 0.4]}
          mode={GlitchMode.SPORADIC}
        /> */}
        {/* <Noise premultiply blendFunction={BlendFunction.OVERLAY} /> */}
        {/* <Bloom luminanceThreshold={1.6} mipmapBlur intensity={0.9} /> */}
        {/* <DepthOfField
          focusDistance={0.025}
          focalLength={0.025}
          bokehScale={6}
        /> */}
        <Drunk
          ref={drunkRef}
          frequency={frequency}
          amplitude={amplitude}
          blendFunction={BlendFunction.DARKEN}
        />
        {/* <ToneMapping /> */}
      </EffectComposer>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshBasicMaterial
          //color={[1.5, 10, 4]}
          //toneMapped={false}
          color="orange"
        />
      </mesh>

      <mesh castShadow position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial
          color="mediumpurple"
          //emissive="mediumpurple"
          //emissiveIntensity={8}
          //toneMapped={false}
        />
      </mesh>

      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
