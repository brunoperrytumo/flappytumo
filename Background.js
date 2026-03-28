import Character from "./Character.js";

export default class Background extends Character {
  #stars = [];
  constructor() {}

  async init() {
    await this.loadImage("assets/particle.png");

    this.#reset();
  }

  #reset() {}

  update() {}
}
