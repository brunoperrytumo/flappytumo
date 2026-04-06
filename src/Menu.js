export default class Menu {
  state = "menu";
  #element;
  constructor() {
    this.#element = document.querySelector("#menu");
    document.querySelector("#play-button").onclick = () => (this.state = "game");
    document.querySelector("#scores-button").onclick = () => (this.state = "scores");
  }

  reset() {
    this.state = "menu";
  }

  show() {
    this.#element.style.display = "flex";
  }
  hide() {
    this.#element.style.display = "none";
    this.reset();
  }
}
