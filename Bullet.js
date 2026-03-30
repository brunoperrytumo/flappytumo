// Bullet.js
import Character from "./Character.js";

export default class Bullet extends Character {
  #speed = 200;
  active = true;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
  }

  async init() {
    await this.loadImage("assets/bullet.png");
    this.width = this.image.width;
    this.height = this.image.height;
  }

  update(dt) {
    this.y -= this.#speed * dt;

    if (this.y < -this.height) {
      this.active = false;
    }
  }
}
