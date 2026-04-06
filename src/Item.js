import Entity from "./Entity.js";

export default class Item extends Entity {
  #ammoImage;
  #fuelImage;
  #locked = true;

  #items = ["ammo", "fuel"];
  currentItem;
  constructor() {
    super();
  }

  async init() {
    this.#ammoImage = await this.loadImage("assets/ammo.png");
    this.#fuelImage = await this.loadImage("assets/fuel.png");

    this.scale = 0.7;

    this.reset();
  }

  reset() {
    this.currentItem =
      this.#items[Math.round(this.randomNumber(0, this.#items.length - 1))];

    switch (this.currentItem) {
      case "ammo":
        this.image = this.#ammoImage;
        break;
      case "fuel":
        this.image = this.#fuelImage;
        break;
    }

    this.width = this.image.width;
    this.height = this.image.height;

    this.x = Math.round(this.randomNumber(0, this.canvas.width));
    this.y = -this.height;
    this.#locked = true;
    setTimeout(() => (this.#locked = false), this.randomNumber(5000, 20000));
  }

  update() {
    if (this.#locked) return;
    this.y++;

    if (this.y > this.canvas.height) {
      this.reset();
    }
  }
}
