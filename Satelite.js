import Character from "./Character.js";

export default class Satelite extends Character {
  #velocityX = 0;
  #thrustPower = 0.3;
  #maxSpeed = 5;
  constructor() {
    super();
  }

  async init() {
    await this.loadImage("assets/satelite3.png");
    this.width = this.image.width;
    this.height = this.image.height;
  }

  update() {
    this.#velocityX = Math.max(
      -this.#maxSpeed,
      Math.min(this.#maxSpeed, this.#velocityX),
    );
    this.x += this.#velocityX;
    super.update();
  }

  left() {
    this.#velocityX -= this.#thrustPower;
  }

  right() {
    this.#velocityX += this.#thrustPower;
  }
}
