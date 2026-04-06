// Renderer.js
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
        background.image,
        star.x,
        star.y,
        star.size,
        star.size,
      );
    }
  }

  renderExplosion(explosion) {
    for (const p of explosion.particles) {
      if (p.life <= 0) continue;

      const alpha = Math.min(p.life / 0.5, 1);
      this.ctx.globalAlpha = alpha;

      this.ctx.fillStyle = p.size > 2 ? p.color : "#ffffff";

      const size = Math.ceil(p.size * 2);
      this.ctx.fillRect(Math.round(p.x), Math.round(p.y), size, size);
    }
    this.ctx.globalAlpha = 1;
  }

  renderEntity(entity) {
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
      -Math.round(entity.width / 2),
      -Math.round(entity.height / 2),
      entity.width,
      entity.height,
    );
    this.ctx.restore();
  }
  renderExhaust(exhaust) {
    for (const p of exhaust) {
      if (p.life <= 0) continue;

      const t = p.life / 0.4;
      this.ctx.globalAlpha = t;
      this.ctx.fillStyle =
        t > 0.6 ? "#b7ff00" : t > 0.3 ? "#ffaa00" : "#ff4400";

      const size = Math.ceil(p.size * t);
      this.ctx.fillRect(Math.round(p.x), Math.round(p.y), size, size);
    }
    this.ctx.globalAlpha = 1;
  }
}
