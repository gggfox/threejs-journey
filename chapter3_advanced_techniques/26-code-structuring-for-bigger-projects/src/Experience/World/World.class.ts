import Experience from "../Experience";
import * as THREE from "three";
import Environment from "./Environment.class";
import Resources from "../Utils/Resources.class";
import Floor from "./Floor.class";
import Fox from "./Fox.class";

export default class World {
  experience: Experience;
  scene?: THREE.Scene;
  environment?: Environment;
  resources?: Resources;
  floor?: Floor;
  fox?: Fox;
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.resources?.on("ready", () => {
      this.fox = new Fox();
      this.floor = new Floor();

      this.environment = new Environment();
    });

    // Setup
  }

  update() {
    this.fox?.update();
  }
}
