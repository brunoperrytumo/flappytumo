export default class Character {
  x = 0;
  y = 0;
  rotation = 0;
  scale = 1;

  width;
  height;

  image;

  constructor(x = 0, y = 0, r = 0, s = 1) {
    this.x = x;
    this.y = y;
    this.rotation = r;
    this.scale = s;
  }

  async loadImage(url) {
    return new Promise((resolve, reject) => {
      this.image = document.createElement("img");
      this.image.onload = () => {
        document.querySelector("#images-container").appendChild(this.image);
        this.width = this.image.width;
        this.height = this.image.height;
        resolve(true);
      };
      this.image.onerror = reject;
      this.image.src = url;
    });
  }

  update() {
    this.image.style.transform = `translate3d(${this.x}px, ${this.y}px, 0) rotate(${this.rotation}deg) scale(${this.scale})`;
  }

  randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  rect() {
    return this.image.getBoundingClientRect();
  }

  circle() {
    const cx = this.x + (this.width * this.scale) / 2;
    const cy = this.y + (this.height * this.scale) / 2;
    const radius = (Math.max(this.width, this.height) * this.scale) / 2;
    return { cx, cy, radius };
  }
}
