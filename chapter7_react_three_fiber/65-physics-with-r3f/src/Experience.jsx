import { OrbitControls, useGLTF } from "@react-three/drei";
import { Perf } from "r3f-perf";
import {
  Physics,
  RigidBody,
  CuboidCollider,
  CylinderCollider,
  InstancedRigidBodies,
} from "@react-three/rapier";
import { useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Cubes from "./Cubes";
import Models from "./Models";
export default function Experience() {
  const hamburger = useGLTF("./hamburger.glb");

  const [hitSound] = useState(() => new Audio("./hit.mp3"));
  const cube = useRef();
  const twister = useRef();
  //const cubes = useRef();

  function cubeJump(event) {
    console.log(event.object);
    const mass = cube.current.mass();
    cube.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 });
    cube.current.applyTorqueImpulse({ x: 0, y: 1, z: 0 });
  }

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const eulerRotation = new THREE.Euler(0, time * 3, 0);
    const quaternionRotation = new THREE.Quaternion();
    quaternionRotation.setFromEuler(eulerRotation);
    twister.current.setNextKinematicRotation(quaternionRotation);

    const angle = time * 0.5;
    const x = Math.cos(angle) * 2;
    const z = Math.sin(angle) * 2;

    twister.current.setNextKinematicTranslation({ x, y: -0.8, z });
  });

  function collisionEnter() {
    // hitSound.currentTime = 0;
    // hitSound.volume = Math.random();
    // hitSound.play();
  }

  //   useEffect(() => {
  //     for (let i = 0; i < cubesCount; i++) {
  //       const matrix = new THREE.Matrix4();
  //       matrix.compose(
  //         new THREE.Vector3(i * 2, 0, 0),
  //         new THREE.Quaternion(),
  //         new THREE.Vector3(1, 1, 1)
  //       );
  //       cubes.current.setMatrixAt(i, matrix);
  //     }
  //   }, []);

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />
      <Physics debug gravity={[0, -9, 0]}>
        <RigidBody type="dynamic" colliders="ball">
          <mesh castShadow position={[0, 2, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        <RigidBody
          ref={cube}
          type="dynamic"
          position={[2, 2, 0]}
          gravityScale={1}
          restitution={0.5}
          friction={0}
          colliders={false}
          onCollisionEnter={collisionEnter}
          onCollisionExit={() => {}}
          onSleep={() => {}}
          onWake={() => {}}
        >
          <CuboidCollider args={[0.5, 0.5, 0.5]} mass={5} />
          <mesh castShadow onClick={() => cubeJump()}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed" colliders="trimesh" restitution={0}>
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>

        <RigidBody
          ref={twister}
          position={[0, -0.8, 0]}
          friction={0}
          type="kinematicPosition"
        >
          <mesh castShadow scale={[0.4, 0.4, 3]}>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>

        <RigidBody position={[0, 1, 0]} friction={0} colliders={false}>
          <CylinderCollider args={[0.5, 0.9]} />
          <primitive object={hamburger.scene} scale={0.2} />
        </RigidBody>

        <RigidBody>
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.25]} />
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.25]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[5.25, 1, 0]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[-5.25, 1, 0]} />
        </RigidBody>

        {/* <Cubes /> */}
        <Models />

        {/* <RigidBody
          colliders={false}
          position={[0, 1, 0]}
          rotation-x={Math.PI * 0.5}
        >
          <CuboidCollider args={[1.5, 1.5, 0.5]} />
          <CuboidCollider args={[1, 1, 1]} />
          <mesh castShadow>
            
            <torusGeometry args={[1, 0.5, 16, 32]} />
            <meshStandardMaterial color="cyan" />
          </mesh>
        </RigidBody> */}
      </Physics>
    </>
  );
}
