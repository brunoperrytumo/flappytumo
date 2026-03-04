import Bird from "./Bird.js";
import Pipe from "./Pipe.js";
import Renderer from "./Renderer.js";

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

    renderer = new Renderer(document.querySelector("canvas"));
    window.onresize();

    bird = new Bird();
    await bird.init();

    pipe = new Pipe();
    await pipe.init(renderer.height);
  }
  function update() {
    pipe.update();

    if (pipe.x < -pipe.width) {
      pipe.reset();
    }

    bird.update();

    if (bird.y + bird.height > renderer.height) {
      currentState = "GAME_OVER";
      console.log("Game Over!");
    }
  }
  function draw() {
    renderer.render(bird, pipe);
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
