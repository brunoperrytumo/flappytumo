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
        document.querySelector("#game").appendChild(this.image);
        resolve(true);
      };
      this.image.onerror = reject;
      this.image.src = url;
    });
  }

  update() {
    this.image.style.transform = `translate3d(${this.x}px, ${this.y}px, 0) rotate(${this.rotation}deg) scale(${this.scale})`;
  }
}
