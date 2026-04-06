import Asteroid from "./Asteroid.js";
import GameUI from "./GameUI.js";
import Item from "./Item.js";
import Rocket from "./Rocket.js";
import Explosion from "./Explosion.js";

export default class Game {
  MAX_ASTEROIDS = 20;

  #gameUI = new GameUI();
  #rocket = new Rocket();
  #item = new Item();

  #asteroids = [];
  #explosions = [];

  #element;

  score;
  state = "game";

  constructor() {
    this.#element = document.querySelector("#game");
  }

  async init() {
    await this.#rocket.init();
    await this.#item.init();

    for (let i = 0; i < this.MAX_ASTEROIDS; i++) {
      const asteroid = new Asteroid();
      await asteroid.init();
      this.#asteroids.push(asteroid);
    }

    this.reset();
  }

  update(input, dt) {
    this.#rocket.update(input, dt);
    this.#item.update();
    for (const asteroid of this.#asteroids) asteroid.update(dt);
    for (const explosion of this.#explosions) explosion.update(dt);

    for (const bullet of this.#rocket.bullets) {
      for (const asteroid of this.#asteroids) {
        if (!asteroid.active) continue;
        if (this.#checkCollision(bullet, asteroid)) {
          bullet.active = false;
          this.#explosions.push(new Explosion(asteroid.x, asteroid.y, "#484848"));
          asteroid.reset();
          this.score += 10;
        }
      }
      if (this.#checkCollision(bullet, this.#item)) {
        this.#explosions.push(new Explosion(this.#item.x, this.#item.y, "#ffff00"));
        this.#item.reset();
      }
    }

    for (const asteroid of this.#asteroids) {
      if (this.#checkCollision(this.#rocket, asteroid)) {
        asteroid.reset();
        this.#rocket.lives--;
        if (this.#rocket.lives === 0) {
          console.log("Game over!");
          return;
        }
      }
    }

    if (this.#checkCollision(this.#rocket, this.#item)) {
      switch (this.#item.currentItem) {
        case "ammo":
          this.#rocket.ammo = 100;
          break;
        case "fuel":
          this.#rocket.fuel = 100;
          break;
      }
      this.#item.reset();
    }

    this.#gameUI.udpateFuel(this.#rocket.fuel);

    this.#explosions.splice(
      0,
      this.#explosions.length,
      ...this.#explosions.filter((e) => e.active),
    );

    this.#gameUI.updateAmmo(this.#rocket.ammo);
    this.#gameUI.updateScore(this.score);
  }

  render(renderer) {
    for (const bullet of this.#rocket.bullets) renderer.renderEntity(bullet);
    for (const asteroid of this.#asteroids) renderer.renderEntity(asteroid);
    for (const explosion of this.#explosions) renderer.renderExplosion(explosion);
    renderer.renderEntity(this.#item);
    renderer.renderEntity(this.#rocket);
  }

  reset() {
    this.score = 0;
    this.state = "game";
  }

  show() {
    this.#element.style.display = "flex";
  }
  hide() {
    this.#element.style.display = "none";
    this.reset();
  }

  #checkCollision(a, b) {
    const dist = Math.hypot(b.x - a.x, b.y - a.y);
    return dist < a.getRadius() + b.getRadius();
  }
}
