// Background.js
import Entity from "./Entity.js";

const LAYERS = [
  { count: 15, speed: 5, size: 0.2 },
  { count: 20, speed: 10, size: 0.5 },
  { count: 15, speed: 20, size: 1 },
];

export default class Background extends Entity {
  #stars = [];

  constructor() {
    super();
  }

  async init() {
    await super.init("assets/particle.png");
    this.#reset();
  }

  #reset() {
    this.#stars = [];

    for (const layer of LAYERS) {
      for (let i = 0; i < layer.count; i++) {
        this.#stars.push(this.#makestar(layer, true));
      }
    }
  }

  #makestar(layer, randomY = false) {
    return {
      x: Math.round(Math.random() * this.canvas.width),
      y: randomY ? Math.random() * this.canvas.height : 0,
      speed: layer.speed,
      size: layer.size,
    };
  }

  update() {
    for (const star of this.#stars) {
      star.y += star.speed * 0.02;

      if (star.y > this.canvas.height) {
        star.y = 0;
        star.x = Math.random() * this.canvas.width;
      }
    }
  }

  get stars() {
    return this.#stars;
  }
}
