// Bullet.js
import Entity from "./Entity.js";

export default class Bullet extends Entity {
  #speed = 200;
  active = true;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
  }

  update(dt) {
    this.y -= this.#speed * dt;

    if (this.y < -this.height) {
      this.active = false;
    }
  }
}
