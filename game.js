// game.js
import Asteroid from "./Asteroid.js";
import Renderer from "./Renderer.js";
import Rocket from "./Rocket.js";
import InputHandler from "./InputHandler.js";
import Background from "./Background.js";
import Explosion from "./Explosion.js";

const MAX_ASTEROIDS = 5;

function checkCollision(a, b) {
  const dist = Math.hypot(b.x - a.x, b.y - a.y);
  return dist < a.getRadius() + b.getRadius();
}

window.onload = async () => {
  const renderer = new Renderer();
  const rocket = new Rocket();
  const input = new InputHandler();
  const background = new Background();

  await rocket.init();
  await background.init();

  const asteroids = [];
  const explosions = [];

  for (let i = 0; i < MAX_ASTEROIDS; i++) {
    const asteroid = new Asteroid();
    await asteroid.init();
    asteroids.push(asteroid);
  }

  let lives = 3;
  let score = 0;
  let lastTime = performance.now();

  const loop = (timestamp) => {
    const dt = Math.min((timestamp - lastTime) / 1000, 0.05);
    lastTime = timestamp;

    rocket.update(input, dt);
    background.update(dt);
    for (const asteroid of asteroids) asteroid.update(dt);
    for (const explosion of explosions) explosion.update(dt);

    for (const bullet of rocket.bullets) {
      for (const asteroid of asteroids) {
        if (!asteroid.active) continue;
        if (checkCollision(bullet, asteroid)) {
          bullet.active = false;
          explosions.push(new Explosion(asteroid.x, asteroid.y));
          asteroid.reset();
          score += 10;
        }
      }
    }

    for (const asteroid of asteroids) {
      if (checkCollision(rocket, asteroid)) {
        asteroid.reset();
        lives = Math.max(0, lives - 1);
        if (lives === 0) {
          console.log("Game over!");
          return;
        }
      }
    }

    explosions.splice(0, explosions.length, ...explosions.filter((e) => e.active));

    // --- Render ---
    renderer.reset();
    renderer.renderBackground(background);
    for (const bullet of rocket.bullets) renderer.renderEntity(bullet);
    // for (const asteroid of asteroids) renderer.renderEntity(asteroid);
    // for (const explosion of explosions) renderer.renderExplosion(explosion);
    renderer.renderEntity(rocket);

    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);
};
