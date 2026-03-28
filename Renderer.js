export default class Renderer {
  canvas;
  ctx;
  constructor() {
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = false;
  }

  reset() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  renderBackground(background) {
    for (const star of background.stars) {
      this.ctx.drawImage(
        background.image, // same Image object reused for every star
        star.x,
        star.y,
        star.size,
        star.size,
      );
    }
  }

  render(entity) {
    this.ctx.save();
    this.ctx.translate(entity.x, entity.y);
    this.ctx.rotate(entity.rotation);
    this.ctx.scale(entity.scale, entity.scale);
    this.ctx.drawImage(
      entity.image,
      entity.frameX,
      entity.frameY,
      entity.width,
      entity.height,
      -Math.round(entity.width / 2), // dest x — centered on origin
      -Math.round(entity.height / 2),
      entity.width,
      entity.height,
    );
    this.ctx.restore();
  }
}
