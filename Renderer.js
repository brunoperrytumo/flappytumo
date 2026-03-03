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
    console.log(bird.width);
    this.#context.drawImage(bird.image, bird.x, bird.y, bird.width, bird.height);
  }
}
