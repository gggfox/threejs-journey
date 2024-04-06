import EventEmitter from "./EventEmitter.class";

export default class Sizes extends EventEmitter {
  width: number = 0;
  height: number = 0;
  pixelRatio: number = 0;

  constructor() {
    super();
    this.setUp();
    window.addEventListener("resize", () => this.setUp());
  }

  setUp() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.trigger("resize", null);
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  getPixelRatio() {
    return this.pixelRatio;
  }
}
