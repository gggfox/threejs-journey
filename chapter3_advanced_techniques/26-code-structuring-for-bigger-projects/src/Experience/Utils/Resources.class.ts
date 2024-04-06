import * as THREE from "three";
import EventEmitter from "./EventEmitter.class";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Source, SourceType } from "../sources";

interface Loaders {
  gltfLoader?: GLTFLoader;
  textureLoader?: THREE.TextureLoader;
  cubeTextureLoader?: THREE.CubeTextureLoader;
}

type ResourceFileType = GLTF | THREE.Texture | THREE.CubeTexture;

export default class Resources extends EventEmitter {
  sources: Source[];
  items = new Map<string, ResourceFileType>();
  toLoad: number;
  loaded: number;
  loaders?: Loaders;
  constructor(sources: Source[]) {
    super();
    this.sources = sources;

    // Setup
    this.toLoad = this.sources.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {
      gltfLoader: new GLTFLoader(),
      textureLoader: new THREE.TextureLoader(),
      cubeTextureLoader: new THREE.CubeTextureLoader(),
    };
  }

  startLoading() {
    // Load each source

    for (const source of this.sources) {
      if (
        source.type === SourceType.Texture &&
        this.loaders?.textureLoader &&
        source.path.at(0)
      ) {
        this.loaders.textureLoader.load(source.path.at(0) ?? "", (file) => {
          this.sourceLoaded(source, file);
        });
      }

      if (
        source.type === SourceType.GLTF &&
        this.loaders?.gltfLoader &&
        source.path.at(0)
      ) {
        this.loaders.gltfLoader.load(source.path.at(0) ?? "", (file) => {
          this.sourceLoaded(source, file);
        });
      }

      if (source.type === SourceType.Cube && this.loaders?.cubeTextureLoader) {
        this.loaders.cubeTextureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      }
    }
  }

  sourceLoaded(source: Source, file: ResourceFileType) {
    this.items?.set(source.name, file);
    this.loaded++;
    if (this.loaded === this.toLoad) {
      console.log("Finished Loading Assets");
      this.trigger("ready", null);
    }
  }
}
