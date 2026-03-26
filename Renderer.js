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

  render(entity) {
    this.ctx.save();
    this.ctx.rotate(entity.rotation);
    this.ctx.scale(entity.scale, entity.scale);
    this.ctx.drawImage(
      entity.image,
      entity.frameX,
      entity.frameY,
      entity.width,
      entity.height,
      entity.x,
      entity.y,
      entity.width,
      entity.height,
    );
    this.ctx.restore();
  }
}
