import Screen from "./Screen.js";
import Asteroid from "./Asteroid.js";
import GameUI from "./GameUI.js";
import Item from "./Item.js";
import Rocket from "./Rocket.js";
import Explosion from "./Explosion.js";
import AudioPlayer from "./AudioPlayer.js";

export default class Game extends Screen {
  MAX_ASTEROIDS = 20;

  #gameUI = new GameUI();
  #rocket = new Rocket();
  #item = new Item();

  #asteroids = [];
  #explosions = [];

  score = 0;

  constructor() {
    super("game");
  }

  async init() {
    await this.#rocket.init();
    await this.#item.init();

    for (let i = 0; i < this.MAX_ASTEROIDS; i++) {
      const asteroid = new Asteroid();
      await asteroid.init();
      this.#asteroids.push(asteroid);
    }
  }

  update(input, dt) {
    if (this.#rocket.lives > 0) {
      this.#rocket.update(input, dt);
    }

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
          AudioPlayer.play("asteroid_explosion");
        }
      }
      if (this.#checkCollision(bullet, this.#item)) {
        bullet.active = false;
        this.#explosions.push(new Explosion(this.#item.x, this.#item.y, "#ffff00"));
        this.#item.reset();
      }
    }

    for (const asteroid of this.#asteroids) {
      if (this.#checkCollision(this.#rocket, asteroid)) {
        asteroid.reset();
        this.#rocket.lives--;
        if (this.#rocket.lives === 0) {
          this.#explosions.push(new Explosion(this.#rocket.x, this.#rocket.y, "#ff0000"));
          AudioPlayer.play("rocket_explosion");
          setTimeout(() => (this.state = "gameover"), 1500);
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
      AudioPlayer.play("item");
      this.#item.reset();
    }
    this.#gameUI.udpateFuel(this.#rocket.fuel);
    this.#gameUI.updateAmmo(this.#rocket.ammo);
    this.#gameUI.updateScore(this.score);

    this.#explosions.splice(
      0,
      this.#explosions.length,
      ...this.#explosions.filter((e) => e.active),
    );
  }

  render(renderer) {
    for (const bullet of this.#rocket.bullets) renderer.renderEntity(bullet);
    for (const asteroid of this.#asteroids) renderer.renderEntity(asteroid);
    for (const explosion of this.#explosions) renderer.renderExplosion(explosion);
    renderer.renderEntity(this.#item);
    if (this.#rocket.lives > 0) {
      renderer.renderEntity(this.#rocket);
      renderer.renderExhaust(this.#rocket.exhaust);
    }
  }

  reset() {
    this.score = 0;
    this.state = "game";
    this.#rocket.reset();
    this.#gameUI.reset();

    for (let i = 0; i < this.#asteroids.length; i++) {
      this.#asteroids[i].reset();
    }
  }

  #checkCollision(a, b) {
    const dist = Math.hypot(b.x - a.x, b.y - a.y);
    return dist < a.getRadius() + b.getRadius();
  }

  hide() {
    super.hide();
    this.reset();
  }
}
