import { useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, meshBounds } from "@react-three/drei";
import { useRef } from "react";

export default function Experience() {
  const cube = useRef();
  const sphere = useRef();
  const model = useGLTF("./hamburger.glb");

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  function eventHandler(event, ref) {
    console.log(event);
    ref.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`);
    event.stopPropagation();
  }
  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <mesh
        ref={sphere}
        position-x={-2}
        onClick={(e) => eventHandler(e, sphere)}
        onPointerEnter={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          document.body.style.cursor = "default";
        }}
      >
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh
        ref={cube}
        position-x={2}
        scale={1.5}
        raycast={meshBounds}
        onClick={(e) => eventHandler(e, cube)}
        onPointerEnter={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          document.body.style.cursor = "default";
        }}
      >
        <boxGeometry />
        <meshStandardMaterial color={"mediumpurple"} />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      <primitive
        object={model.scene}
        scale={0.25}
        position-y={0.5}
        onClick={(event) => {
          console.log(event.object.name);
          event.stopPropagation();
        }}
      />
    </>
  );
}
