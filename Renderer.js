export default class Renderer {
  #canvas;
  #context;
  constructor(canvas) {
    this.#canvas = canvas;
    this.#context = this.#canvas.getContext("2d");
  }

  resize(w, h) {
    this.#canvas.width = w;
    this.#canvas.height = h;
  }

  render(bird, pipes) {
    this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#context.imageSmoothingEnabled = false;
    this.#context.drawImage(
      bird.image,
      bird.x,
      bird.y,
      bird.width,
      bird.height,
    );
  }

  get width() {
    return this.#canvas.width;
  }
  get height() {
    return this.#canvas.height;
  }
}
