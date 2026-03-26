// game.js
import Asteroid from "./Asteroid.js";
import Renderer from "./Renderer.js";
import Rocket from "./Rocket.js";

const MAX_ASTEROIDS = 0;

// Returns true if two entities' bounding boxes overlap
function checkCollision(a, b) {
  const dist = Math.hypot(b.x - a.x, b.y - a.y);
  return dist < a.getRadius() + b.getRadius();
}

window.onload = async () => {
  const renderer = new Renderer();
  const rocket = new Rocket();
  await rocket.init();

  const asteroids = [];
  for (let i = 0; i < MAX_ASTEROIDS; i++) {
    const asteroid = new Asteroid();
    await asteroid.init();
    asteroids.push(asteroid);
  }

  let lives = 3;
  let score = 0;

  const loop = () => {
    renderer.reset();
    rocket.update();

    for (let i = 0; i < MAX_ASTEROIDS; i++) {
      const asteroid = asteroids[i];
      asteroid.update();
      renderer.render(asteroid);
      renderer.render(rocket);
      if (checkCollision(rocket, asteroid)) {
        // Hit! Reset the asteroid and deduct a life
        // asteroid.reset();
        lives = Math.max(0, lives - 1);
        console.log(`Hit! Lives remaining: ${lives}`);

        if (lives === 0) {
          console.log("Game over!");
          return;
        }
      } else {
        // Asteroid passed safely — award a point when it goes off screen
        // (Asteroid.update() calls #reset internally when y > screenHeight,
        //  so we track the wrap by checking if y jumped back to negative)
      }
    }

    renderer.render(rocket);
    requestAnimationFrame(loop);
  };

  loop();
};
