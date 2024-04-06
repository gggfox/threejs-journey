import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import Experience from "../Experience";
import * as THREE from "three";

export default class Fox {
  experience;
  scene;
  resources;
  resource;
  model?: THREE.Group<THREE.Object3DEventMap>;
  animation: any;
  time;
  debug;
  debugFolder;
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    //Debug
    if (this.debug?.active) {
      this.debugFolder = this.debug.ui?.addFolder("fox");
    }

    // Setup
    this.resource = this.resources?.items.get("foxModel") as GLTF;

    this.setModel();
    this.setAnimation();
  }

  setModel() {
    if (!this.resource) {
      return;
    }
    this.model = this.resource.scene;
    this.model.scale.set(0.02, 0.02, 0.02);

    // Shadow
    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
    this.scene?.add(this.model);
  }

  setAnimation() {
    if (!this.model) return;
    this.animation = {};
    this.animation.mixer = new THREE.AnimationMixer(this.model);
    // this.animation.action = this.animation.mixer.clipAction(
    //   this.resource.animations.at(0)
    // );

    this.animation.actions = {
      idle: this.animation.mixer.clipAction(this.resource.animations.at(0)),
      walking: this.animation.mixer.clipAction(this.resource.animations.at(1)),
      running: this.animation.mixer.clipAction(this.resource.animations.at(2)),
    };

    this.animation.actions.current = this.animation.actions.idle;

    this.animation.actions.current.play();

    this.animation.play = (name: string) => {
      const newAction = this.animation.actions[name];
      const oldAction = this.animation.actions.current;

      newAction.reset();
      newAction.play();
      newAction.crossFadeFrom(oldAction, 1);

      this.animation.actions.current = newAction;
    };

    // Debug
    if (this.debug?.active) {
      const debugObject = {
        playIdle: () => {
          this.animation.play("idle");
        },
        playWalking: () => {
          this.animation.play("walking");
        },
        playRunning: () => {
          this.animation.play("running");
        },
      };
      this.debugFolder?.add(debugObject, "playIdle");
      this.debugFolder?.add(debugObject, "playWalking");
      this.debugFolder?.add(debugObject, "playRunning");
    }
  }

  update() {
    if (!this.time) return;
    this.animation.mixer.update(this.time.delta * 0.001);
  }
}
