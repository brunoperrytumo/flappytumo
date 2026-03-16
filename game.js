import Asteroid from "./Asteroid.js";
import PixelCollision from "./PixelConllision.js";
import Satelite from "./Satelite.js";

window.onload = async () => {
  //UI STUFF
  const mainMenuView = document.querySelector("#main-menu");
  const gameView = document.querySelector("#game");
  const highscoresView = document.querySelector("#highscores");

  document.querySelector("#play-button").onclick = () => {
    showView(gameView);
  };
  document.querySelector("#highscores-button").onclick = () => {
    showView(highscoresView);
  };
  document.querySelector("#back-button").onclick = () => {
    showView(mainMenuView);
  };
  document.querySelector("#up-button").onclick = () => {
    satelite.up();
  };
  document.querySelector("#down-button").onclick = () => {
    satelite.down();
  };

  const MAX_ASTEROIDS = 1;
  const collisionDetector = new PixelCollision();

  const asteroids = [];
  for (let i = 0; i < MAX_ASTEROIDS; i++) {
    const asteroid = new Asteroid();
    await asteroid.init();
    asteroids.push(asteroid);
  }
  const satelite = new Satelite();
  await satelite.init();
  satelite.scale = 1;
  satelite.x = 20;
  satelite.y = 100;

  const showView = (view) => {
    mainMenuView.style.display = "none";
    gameView.style.display = "none";
    highscoresView.style.display = "none";

    view.style.display = "flex";
  };

  const frameSkip = 2; // Check collisions every 2 frames for performance
  let frameCount = 0;
  const loop = (currentTime) => {
    satelite.update();
    for (let i = 0; i < asteroids.length; i++) {
      asteroids[i].update();
    }

    frameCount++;
    if (frameCount % frameSkip === 0) {
      for (let i = 0; i < asteroids.length; i++) {
        if (collisionDetector.checkCollision(satelite, asteroids[i])) {
          console.log("GAME OVER - Pixel perfect collision!");
          return;
        }
      }
    }

    requestAnimationFrame(loop);
  };

  showView(gameView);
  loop();
};
