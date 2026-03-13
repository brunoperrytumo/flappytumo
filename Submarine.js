import Character from "./Character.js";

export default class Submarine extends Character {
  constructor(elemID) {
    super();

    this.image = document.querySelector(elemID);
  }
}
