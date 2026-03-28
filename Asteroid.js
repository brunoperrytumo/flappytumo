import Character from "./Character.js";

export default class Asteroid extends Character {
  speed;
  #screenWidth;
  #screenHeight;

  #images = ["asteroid3.png"];

  constructor() {
    super();

    const main = document.querySelector("canvas");
    this.#screenWidth = main.width;
    this.#screenHeight = main.height;
  }

  async init() {
    const img = Math.round(this.randomNumber(0, this.#images.length - 1));
    await this.loadImage(`assets/${this.#images[img]}`);

    this.width = this.image.width;
    this.height = this.image.height;

    this.#reset();
  }

  #reset() {
    this.scale = this.randomNumber(1, 1.5);
    this.x = this.randomNumber(0, this.#screenWidth - this.width);
    this.y = this.randomNumber(0, -this.#screenHeight);
    this.speed = this.randomNumber(0.1, 1);
  }

  update() {
    this.y += this.speed;
    this.rotation -= this.speed * 0.05;

    if (this.y > this.#screenHeight) {
      this.#reset();
    }
  }
}
