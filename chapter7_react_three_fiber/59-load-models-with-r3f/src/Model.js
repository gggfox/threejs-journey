import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import {useGLTF, Clone} from '@react-three/drei'

export default function Model(props) {
    const {path, ...primitiveProps} = props
    // const model = useLoader(
    //     GLTFLoader,
    //     path,
    //     (loader) => {
    //       const dracoLoader = new DRACOLoader();
    //       dracoLoader.setDecoderPath("./draco/");
    //       loader.setDRACOLoader(dracoLoader);
    //     }
    //   );
    const model = useGLTF(path)
    return <>
        <Clone object={model.scene} {...primitiveProps} position-x={-4}/>
        <Clone object={model.scene} {...primitiveProps} position-x={0}/>
        <Clone object={model.scene} {...primitiveProps} position-x={4}/>

    </>

    //return <primitive object={model.scene} {...primitiveProps}/>
}

//useGLTF.preload(path)