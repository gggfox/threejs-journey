import { useMemo } from "react";
import { InstancedRigidBodies } from "@react-three/rapier";

export default function Balls() {
  const count = 30;

  const instances = useMemo(() => {
    const instances = [];
    for (let i = 0; i < count; i++) {
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
    <InstancedRigidBodies instances={instances} colliders="ball">
      <instancedMesh
        castShadow
        receiveShadow
        dispose={null}
        args={[null, null, count]}
      >
        <sphereGeometry />
        <meshStandardMaterial color="green" />
      </instancedMesh>
    </InstancedRigidBodies>
  );
}
