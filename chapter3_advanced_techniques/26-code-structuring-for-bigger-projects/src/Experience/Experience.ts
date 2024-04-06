import Camera from "./Utils/Camera.class";
import Renderer from "./Utils/Renderer.class";
import Sizes from "./Utils/Sizes.class";
import Time from "./Utils/Time.class";
import * as THREE from "three";
import World from "./World/World.class";
import Resources from "./Utils/Resources.class";
import sources from "./sources";
import Debug from "./Utils/Debug.class";

declare global {
  interface Window {
    experience: Experience;
  }
}

let experienceSingleton: Experience | null = null;

export default class Experience {
  canvas: Element | undefined;
  sizes?: Sizes;
  time?: Time;
  scene?: THREE.Scene;
  camera?: Camera;
  renderer?: Renderer;
  world?: World;
  resources?: Resources;
  debug?: Debug;
  constructor(canvas?: Element) {
    window.experience = this;
    if (experienceSingleton) {
      return experienceSingleton;
    } else {
      experienceSingleton = this;
    }

    this.canvas = canvas;

    // setup
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();
    this.sizes.on("resize", () => this.resize());
    this.time.on("tick", () => this.update());
  }

  resize() {
    this.camera?.resize();
    this.renderer?.resize();
  }

  update() {
    this.camera?.update();
    this.renderer?.update();
    this.world.update();
  }

  destroy() {
    this.sizes?.off("resize");
    this.time?.off("tick");

    // Traverse the whole scene
    this.scene?.traverse((child) => {
      console.log(child);

      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        for (const key in child.material) {
          const value = child.material[key];
          if (value && typeof value.dispose === "function") {
            value.dispose();
          }
        }
      }
    });

    this.camera?.controls?.dispose();
    this.renderer?.instance?.dispose();

    if (this.debug.active) {
      this.debug?.ui?.destroy();
    }
  }
}
