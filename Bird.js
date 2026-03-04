export default class Bird {
  image;
  x = 40;
  y = 0;
  width;
  height;

  //Physics
  #velocity = 0;
  #gravity = 0.5;
  #lift = -8;
  #maxVelocity = 15;

  constructor() {}

  init() {
    return new Promise((resolve, reject) => {
      this.image = new Image();
      this.image.onload = () => {
        this.width = this.image.width;
        this.height = this.image.height;
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
  }

  jump() {
    this.#velocity = this.#lift + (Math.random() * 2 - 1);
  }

  reset() {
    this.y = 200;
    this.velocity = 0;
  }
}
