// game.js
import Asteroid from "./Asteroid.js";
import Renderer from "./Renderer.js";
import Rocket from "./Rocket.js";
import InputHandler from "./InputHandler.js";

const MAX_ASTEROIDS = 0;

function checkCollision(a, b) {
  const dist = Math.hypot(b.x - a.x, b.y - a.y);
  return dist < a.getRadius() + b.getRadius();
}

window.onload = async () => {
  const renderer = new Renderer();
  const rocket = new Rocket();
  const input = new InputHandler();
  await rocket.init();

  rocket.rotation = 0;

  const asteroids = [];
  for (let i = 0; i < MAX_ASTEROIDS; i++) {
    const asteroid = new Asteroid();
    await asteroid.init();
    asteroids.push(asteroid);
  }

  let lives = 3;
  let score = 0;

  const loop = () => {
    if (input.isButtonDown("left")) rocket.left();
    if (input.isButtonDown("right")) rocket.right();

    renderer.reset();
    rocket.update();

    for (let i = 0; i < MAX_ASTEROIDS; i++) {
      const asteroid = asteroids[i];
      asteroid.update();
      renderer.render(asteroid);

      if (checkCollision(rocket, asteroid)) {
        lives = Math.max(0, lives - 1);
        if (lives === 0) {
          console.log("Game over!");
          return;
        }
      }
    }

    renderer.render(rocket);
    requestAnimationFrame(loop);
  };

  loop();
};
