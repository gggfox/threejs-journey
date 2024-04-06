export enum SourceType {
  Cube = "Cube_Texture",
  GLTF = "GLTF_Model",
  Texture = "Texture",
}

export interface Source {
  name: string;
  type: SourceType;
  path: string[];
}

const array: Source[] = [
  {
    name: "environmentMapTexture",
    type: SourceType.Cube,
    path: [
      "textures/environmentMap/px.jpg",
      "textures/environmentMap/nx.jpg",
      "textures/environmentMap/py.jpg",
      "textures/environmentMap/ny.jpg",
      "textures/environmentMap/pz.jpg",
      "textures/environmentMap/nz.jpg",
    ],
  },
  {
    name: "grassNormalTexture",
    type: SourceType.Texture,
    path: ["textures/dirt/color.jpg"],
  },
  {
    name: "foxModel",
    type: SourceType.GLTF,
    path: ["models/Fox/glTF/Fox.gltf"],
  },
];
export default array;
