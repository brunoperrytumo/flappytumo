import HighscoreService from "./HighScoresService.js";

export default class Scores {
  #loader;
  #scoreLabel;
  #scoresInputElem;
  #score = 0;
  #highScoresService;

  #scores;
  #nameValue = "";

  constructor() {
    this.#loader = document.querySelector("#loader");
    this.#scoreLabel = document.querySelector("#score-label");
    this.#scoresInputElem = document.querySelector("#score-input");

    const submitButton = document.querySelector("#submit-score-button");
    submitButton.onclick = () => this.submitScore();

    const nameInput = document.querySelector("#name-input");
    nameInput.oninput = () => {
      this.#nameValue = nameInput.value;
      submitButton.className = this.#nameValue.length === 3 ? "" : "disabled";
    };
    this.#highScoresService = new HighscoreService();
  }

  async init() {
    this.showLoader();
    this.#scores = await this.#highScoresService.getHighscores();
    this.#buildScores();
    this.hideLoader();
  }

  #buildScores() {
    const scoresElem = document.querySelector(".scores");
    const leftCol = scoresElem.querySelector(".left");
    const rightCol = scoresElem.querySelector(".right");

    leftCol.innerHTML = "<label>Nome</label>";
    rightCol.innerHTML = "<label>Score</label>";

    for (let i = 0; i < 5; i++) {
      const score = this.#scores[i];
      let pElem = document.createElement("p");
      if (score.score == 0) pElem.className = "no-score";
      pElem.innerText = score?.name || "---";
      leftCol.appendChild(pElem);
      pElem = document.createElement("p");
      if (score.score == 0) pElem.className = "no-score";
      pElem.innerText = score?.score || "---";
      rightCol.appendChild(pElem);
    }
  }

  updateScore() {
    this.#score++;
    this.#scoreLabel.innerText = this.#score;
  }

  async submitScore() {
    this.showLoader();
    const res = await this.#highScoresService.submitScore(this.#nameValue, this.#score);

    if (res.success) {
      this.#scores = res.highscores;
      this.#buildScores();
      this.hideLoader();
      document.querySelector("#scores-button").click();
    } else {
      console.log(res);
    }
  }

  reset() {
    this.#score = 0;
    this.#scoreLabel.innerText = this.#score;
    this.#nameValue = "";
    this.hideScoresInput();
  }

  checkForEligibleScore() {
    if (this.#score == 0) return;
    for (let i = 0; i < this.#scores.length; i++) {
      if (this.#score > this.#scores[i].score) {
        this.showScoresInput();
        break;
      }
    }
  }

  showScoresInput() {
    this.#scoresInputElem.style.display = "flex";
  }
  hideScoresInput() {
    this.#scoresInputElem.style.display = "none";
  }

  showLoader() {
    this.#loader.style.display = "flex";
  }
  hideLoader() {
    this.#loader.style.display = "none";
  }
}
