import { useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useHelper,
  BakeShadows,
  SoftShadows,
  AccumulativeShadows,
  RandomizedLight,
  ContactShadows,
  Sky,
  Environment,
  Lightformer,
} from "@react-three/drei";
import { useRef, useState } from "react";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { useControls, button } from "leva";

export default function Experience() {
  const directionalLight = useRef();
  useHelper(directionalLight, THREE.DirectionalLightHelper, 1);
  const cube = useRef();
  const time = useRef();

  const contactShadow = useControls("contact Shadow", {
    color: "#ff0000",
    opacity: {
      value: 1.0,
      step: 0.01,
      min: 0,
      max: 1,
    },
    blur: {
      value: 1.0,
      step: 0.01,
      min: 0,
      max: 10,
    },
  });

  const { sunPosition } = useControls("sky", {
    sunPosition: {
      value: [1, 2, 3],
    },
  });

  const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } =
    useControls("environment map", {
      envMapIntensity: {
        value: 1,
        min: 0,
        max: 12,
      },
      envMapHeight: {
        value: 7,
        min: 0,
        max: 100,
      },
      envMapRadius: {
        value: 28,
        min: 10,
        max: 1000,
      },
      envMapScale: {
        value: 100,
        min: 10,
        max: 1000,
      },
    });

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
    const time = state.clock.elapsedTime;
    cube.current.position.x = 2 + Math.sin(time);
  });

  const streetEnvMap = [
    "./environmentMaps/2/px.jpg",
    "./environmentMaps/2/nx.jpg",
    "./environmentMaps/2/py.jpg",
    "./environmentMaps/2/ny.jpg",
    "./environmentMaps/2/pz.jpg",
    "./environmentMaps/2/nz.jpg",
  ];
  return (
    <>
      {/* <Environment
        background
        // files="./environmentMaps/the_sky_is_on_fire_2k.hdr"
        preset="sunset"
        ground={{
          height: envMapHeight,
          radius: envMapRadius,
          scale: envMapScale,
        }}
        //resolution={32}
      >
        <color args={["#000000"]} attach="background" />
        <Lightformer
          position={-5}
          scale={10}
          color="red"
          intensity={100}
          form="ring"
        />
        <mesh position-z={-5} scale={10}>
          <planeGeometry />
          <meshBasicMaterial color="red" />
        </mesh>
      </Environment> */}

      {/* <BakeShadows /> */}
      {/* <SoftShadows size={25} samples={10} focus={0} /> */}

      <color args={["ivory"]} attach="background" />

      <Perf position="top-left" />

      <OrbitControls makeDefault />

      {/* <AccumulativeShadows
        position={[0, -0.99, 0]}
        scale={10}
        color="#316d39"
        opacity={0.8}
        frames={100}
        temporal
      >
        <RandomizedLight
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={3}
          position={[1, 2, 3]}
          bias={0.001}
        />
      </AccumulativeShadows> */}

      <ContactShadows
        position={[0, 0, 0]}
        scale={10}
        resolution={512}
        far={5}
        color={contactShadow.color}
        opacity={contactShadow.opacity}
        blur={contactShadow.blur}
        frames={1}
      />

      {/* <directionalLight
        ref={directionalLight}
        position={sunPosition}
        intensity={4.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={2}
        shadow-camera-right={4}
        shadow-camera-bottom={-2}
        shadow-camera-left={-4}
      /> */}
      {/* <ambientLight intensity={1.5} /> */}

      {/* <Sky sunPosition={sunPosition} /> */}

      <mesh position-x={-2} castShadow position-y={1}>
        <sphereGeometry />
        <meshStandardMaterial
          color="orange"
          envMapIntensity={envMapIntensity}
        />
      </mesh>

      <mesh ref={cube} position-x={2} scale={1.5} castShadow position-y={1}>
        <boxGeometry />
        <meshStandardMaterial
          color="mediumpurple"
          envMapIntensity={envMapIntensity}
        />
      </mesh>

      {/* <mesh rotation-x={-Math.PI * 0.5} scale={10} position-y={0}>
        <planeGeometry />
        <meshStandardMaterial
          color="greenyellow"
          envMapIntensity={envMapIntensity}
        />
      </mesh> */}
    </>
  );
}
