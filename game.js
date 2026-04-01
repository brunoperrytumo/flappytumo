// game.js
import Asteroid from "./src/Asteroid.js";
import Renderer from "./src/Renderer.js";
import Rocket from "./src/Rocket.js";
import InputHandler from "./src/InputHandler.js";
import Background from "./src/Background.js";
import Explosion from "./src/Explosion.js";
import GameUI from "./src/GameUI.js";
import Fuel from "./src/Fuel.js";

const MAX_ASTEROIDS = 20;

function checkCollision(a, b) {
  const dist = Math.hypot(b.x - a.x, b.y - a.y);
  return dist < a.getRadius() + b.getRadius();
}

window.onload = async () => {
  const gameUI = new GameUI();
  const renderer = new Renderer();
  const rocket = new Rocket();
  const fuel = new Fuel();
  const input = new InputHandler();
  const background = new Background();

  gameUI.reset();

  await rocket.init();
  await fuel.init();
  await background.init();

  const asteroids = [];
  const explosions = [];

  for (let i = 0; i < MAX_ASTEROIDS; i++) {
    const asteroid = new Asteroid();
    await asteroid.init();
    asteroids.push(asteroid);
  }

  let score = 0;
  let lastTime = performance.now();

  const loop = (timestamp) => {
    const dt = Math.min((timestamp - lastTime) / 1000, 0.05);
    lastTime = timestamp;

    rocket.update(input, dt);
    fuel.update();
    background.update(dt);
    for (const asteroid of asteroids) asteroid.update(dt);
    for (const explosion of explosions) explosion.update(dt);

    for (const bullet of rocket.bullets) {
      for (const asteroid of asteroids) {
        if (!asteroid.active) continue;
        if (checkCollision(bullet, asteroid)) {
          bullet.active = false;
          explosions.push(new Explosion(asteroid.x, asteroid.y, "#484848"));
          asteroid.reset();
          score += 10;
        }
      }
      if (checkCollision(bullet, fuel)) {
        explosions.push(new Explosion(fuel.x, fuel.y, "#ffff00"));
        fuel.reset();
      }
    }

    for (const asteroid of asteroids) {
      if (checkCollision(rocket, asteroid)) {
        asteroid.reset();
        rocket.lives--;
        if (rocket.lives === 0) {
          console.log("Game over!");
          return;
        }
      }
    }

    if (checkCollision(rocket, fuel)) {
      rocket.fuel = 100;
      fuel.reset();
    }
    gameUI.udpateFuel(rocket.fuel);

    explosions.splice(0, explosions.length, ...explosions.filter((e) => e.active));

    // --- Render ---
    renderer.reset();
    renderer.renderBackground(background);
    for (const bullet of rocket.bullets) renderer.renderEntity(bullet);
    for (const asteroid of asteroids) renderer.renderEntity(asteroid);
    for (const explosion of explosions) renderer.renderExplosion(explosion);
    renderer.renderEntity(fuel);
    renderer.renderEntity(rocket);

    // --- UI ---
    gameUI.updateAmmo(rocket.ammo);
    gameUI.updateScore(score);

    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);
};
