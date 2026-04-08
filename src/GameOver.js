import Screen from "./Screen.js";

export default class GameOver extends Screen {
  #highscoreContainer;
  #nameInput;

  #retryButton;
  #homeButton;
  #sendButton;
  constructor() {
    super("gameover");

    this.#retryButton = document.querySelector("#retry-button");
    this.#homeButton = document.querySelector("#home-button");

    this.#retryButton.onclick = () => (this.state = "game");
    this.#homeButton.onclick = () => (this.state = "menu");

    this.#highscoreContainer = document.querySelector("#highscore");
    this.#sendButton = document.querySelector("#send-button");
    this.#nameInput = document.querySelector("#name-input");

    this.#nameInput.oninput = () => {
      this.#sendButton.className = this.#nameInput.value.length < 3 ? "disabled" : "";
    };
  }

  reset() {
    this.state = "gameover";
    this.#highscoreContainer.style.display = "none";
    this.#nameInput.value = "";
    this.#sendButton.className = "disabled";
    this.#retryButton.className = "";
    this.#homeButton.className = "";
  }

  show(scores, score) {
    super.show();

    if (scores.isEligible(score)) {
      this.#highscoreContainer.style.display = "flex";
      this.#highscoreContainer.querySelector("h3").innerText = `New Highscore: ${score}`;

      this.#sendButton.onclick = async () => {
        this.#retryButton.className = "disabled";
        this.#homeButton.className = "disabled";
        this.#sendButton.className = "disabled";
        const res = await scores.submitScore(this.#nameInput.value, score);
        scores.setHighscores(res.highscores);
        this.state = "scores";
      };
    }
  }

  hide() {
    super.hide();
    this.reset();
  }
}
