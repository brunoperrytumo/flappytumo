// game.js
import Renderer from "./src/Renderer.js";
import InputHandler from "./src/InputHandler.js";
import Background from "./src/Background.js";

import Game from "./src/Game.js";
import Menu from "./src/Menu.js";
import Scores from "./src/Scores.js";

window.onload = async () => {
  const gameStates = {
    MENU: "menu",
    GAME: "game",
    SCORES: "scores",
  };
  let currentState = gameStates.MENU;

  const menu = new Menu();
  const scores = new Scores();
  await scores.init();

  const game = new Game();
  await game.init();

  const renderer = new Renderer();
  const input = new InputHandler();
  const background = new Background();

  await background.init();

  let lastTime = performance.now();

  const loop = (timestamp) => {
    const dt = Math.min((timestamp - lastTime) / 1000, 0.05);
    lastTime = timestamp;

    // --- Render ---
    renderer.reset();
    renderer.renderBackground(background);

    background.update(dt);

    switch (currentState) {
      case gameStates.MENU:
        currentState = menu.state;
        if (currentState == gameStates.GAME) {
          menu.hide();
          game.show();
        } else if (currentState == gameStates.SCORES) {
          menu.hide();
          scores.show();
        }
        break;
      case gameStates.GAME:
        game.update(input, dt);
        game.render(renderer);
        break;
      case gameStates.SCORES:
        currentState = scores.state;
        if (currentState == gameStates.MENU) {
          scores.hide();
          menu.show();
        }
        break;
    }

    requestAnimationFrame(loop);
  };

  const updateGame = (dt) => {};

  requestAnimationFrame(loop);
};
