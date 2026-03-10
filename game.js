import Bird from "./Bird.js";
import Pipe from "./Pipe.js";
import Renderer from "./Renderer.js";
import Scores from "./Scores.js";

let scores;
let currentState = "MENU";
let renderer;
let bird;
let pipe;

let pipes = [];
const MAX_PIPES = 2;

let playPauseButton;

window.onload = async function () {
  async function setupLayout() {
    document.querySelector("#play-button").onclick = function () {
      currentState = "PLAYING";
      document.querySelector("#menu-container").style.display = "none";
      document.querySelector("#highscores-container").style.display = "none";
      document.querySelector("#game-container").style.display = "flex";
    };
    playPauseButton = document.querySelector("#play-pause-button");
    playPauseButton.onclick = function (e) {
      e.stopPropagation();
      if (currentState == "PAUSED") {
        document.querySelector("#pause-icon").style.display = "block";
        document.querySelector("#play-icon").style.display = "none";
        currentState = "PLAYING";
      } else {
        document.querySelector("#pause-icon").style.display = "none";
        document.querySelector("#play-icon").style.display = "block";
        currentState = "PAUSED";
      }
    };
    document.querySelector("#scores-button").onclick = function () {
      currentState = "SCORES";
      document.querySelector("#menu-container").style.display = "none";
      document.querySelector("#highscores-container").style.display = "flex";
      document.querySelector("#game-container").style.display = "none";
    };
    document.querySelector("#back-button").onclick = function () {
      currentState = "MENU";
      document.querySelector("#menu-container").style.display = "flex";
      document.querySelector("#highscores-container").style.display = "none";
      document.querySelector("#game-container").style.display = "none";
    };

    renderer = new Renderer(document.querySelector("canvas"));

    bird = new Bird();
    await bird.init(renderer.width);

    for (let i = 0; i < MAX_PIPES; i++) {
      let p = new Pipe();
      await p.init(renderer.width, renderer.height);
      p.x = renderer.width * i;
      pipes.push(p);
    }

    pipe = new Pipe();
    await pipe.init(renderer.width, renderer.height);

    scores = new Scores();
    await scores.init();
  }

  function reset() {}

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
      scores.updateScore();
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
        playPauseButton.style.display = "none";
        if (bird.y > renderer.height) {
          currentState = "GAME_OVER";
          document.querySelector("#gameover-label").style.display = "block";
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
  console.log("click");
  if (currentState === "PLAYING") {
    bird.jump();
  }
};
