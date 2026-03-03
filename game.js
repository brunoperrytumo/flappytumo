import Bird from "./Bird.js";
import Renderer from "./Renderer.js";

let currentState = "MENU";
let renderer;
let bird;

window.onload = async function () {
  async function setupLayout() {
    document.querySelector("#play-button").onclick = function () {
      currentState = "PLAYING";
      document.querySelector("#menu-container").style.display = "none";
      document.querySelector("#game-container").style.display = "block";
    };

    renderer = new Renderer(document.querySelector("canvas"));

    bird = new Bird();
    await bird.init();

    window.onresize();
  }
  function update() {
    bird.update();

    if (bird.y + bird.height > renderer.height) {
      currentState = "GAME_OVER";
      console.log("Game Over!");
    }
  }
  function draw() {
    renderer.render(bird);
  }

  function loop() {
    if (currentState == "PLAYING") {
      update();
      draw();
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

window.onresize = function () {
  const main = document.querySelector("main");
  renderer.resize(main.offsetWidth, main.offsetHeight);
};
