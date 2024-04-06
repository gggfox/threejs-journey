import * as THREE from "three";
import Experience from "../Experience";

export default class Floor {
  experience;
  scene;
  resources;
  geometry?: THREE.CircleGeometry;
  textures?: {
    color: THREE.Texture | null | undefined;
    normal: THREE.Texture | null | undefined;
    colorSpace: string;
  };
  material?: THREE.MeshStandardMaterial;
  mesh?: THREE.Mesh;
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setGeometry();
    this.setTexture();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.CircleGeometry(5, 64);
  }

  setTexture() {
    this.textures = {
      color: this.resources?.items.get("grassColorTexture") as THREE.Texture,
      normal: this.resources?.items.get("grassNormalTexture") as THREE.Texture,
      colorSpace: THREE.SRGBColorSpace,
    };

    if (!this.textures.color || !this.textures.normal) {
      return;
    }

    this.textures.color.repeat.set(1.5, 1.5);
    this.textures.color.wrapS = THREE.RepeatWrapping;
    this.textures.color.wrapT = THREE.RepeatWrapping;

    this.textures.normal.repeat.set(1.5, 1.5);

    this.textures.normal.wrapS = THREE.RepeatWrapping;
    this.textures.normal.wrapT = THREE.RepeatWrapping;
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      map: this.textures?.color,
      normalMap: this.textures?.normal,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = Math.PI * -0.5;
    this.mesh.receiveShadow = true;
    this.scene?.add(this.mesh);
  }
}
