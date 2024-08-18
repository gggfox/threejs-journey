import { OrbitControls } from "@react-three/drei";
import Lights from "./Lights.jsx";
import { Level, BlockAxe, BlockSpinner, BlockLimbo } from "./Level.jsx";
import { Physics } from "@react-three/rapier";
import Player from "./Player.jsx";
import useGame from "./store/useGame.js";

export default function Experience() {
  const blocksCount = useGame((state) => {
    return state.blocksCount;
  });
  const blockSeed = useGame((state) => {
    return state.blockSeed;
  });

  return (
    <>
      <OrbitControls makeDefault />
      <color args={["#bdedfc"]} attach="background" />
      <Physics debug>
        <Lights />
        <Level
          types={[BlockSpinner, BlockAxe, BlockLimbo]}
          count={blocksCount}
          seed={blockSeed}
        />
        <Player />
      </Physics>
    </>
  );
}
