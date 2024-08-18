import { useMemo } from "react";
import {
  InstancedRigidBodies,
  RigidBody,
  CylinderCollider,
  BallCollider,
} from "@react-three/rapier";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Addition, Base } from "@react-three/csg";

export default function Models() {
  const cubesCount = 30;
  const hamburger = useGLTF("./hamburger.glb");
  console.log({ hamburger });
  const { nodes, materials } = hamburger;
  const instances = useMemo(() => {
    const instances = [];
    for (let i = 0; i < cubesCount; i++) {
      instances.push({
        key: "instance_" + i,
        position: [
          (Math.random() - 0.5) * 8,
          6 + i * 0.2,
          (Math.random() - 0.5) * 8,
        ],
        rotation: [Math.random(), Math.random(), Math.random()],
        colliders: false,
      });
    }
    return instances;
  }, []);

  return (
    <InstancedRigidBodies instances={instances}>
      <primitive object={hamburger.scene} />
      {/* <group dispose={null}>
        <instancedMesh
          castShadow
          receiveShadow
          dispose={null}
          args={[null, null, cubesCount]}
          scale={0.2}
        ></instancedMesh> */}
      {/* <mesh
        name="bottomBun"
        castShadow
        receiveShadow
        geometry={nodes.bottomBun.geometry}
        material={materials.BunMaterial}
      />
      <mesh
        name="meat"
        castShadow
        receiveShadow
        geometry={nodes.meat.geometry}
        material={materials.SteakMaterial}
        position={[0, 2.817, 0]}
      />
      <mesh
        name="cheese"
        castShadow
        receiveShadow
        geometry={nodes.cheese.geometry}
        material={materials.CheeseMaterial}
        position={[0, 3.04, 0]}
      />
      <mesh
        name="topBun"
        castShadow
        receiveShadow
        geometry={nodes.topBun.geometry}
        material={materials.BunMaterial}
        position={[0, 1.771, 0]}
      /> */}
      {/* </group> */}
      {/* <primitive object={hamburger.scene} scale={0.2} /> */}
      {/* <sphereGeometry />
        <meshStandardMaterial color="green" /> */}
    </InstancedRigidBodies>
  );
}
