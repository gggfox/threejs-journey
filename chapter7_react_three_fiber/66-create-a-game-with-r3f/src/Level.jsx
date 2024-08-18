import {
  CylinderCollider,
  RigidBody,
  CuboidCollider,
} from "@react-three/rapier";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef, useState, useMemo } from "react";
import { useGLTF, Float, Text } from "@react-three/drei";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floor1Material = new THREE.MeshStandardMaterial({ color: "limegreen" });
const floor2Material = new THREE.MeshStandardMaterial({ color: "greenyellow" });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: "orangered" });
const wallMaterial = new THREE.MeshStandardMaterial({ color: "slategray" });

function Spinner({ position = [0, 0, 0] }) {
  const obstacle = useRef();
  const [speed] = useState(
    () => Math.random() + 0.2 * (Math.random() < 0.5 ? 1 : -1)
  );
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    const eulerRotation = new THREE.Euler(0, time * speed, 0);
    const quaternionRotation = new THREE.Quaternion();
    quaternionRotation.setFromEuler(eulerRotation);
    obstacle.current.setNextKinematicRotation(quaternionRotation);
    obstacle.current.setNextKinematicTranslation({
      x: position[0],
      y: position[1] + 0.2,
      z: position[2],
    });
  });
  return (
    <RigidBody
      type="kinematicPosition"
      ref={obstacle}
      restitution={0.2}
      friction={0}
    >
      <mesh
        geometry={boxGeometry}
        material={obstacleMaterial}
        scale={[3.5, 0.3, 0.3]}
        receiveShadow
        castShadow
      />
    </RigidBody>
  );
}

function BlockFloor() {
  return (
    <RigidBody type="fixed">
      <mesh
        position={[0, -0.1, 0]}
        receiveShadow
        geometry={boxGeometry}
        material={floor2Material}
        scale={[4, 0.2, 4]}
      />
    </RigidBody>
  );
}

export function BlockSpinner({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <Spinner position={position} />
      <BlockFloor />
    </group>
  );
}

function Limbo({ position = [0, 0, 0] }) {
  const obstacle = useRef();
  const [timeOffset] = useState(() => Math.random() + 0.2 * (Math.PI * 2));
  useFrame((state, delta) => {
    if (!obstacle.current) return;
    const time = state.clock.getElapsedTime();
    const angle = time * 2.5;

    const x = position[0];
    const z = position[2];
    const y = Math.sin(angle + timeOffset) + 1;

    obstacle.current.setNextKinematicTranslation({ x, y, z });
  });
  return (
    <RigidBody
      type="kinematicPosition"
      ref={obstacle}
      restitution={0.2}
      friction={0}
      position={position}
    >
      <mesh
        geometry={boxGeometry}
        material={obstacleMaterial}
        scale={[3.5, 0.3, 0.3]}
        position={[0, 0.3, 0]}
        receiveShadow
        castShadow
      />
    </RigidBody>
  );
}

export function BlockLimbo({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <Limbo position={position} />
      <BlockFloor />
    </group>
  );
}

function Axe({ position = [0, 0, 0] }) {
  const obstacle = useRef();
  const [timeOffset] = useState(() => Math.random() + 0.2 * (Math.PI * 2));
  useFrame((state, delta) => {
    if (!obstacle.current) return;
    const time = state.clock.getElapsedTime();
    const angle = time * 2.5;

    const translation = {
      x: Math.sin(angle + timeOffset),
      y: position[1] + 0.5,
      z: position[2],
    };

    obstacle.current.setNextKinematicTranslation(translation);
  });
  return (
    <RigidBody
      type="kinematicPosition"
      ref={obstacle}
      restitution={0.2}
      friction={0}
      position={position}
    >
      <mesh
        geometry={boxGeometry}
        material={obstacleMaterial}
        scale={[1.5, 1.5, 0.3]}
        position={[0, 0.3, 0]}
        receiveShadow
        castShadow
      />
    </RigidBody>
  );
}

export function BlockAxe({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <Axe position={position} />
      <BlockFloor />
    </group>
  );
}

function BlockStart({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <Float floatIntensity={0.25} rotationIntensity={0.25}>
        <Text
          scale={0.5}
          font="/bebas-neue-v9-latin-regular.woff"
          maxWidth={0.25}
          lineHeight={0.75}
          textAlign="right"
          position={[0.75, 0.65, 0]}
          rotation-y={-0.25}
        >
          Marble Race
          <meshBasicMaterial toneMapped={false} />
        </Text>
      </Float>
      <RigidBody type="fixed">
        <mesh
          position={[0, -0.1, 0]}
          receiveShadow
          geometry={boxGeometry}
          material={floor1Material}
          scale={[4, 0.2, 4]}
        />
      </RigidBody>
    </group>
  );
}

function BlockEnd({ position = [0, 0, 0] }) {
  const hamburger = useGLTF("./hamburger.glb");
  hamburger.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });
  return (
    <group position={position}>
      <Text
        scale={0.5}
        font="/bebas-neue-v9-latin-regular.woff"
        maxWidth={1.25}
        lineHeight={0.75}
        textAlign="right"
        position={[0, 2.25, 2]}
        rotation-y={-0.25}
      >
        Finish
        <meshBasicMaterial toneMapped={false} />
      </Text>
      <RigidBody type="fixed">
        <mesh
          position={[0, 0, 0]}
          receiveShadow
          geometry={boxGeometry}
          material={floor1Material}
          scale={[4, 0.2, 4]}
        />
      </RigidBody>
      <RigidBody position={[0, 1, 0]} friction={0} colliders="hull">
        {/* <CylinderCollider args={[0.5, 0.9]} /> */}
        <primitive object={hamburger.scene} scale={0.2} />
      </RigidBody>
    </group>
  );
}

function Bounds({ length = 1 }) {
  return (
    <RigidBody type="fixed" restitution={0.2} friction={0}>
      <mesh
        position={[2.15, 0.75, -(length * 2) + 2]}
        geometry={boxGeometry}
        material={wallMaterial}
        scale={[0.3, 1.5, 4 * length]}
        castShadow
      />
      <mesh
        position={[-2.15, 0.75, -(length * 2) + 2]}
        geometry={boxGeometry}
        material={wallMaterial}
        scale={[0.3, 1.5, 4 * length]}
        receiveShadow
      />
      <mesh
        position={[0, 0.75, -(length * 4) + 2]}
        geometry={boxGeometry}
        material={wallMaterial}
        scale={[4, 1.5, 0.3]}
        receiveShadow
      />
    </RigidBody>
  );
}

export function Level({
  count = 5,
  types = [BlockSpinner, BlockAxe, BlockLimbo],
  seed = 0,
}) {
  const blocks = useMemo(() => {
    const blocks = [];

    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      blocks.push(type);
    }

    return blocks;
  }, [count, types, seed]);
  return (
    <>
      <BlockStart />
      {blocks.map((Block, index) => {
        return <Block key={index} position={[0, 0, -(index + 1) * 4]} />;
      })}
      <BlockEnd position={[0, 0, -(count + 1) * 4]} />
      <Bounds length={count + 2} />
    </>
  );
}
