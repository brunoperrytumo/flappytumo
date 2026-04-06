// GameUI.js
export default class GameUI {
  #gamecontrolsElem;
  #gameoverElem;

  #ammo;
  #fuel;
  #score;
  constructor() {
    this.#ammo = document.querySelector("#ammo").querySelector("h2");
    this.#fuel = document.querySelector("#fuel").querySelector("h2");
    this.#score = document.querySelector("#game-score");

    this.reset();
  }

  updateAmmo(ammo) {
    this.#ammo.innerText = ammo;
  }

  udpateFuel(fuel) {
    this.#fuel.innerText = `${Math.floor(fuel)}%`;
  }

  updateScore(score) {
    this.#score.innerText = score;
  }

  showGameOver() {}

  reset(ammo = 100, fuel = 100, score = 0) {
    this.updateAmmo(ammo);
    this.udpateFuel(fuel);
    this.updateScore(score);
  }
}
