import Experience from "../Experience";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Sizes from "./Sizes.class";

export default class Camera {
  experience;
  sizes?: Sizes;
  scene;
  canvas;
  instance?: THREE.PerspectiveCamera;
  controls?: OrbitControls;

  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.setInstance();
    this.setOrbitControls();
  }

  setInstance() {
    if (!this.sizes) {
      return;
    }
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.instance.position.set(6, 4, 8);
    this.scene?.add(this.instance);
  }

  setOrbitControls() {
    if (!this.instance || !this.canvas) {
      return;
    }
    this.controls = new OrbitControls(
      this.instance,
      this.canvas as HTMLElement
    );
    this.controls.enableDamping = true; // makes animation smotther on drag and drop
  }

  resize() {
    if (this.instance && this.sizes) {
      this.instance.aspect = this.sizes.width / this.sizes.height;
      this.instance.updateProjectionMatrix();
    }
  }

  update() {
    this.controls?.update();
  }
}
