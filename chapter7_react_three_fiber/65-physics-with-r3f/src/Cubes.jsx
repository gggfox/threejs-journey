import { useMemo } from "react";
import { InstancedRigidBodies } from "@react-three/rapier";
export default function Cubes() {
  const cubesCount = 300;
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
      });
    }
    return instances;
  }, []);

  return (
    <InstancedRigidBodies instances={instances}>
      <instancedMesh
        // onClick={(event) => cubeJump(event)}
        castShadow
        receiveShadow
        //ref={cubes}
        args={[null, null, cubesCount]}
      >
        <boxGeometry />
        <meshStandardMaterial color="tomato" />
      </instancedMesh>
    </InstancedRigidBodies>
  );
}
