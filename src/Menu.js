import Screen from "./Screen.js";

export default class Menu extends Screen {
  constructor() {
    super("menu");
    document.querySelector("#play-button").onclick = () => (this.state = "game");
    document.querySelector("#scores-button").onclick = () => (this.state = "scores");
  }

  reset() {
    this.state = "menu";
  }

  hide() {
    super.hide();
    this.reset();
  }
}
