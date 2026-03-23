import Asteroid from "./Asteroid.js";
import Satelite from "./Satelite.js";
import StarField from "./StarField.js";

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
  document.querySelector("#left-button").onclick = () => {
    satelite.left();
  };
  document.querySelector("#right-button").onclick = () => {
    satelite.right();
  };

  const starField = new StarField();

  const MAX_ASTEROIDS = 5;

  const asteroids = [];
  for (let i = 0; i < MAX_ASTEROIDS; i++) {
    const asteroid = new Asteroid();
    await asteroid.init();
    asteroids.push(asteroid);
  }
  const satelite = new Satelite();
  await satelite.init();
  satelite.x = 20;
  satelite.y = 700;

  const showView = (view) => {
    mainMenuView.style.display = "none";
    gameView.style.display = "none";
    highscoresView.style.display = "none";

    view.style.display = "flex";
  };

  const checkCollision = (a, b) => {
    const dx = a.cx - b.cx;
    const dy = a.cy - b.cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return dist < a.radius + b.radius;
  };

  const loop = () => {
    starField.update();
    satelite.update();
    for (let i = 0; i < asteroids.length; i++) {
      asteroids[i].update();
    }

    const satCircle = satelite.circle();
    for (let i = 0; i < asteroids.length; i++) {
      if (checkCollision(satCircle, asteroids[i].circle())) {
        satelite.image.style.background = "red";
        asteroids[i].image.style.background = "blue";
        return;
      }
    }

    requestAnimationFrame(loop);
  };

  showView(gameView);
  loop();
};
