import Robot from "./Robot.class";

export default class FlyingRobot extends Robot {
  constructor(name: string, legs: number) {
    super(name, legs);
  }
  takeOff() {
    console.log(`Have a good flight ${this.name}`);
  }

  land() {}
}
