import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect } from "react";
import { useControls } from "leva";

export default function Fox(props) {
  const path = "./Fox/glTF/Fox.gltf";
  const fox = useGLTF(path);
  const animations = useAnimations(fox.animations, fox.scene);

  const { animationName } = useControls("sphere", {
    animationName: { options: animations.names },
  });

  // animation are running at the same time
  useEffect(() => {
    const action = animations.actions[animationName];
    action.reset().fadeIn(0.5).play();
    //action.play();
    return () => {
      action.fadeOut(0.5);
      console.log("dispose");
    };
  }, [animationName]);

  return (
    <>
      <primitive object={fox.scene} {...props} />
    </>
  );
}
