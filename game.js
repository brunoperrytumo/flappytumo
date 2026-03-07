import Bird from "./Bird.js";
import Pipe from "./Pipe.js";
import Renderer from "./Renderer.js";
import HighscoreService from "./HighScoresService.js";

let scoresLabel;
let score = 0;
let scores;
let currentState = "MENU";
let renderer;
let bird;
let pipe;

window.onload = async function () {
  async function setupLayout() {
    document.querySelector("#play-button").onclick = function () {
      currentState = "PLAYING";
      document.querySelector("#menu-container").style.display = "none";
      document.querySelector("#game-container").style.display = "flex";
    };

    document.querySelector("#scores-button").onclick = async function () {
      const res = await scores.getHighscores();
      console.log(res);
    };

    renderer = new Renderer(document.querySelector("canvas"));

    bird = new Bird();
    await bird.init(renderer.width);

    pipe = new Pipe();
    await pipe.init(renderer.width, renderer.height);

    scores = new HighscoreService();
    scoresLabel = document.querySelector("#scores-label");
    const res = await scores.getHighscores();
  }

  function updateScore() {
    score++;
    scoresLabel.innerText = score;
    scoresLabel.style.animationName = "pop";
    setTimeout(function () {
      scoresLabel.style.animationName = "";
    }, 500);
  }

  function checkCollision(rect1, rect2) {
    return (
      rect1.x + rect1.width >= rect2.x &&
      rect1.x <= rect2.x + rect1.width &&
      rect1.y + rect1.height >= rect2.y &&
      rect1.y <= rect2.y + rect2.height
    );
  }

  function update() {
    pipe.update();
    bird.update();

    if (
      bird.y + bird.height >= renderer.height ||
      checkCollision(bird.birdBox, pipe.upperBox) ||
      checkCollision(bird.birdBox, pipe.lowerBox)
    ) {
      currentState = "ENDING";
      bird.jump();
      bird.die();
    }

    if (bird.x > pipe.x && !pipe.hasPassed) {
      updateScore();
      pipe.hasPassed = true;
    }
  }
  function draw() {
    renderer.render(bird, pipe);
  }

  function loop() {
    switch (currentState) {
      case "PLAYING":
        update();
        draw();
        break;
      case "ENDING":
        bird.update();
        draw();
        if (bird.y > renderer.height) {
          currentState = "GAME_OVER";
          document.querySelector("#gameover-label").style.animationName = "pop";
        }
        break;
      case "GAME_OVER":
        break;
    }

    requestAnimationFrame(loop);
  }

  setupLayout();
  loop();
};

window.onclick = function () {
  if (currentState === "PLAYING") {
    bird.jump();
  }
};
