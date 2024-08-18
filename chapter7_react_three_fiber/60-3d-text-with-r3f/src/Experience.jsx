import {
  OrbitControls,
  Text3D,
  Center,
  useMatcapTexture,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const material = new THREE.MeshMatcapMaterial();

export default function Experience() {
  //   const [torusGeometry, setTorusGeometry] = useState();
  //   const [material, setMaterial] = useState();
  const donutGroup = useRef([]);

  const [matcapTexture] = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 256);
  console.log(matcapTexture);

  useEffect(() => {
    matcapTexture.colorSpace = THREE.SRGBColorSpace;
    matcapTexture.needsUpdate = true;

    material.matcap = matcapTexture;
    material.needsUpdate = true;
  }, []);

  useFrame((state, delta) => {
    donutGroup.current.forEach((child) => {
      const sin = Math.sin(state.clock.elapsedTime);
      console.log(sin);
      child.rotation.y += delta * 0.2;
    });
  });

  return (
    <>
      <Perf position="top-left" />
      {/* <torusGeometry ref={setTorusGeometry} />
      <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture} /> */}

      <OrbitControls makeDefault />
      <Center>
        <Text3D
          font="./fonts/helvetiker_regular.typeface.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          material={material}
        >
          HELLO R3F
          {/* <meshMatcapMaterial matcap={matcapTexture} /> */}
        </Text3D>
      </Center>
      {/* <group ref={donutGroup}> */}
      {[...Array(100)].map((_, index) => {
        return (
          <mesh
            key={index}
            ref={(donut) => {
              donutGroup.current[index] = donut;
            }}
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
            ]}
            scale={0.2 + Math.random() * 0.2}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
            geometry={torusGeometry}
            material={material}
          >
            {/* <torusGeometry /> */}
            {/* <meshMatcapMaterial matcap={matcapTexture} /> */}
          </mesh>
        );
      })}
      {/* </group> */}
    </>
  );
}
