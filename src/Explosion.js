// Explosion.js
const PARTICLE_COUNT = 18;
const PARTICLE_SPEED = 260;
const PARTICLE_LIFE = 0.8; // seconds

export default class Explosion {
  active = true;
  #particles = [];

  constructor(x, y, c = "#ffffff") {
    // Spawn particles in all directions
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
      const speed = PARTICLE_SPEED * (0.5 + Math.random() * 0.5);
      this.#particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: PARTICLE_LIFE,
        size: Math.random() * 2 + 1,
        color: c,
      });
    }
  }

  update(dt) {
    for (const p of this.#particles) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;
    }

    // Mark explosion as done when all particles are dead
    if (this.#particles.every((p) => p.life <= 0)) {
      this.active = false;
    }
  }

  get particles() {
    return this.#particles;
  }
}
