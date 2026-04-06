import Screen from "./Screen.js";

export default class GameOver extends Screen {
  #highscoreContainer;
  #nameInput;
  #sendButton;
  constructor() {
    super("gameover");

    document.querySelector("#retry-button").onclick = () => (this.state = "game");
    document.querySelector("#home-button").onclick = () => (this.state = "menu");

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
  }

  show(scores, score) {
    super.show();

    if (scores.isEligible(score)) {
      this.#highscoreContainer.style.display = "flex";
      this.#highscoreContainer.querySelector("h3").innerText = `New Highscore: ${score}`;

      this.#sendButton.onclick = async () => {
        const res = await scores.submitScore(this.#nameInput.value, score);
        console.log(res);
      };
    }
  }

  hide() {
    super.hide();
    this.reset();
  }
}
