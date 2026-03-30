// Rocket.js
import Entity from "./Entity.js";
import Bullet from "./Bullet.js";

const FIRE_COOLDOWN = 0.2;

export default class Rocket extends Entity {
  #state = "normal";
  #velocityX = 0;
  #fireCooldown = 0;
  #bulletImage = null;
  bullets = [];

  constructor() {
    super();
  }

  async init() {
    await this.loadImage("assets/rocket.png");
    this.width = Rocket.FRAME_WIDTH;
    this.height = Rocket.FRAME_HEIGHT;
    this.x = Math.round(this.canvas.width / 2);
    this.y = Math.round(this.canvas.height - this.height * 2);

    const bulletImg = new Image();
    await new Promise((resolve, reject) => {
      bulletImg.onload = resolve;
      bulletImg.onerror = reject;
      bulletImg.src = "assets/bullet.png";
    });
    this.#bulletImage = bulletImg;
  }

  update(input, dt) {
    this.#velocityX = 0;

    if (input.held.left) this.#velocityX = -1;
    if (input.held.right) this.#velocityX = 1;
    if (input.held.fire) this.#shoot();

    this.x += this.#velocityX;
    const hw = Math.round((this.width * this.scale) / 2);
    this.x = Math.max(hw, Math.min(this.canvas.width - hw, this.x));

    if (this.#velocityX < -0.1) this.#state = "right";
    else if (this.#velocityX > 0.1) this.#state = "left";
    else this.#state = "normal";

    this.#fireCooldown -= dt;

    for (const bullet of this.bullets) bullet.update(dt);
    this.bullets = this.bullets.filter((b) => b.active);

    super.update();
  }

  #shoot() {
    if (this.#fireCooldown > 0) return;

    const bullet = new Bullet(this.x, this.y - this.height / 2);
    bullet.image = this.#bulletImage;
    bullet.width = this.#bulletImage.width;
    bullet.height = this.#bulletImage.height;
    bullet.active = true;
    this.bullets.push(bullet);

    this.#fireCooldown = FIRE_COOLDOWN;
  }

  get frameX() {
    return Rocket.STATES[this.#state] * Rocket.FRAME_WIDTH;
  }
  get frameY() {
    return 0;
  }
}

Rocket.FRAME_WIDTH = 17;
Rocket.FRAME_HEIGHT = 30;
Rocket.STATES = { left: 0, normal: 1, right: 2 };
