import HighscoreService from "./HighScoresService.js";

export default class Scores {
  #scoreLabel;
  #score = 0;
  #highScoresService;
  constructor() {
    this.#scoreLabel = document.querySelector("#score-label");
    this.#highScoresService = new HighscoreService();
  }

  async init() {
    const res = await this.#highScoresService.getHighscores();
  }

  updateScore() {
    this.#score++;
    this.#scoreLabel.innerText = this.#score;
  }

  reset() {
    this.#score = 0;
    this.updateScore();
  }
}
