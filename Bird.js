export default class Bird {
  image;
  x = 40;
  y = 0;
  width;
  height;

  //Physics
  #velocity = 0;
  #gravity = 0.1;
  #lift = -2;
  #maxVelocity = 5;

  birdBox;

  #isDead = false;

  #currentState = "ALIVE";

  constructor() {}

  init() {
    return new Promise((resolve, reject) => {
      this.image = new Image();
      this.image.onload = () => {
        this.width = this.image.width;
        this.height = this.image.height;
        this.birdBox = new DOMRect(this.x, 0, this.width, this.height);
        resolve(true);
      };
      this.image.onerror = reject;
      this.image.src = "assets/bird.png";
    });
  }

  update() {
    this.#velocity += this.#gravity;

    if (this.#velocity > this.#maxVelocity) {
      this.#velocity = this.#maxVelocity;
    }

    this.y += this.#velocity;
    if (this.y < 0) {
      this.y = 0;
      this.#velocity = 0;
    }
    this.birdBox.y = this.y;
  }

  jump() {
    if (!this.#isDead) {
      this.#velocity = this.#lift + (Math.random() * 2 - 1);
    }
  }

  die() {
    this.#currentState = "DYING";
  }

  reset() {
    this.y = 0;
    this.#velocity = 0;
    this.#isDead = false;
    this.#currentState = "ALIVE";
  }

  get state() {
    return this.#currentState;
  }
}
