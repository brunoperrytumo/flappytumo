import Player from "./Player.js";
import Pipe from "./Pipe.js";
import Renderer from "./Renderer.js";
import Scores from "./Scores.js";

let scores;
let currentState = "MENU";
let renderer;
let player;

let pipes = [];
const MAX_PIPES = 2;

let playPauseButton;

window.onload = async function () {
  async function setupLayout() {
    document.querySelector("#play-button").onclick = function () {
      currentState = "PLAYING";
      reset();
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
      document.querySelector("#game-ui").style.display = "none";
    };
    document.querySelector("#back-button").onclick = function () {
      currentState = "MENU";
      document.querySelector("#menu-container").style.display = "flex";
      document.querySelector("#highscores-container").style.display = "none";
      document.querySelector("#game-container").style.display = "none";
      document.querySelector("#game-ui").style.display = "none";
    };
    document.querySelector("#restart-button").onclick = function () {
      reset();
      currentState = "PLAYING";
      document.querySelector("#game-ui").style.display = "none";
    };
    document.querySelector("#home-button").onclick = function () {
      reset();
      currentState = "MENU";
      document.querySelector("#menu-container").style.display = "flex";
      document.querySelector("#highscores-container").style.display = "none";
      document.querySelector("#game-container").style.display = "none";
      document.querySelector("#game-ui").style.display = "none";
    };

    renderer = new Renderer(document.querySelector("canvas"));

    player = new Player();
    await player.init(renderer.width);

    for (let i = 0; i < MAX_PIPES; i++) {
      let p = new Pipe();
      await p.init(renderer.width, renderer.height);
      p.x = renderer.width * (i + 1);
      pipes.push(p);
    }

    scores = new Scores();
    await scores.init();
  }

  function reset() {
    player.reset();
    scores.reset();
    for (let i = 0; i < MAX_PIPES; i++) {
      const p = pipes[i];
      p.reset();
      p.x = renderer.width * (i + 1);
    }
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
    for (let i = 0; i < MAX_PIPES; i++) {
      pipes[i].update();
    }
    player.update();

    for (let i = 0; i < MAX_PIPES; i++) {
      const p = pipes[i];
      if (
        player.y + player.height >= renderer.height ||
        checkCollision(player.playerBox, p.upperBox) ||
        checkCollision(player.playerBox, p.lowerBox)
      ) {
        currentState = "ENDING";
        player.jump();
        player.die();
        break;
      }
      if (player.x > p.x && !p.hasPassed) {
        scores.updateScore();
        p.hasPassed = true;
      }
    }
  }
  function draw() {
    renderer.render(player, pipes);
  }
  function loop() {
    switch (currentState) {
      case "PLAYING":
        update();
        draw();
        break;
      case "ENDING":
        player.update();
        draw();
        playPauseButton.style.display = "none";
        if (player.y > renderer.height) {
          currentState = "GAME_OVER";
          scores.checkForEligibleScore();
          document.querySelector("#game-ui").style.display = "flex";
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
    player.jump();
  }
};
