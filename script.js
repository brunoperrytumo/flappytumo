// game.js
import Renderer from "./src/Renderer.js";
import InputHandler from "./src/InputHandler.js";
import Background from "./src/Background.js";

import Game from "./src/Game.js";
import Menu from "./src/Menu.js";
import Scores from "./src/Scores.js";
import GameOver from "./src/GameOver.js";

window.onload = async () => {
  const gameScreens = {
    MENU: "menu",
    GAME: "game",
    SCORES: "scores",
    GAMEOVER: "gameover",
  };
  let currentScreen = gameScreens.GAMEOVER;

  const menu = new Menu();
  const scores = new Scores();
  await scores.init();

  const game = new Game();
  await game.init();

  const gameover = new GameOver();

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

    switch (currentScreen) {
      case gameScreens.MENU:
        currentScreen = menu.state;
        if (currentScreen == gameScreens.GAME) {
          menu.hide();
          game.show();
        } else if (currentScreen == gameScreens.SCORES) {
          menu.hide();
          scores.show();
        }
        break;
      case gameScreens.GAME:
        currentScreen = game.state;
        if (currentScreen == gameScreens.GAMEOVER) {
          gameover.show(scores, game.score);
          game.hide();
        } else {
          game.update(input, dt);
          game.render(renderer);
        }

        break;
      case gameScreens.SCORES:
        currentScreen = scores.state;
        if (currentScreen == gameScreens.MENU) {
          scores.hide();
          menu.show();
        }
        break;
      case gameScreens.GAMEOVER:
        currentScreen = gameover.state;
        if (currentScreen == gameScreens.MENU) {
          gameover.hide();
          menu.show();
        } else if (currentScreen == gameScreens.GAME) {
          gameover.hide();
          game.show();
        }
        break;
    }

    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);
};
