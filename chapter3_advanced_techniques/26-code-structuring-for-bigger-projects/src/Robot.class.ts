export default class Robot {
  name: string;
  legs: number;

  constructor(name: string, legs: number) {
    this.name = name;
    this.legs = legs;
    console.log(`I am ${name}. Thank you creator`);
  }

  sayHi() {
    console.log(`Hi I am ${this.name}`);
  }
}
