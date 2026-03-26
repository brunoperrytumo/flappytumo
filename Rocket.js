import Character from "./Character.js";

export default class Rocket extends Character {
  #state = "normal";
  #velocityX = 0;
  #thrustPower = 0.3;
  #maxSpeed = 5;
  constructor() {
    super();
  }

  async init() {
    await this.loadImage("assets/rocket.png");

    this.width = Rocket.FRAME_WIDTH;
    this.height = Rocket.FRAME_HEIGHT;

    this.x = Math.round(this.canvas.width / 2 - this.width / 2);
    this.y = Math.round(this.canvas.height - this.height * 2);
  }

  update() {
    this.#velocityX = Math.max(
      -this.#maxSpeed,
      Math.min(this.#maxSpeed, this.#velocityX),
    );
    this.x += this.#velocityX;

    const hw = (this.width * this.scale) / 2;
    this.x = Math.max(hw, Math.min(this.canvas.width - hw, this.x));

    if (this.#velocityX < -0.1) this.#state = "left";
    else if (this.#velocityX > 0.1) this.#state = "right";
    else this.#state = "normal";

    super.update();
  }
  left() {
    this.#velocityX -= this.#thrustPower;
  }
  right() {
    this.#velocityX += this.#thrustPower;
  }

  // Returns the source rect to cut from the sprite sheet
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
