import Character from "./Character.js";

export default class Asteroid extends Character {
  speed;
  #screenWidth;
  #screenHeight;

  #images = ["asteroid.png", "asteroid2.png", "moon1.png"];

  constructor() {
    super();

    const main = document.querySelector("main");
    this.#screenWidth = main.offsetWidth;
    this.#screenHeight = main.offsetHeight;
  }

  async init() {
    const img = Math.round(this.randomNumber(0, this.#images.length - 1));
    await this.loadImage(`assets/${this.#images[img]}`);

    this.width = this.image.width;
    this.height = this.image.height;

    this.#reset();
  }

  #reset() {
    this.scale = this.randomNumber(1, 3);
    this.x = this.randomNumber(0, this.#screenWidth - this.width);
    this.y = this.randomNumber(0, -this.#screenHeight);
    this.speed = this.randomNumber(1, 5);
  }

  update() {
    this.y += this.speed;
    this.rotation -= this.speed;

    if (this.y > this.#screenHeight) {
      this.#reset();
    }
    super.update();
  }
}
