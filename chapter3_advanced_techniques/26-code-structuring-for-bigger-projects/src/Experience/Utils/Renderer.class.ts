import Experience from "../Experience";
import * as THREE from "three";
import Camera from "./Camera.class";

export default class Renderer {
  experience;
  canvas;
  sizes;
  scene;
  camera?: Camera;
  instance?: THREE.WebGLRenderer;
  constructor() {
    this.experience = new Experience();
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;

    this.setInstance();
  }

  setInstance() {
    if (!this.sizes) {
      return;
    }
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });

    this.instance.toneMapping = THREE.CineonToneMapping;
    this.instance.toneMappingExposure = 1.75;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.setClearColor("#211d20");
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  resize() {
    if (!this.sizes || !this.instance) {
      return;
    }
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    if (
      !this.scene ||
      !this.instance ||
      !this.camera ||
      !this.camera.instance
    ) {
      return;
    }
    this.instance.render(this.scene, this.camera.instance);
  }
}
