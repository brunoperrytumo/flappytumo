import Character from "./Character.js";

export default class Satelite extends Character {
  #velocityY = 0;
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
    this.y += this.#velocityY;

    this.#velocityY = Math.max(
      -this.#maxSpeed,
      Math.min(this.#maxSpeed, this.#velocityY),
    );

    super.update();
  }

  up() {
    this.#velocityY -= this.#thrustPower;
  }

  down() {
    this.#velocityY += this.#thrustPower;
  }
}
