export default class StarField {
  #canvas;
  #ctx;
  #layers;

  constructor() {
    this.#canvas = document.querySelector("#starfield");
    this.#ctx = this.#canvas.getContext("2d");

    const main = document.querySelector("main");
    this.#canvas.width = main.offsetWidth;
    this.#canvas.height = main.offsetHeight;

    const W = this.#canvas.width;
    const H = this.#canvas.height;

    this.#layers = [
      { stars: this.#makeStars(80, W, H), speed: 0.2, size: 2, opacity: 0.5 },
      { stars: this.#makeStars(50, W, H), speed: 0.6, size: 2.5, opacity: 0.7 },
      { stars: this.#makeStars(25, W, H), speed: 1.2, size: 4.5, opacity: 1.0 },
    ];
  }

  #makeStars(count, W, H) {
    return Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
    }));
  }

  update() {
    const W = this.#canvas.width;
    const H = this.#canvas.height;
    const ctx = this.#ctx;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#05050f";
    ctx.fillRect(0, 0, W, H);

    for (const layer of this.#layers) {
      ctx.fillStyle = `rgba(255, 255, 255, ${layer.opacity})`;
      for (const star of layer.stars) {
        star.y += layer.speed;
        if (star.y > H) star.y = -10;

        ctx.beginPath();
        ctx.rect(star.x, star.y, layer.size, layer.size);
        ctx.fill();
      }
    }
  }
}
