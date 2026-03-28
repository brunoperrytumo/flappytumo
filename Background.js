// Background.js
import Character from "./Character.js";

const LAYERS = [
  { count: 15, speed: 20, size: 1 }, // far
  { count: 20, speed: 40, size: 1.5 }, // mid
  { count: 15, speed: 80, size: 2 }, // near
];

export default class Background extends Character {
  #stars = [];

  constructor() {
    super();
  }

  async init() {
    await this.loadImage("assets/particle.png");
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
      x: Math.random() * this.canvas.width,
      y: randomY ? Math.random() * this.canvas.height : 0,
      speed: layer.speed,
      size: layer.size,
    };
  }

  update() {
    for (const star of this.#stars) {
      star.y += Math.floor(star.speed * 0.04);

      // Recycle to the top when it falls off screen
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
