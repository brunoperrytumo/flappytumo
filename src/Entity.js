export default class Entity {
  x = 0;
  y = 0;
  rotation = 0;
  scale = 1;

  width;
  height;

  image;

  canvas;

  constructor(x = 0, y = 0, r = 0, s = 1) {
    this.x = x;
    this.y = y;
    this.rotation = r;
    this.scale = s;

    this.canvas = document.querySelector("canvas");
  }

  async init(imageURL) {
    await this.loadImage(imageURL);
    this.width = this.image.width;
    this.height = this.image.height;
  }

  update() {}

  getBounds() {
    const hw = (this.width * this.scale) / 2;
    const hh = (this.height * this.scale) / 2;
    return {
      left: this.x - hw,
      right: this.x + hw,
      top: this.y - hh,
      bottom: this.y + hh,
    };
  }
  getRadius() {
    return ((Math.min(this.width, this.height) * this.scale) / 2) * 0.8;
  }

  async loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.width = img.width;
        this.height = img.height;
        this.image = img;
        resolve(true);
      };
      img.onerror = reject;
      img.src = url;
    });
  }

  randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
  get frameX() {
    return 0;
  }
  get frameY() {
    return 0;
  }
}
