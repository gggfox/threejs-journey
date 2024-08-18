import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import Model from "./Model";
import { Suspense } from "react";
import Placeholder from "./Placeholder";
import Hamburger from "./Hamburger";
import Fox from "./Fox";

export default function Experience() {
  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={4.5}
        shadow-normalBias={0.04}
      />
      <ambientLight intensity={1.5} />

      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
      {/* <Suspense fallback={<Placeholder position-y={0.5} scale={[2, 3, 2]} />}>
        <Model
          path="./FlightHelmet/glTF/FlightHelmet.gltf"
          scale={5}
          position-y={-1}
        />
      </Suspense> */}
      {/* 
      <Suspense fallback={<Placeholder position-y={0.5} scale={[2, 3, 2]} />}>
        <Model
          path="./hamburger-draco.glb"
          scale={0.35}
          position={[5, -1, 0]}
        />
      </Suspense> */}
      <Hamburger scale={0.35} />
      <Fox scale={0.035} position={[-2.5, 0, 2.5]} rotation-y={0.3} />
    </>
  );
}