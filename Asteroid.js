import Character from "./Character.js";

export default class Asteroid extends Character {
  speed;
  #screenWidth;
  #screenHeight;

  #rotateDirections = "cw";
  constructor() {
    super();

    const main = document.querySelector("main");
    this.#screenWidth = main.offsetWidth;
    this.#screenHeight = main.offsetHeight;
  }

  async init() {
    await this.loadImage("assets/asteroid.png");

    this.width = this.image.width;
    this.height = this.image.height;

    this.#reset();
  }

  #reset() {
    // this.scale = this.randomNumber(1, 3);
    this.scale = 1;
    // this.x = this.#screenWidth + this.randomNumber(20, 350);
    this.x = 40;
    this.y = this.randomNumber(0, this.#screenHeight);
    this.speed = this.randomNumber(1, 5);
  }

  update() {
    // this.x -= this.speed;
    // this.rotation -= this.speed;

    if (this.x < -this.width) {
      this.#reset();
    }
    super.update();
  }
}
