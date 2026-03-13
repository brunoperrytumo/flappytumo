import Character from "./Character.js";

export default class Satelite extends Character {
  constructor() {
    super();
  }

  async init() {
    await this.loadImage("assets/satelite.png");
    this.width = this.image.width;
    this.height = this.image.height;
  }
}
