export default class Screen {
  element;
  state;

  constructor(elementID) {
    this.element = document.querySelector(`#${elementID}`);
    this.state = elementID;
  }

  reset() {}

  show() {
    this.element.style.display = "flex";
  }
  hide() {
    this.element.style.display = "none";
  }
}
