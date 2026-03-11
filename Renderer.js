export default class Renderer {
  #canvas;
  #context;
  constructor(canvas) {
    this.#canvas = canvas;
    this.#context = this.#canvas.getContext("2d");
  }

  render(bird, pipes) {
    this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#context.imageSmoothingEnabled = false;

    for (let i = 0; i < pipes.length; i++) {
      let p = pipes[i];
      this.#context.drawImage(p.image, p.x, p.y, p.width, p.height);
    }
    this.#context.drawImage(bird.image, bird.x, bird.y, bird.width, bird.height);
  }

  get width() {
    return this.#canvas.width;
  }
  get height() {
    return this.#canvas.height;
  }
}
