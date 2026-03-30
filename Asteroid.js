// Asteroid.js
import Character from "./Character.js";

export default class Asteroid extends Character {
  speed;
  active = true;

  constructor() {
    super();
  }

  async init() {
    await this.loadImage("assets/asteroid3.png");
    this.width = this.image.width;
    this.height = this.image.height;
    this.reset();
  }

  reset() {
    this.scale = this.randomNumber(0.5, 1);
    this.x = this.randomNumber(0, this.canvas.width);
    this.y = this.randomNumber(-this.canvas.height, 0);
    this.speed = this.randomNumber(20, 60);
    this.active = true;
  }

  update(dt) {
    this.y += this.speed * dt;
    this.rotation -= this.speed * dt * 0.05;

    if (this.y > this.canvas.height + this.height) {
      this.reset();
    }
  }
}
