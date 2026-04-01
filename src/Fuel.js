// Fuel.js
import Entity from "./Entity.js";

export default class Fuel extends Entity {
  #locked = true;
  constructor() {
    super();
  }

  async init() {
    await super.init("assets/fuel.png");
    this.scale = 0.5;

    this.reset();
  }

  reset() {
    this.x = Math.round(this.randomNumber(0, this.canvas.width));
    this.y = -this.height;
    this.#locked = true;
    setTimeout(() => (this.#locked = false), this.randomNumber(5000, 20000));
  }

  update() {
    if (this.#locked) return;
    this.y++;

    if (this.y > this.canvas.height) {
      this.reset();
    }
  }
}
