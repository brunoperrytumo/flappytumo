export default class Bird {
  image;
  x = 0;
  y = 0;
  width;
  height;
  constructor() {}

  init() {
    return new Promise((resolve, reject) => {
      this.image = new Image();
      this.image.onload = () => {
        this.width = this.image.width;
        this.height = this.image.height;
        resolve(true);
      };
      this.image.onerror = reject;
      this.image.src = "assets/bird.png";
    });
  }

  update() {
    this.y--;
  }

  jump() {}
}
