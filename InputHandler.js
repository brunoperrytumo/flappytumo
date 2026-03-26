// InputHandler.js
export default class InputHandler {
  held = { left: false, right: false };

  constructor() {
    const leftBtn = document.getElementById("left-button");
    const rightBtn = document.getElementById("right-button");

    this.#registerButton(leftBtn, "left");
    this.#registerButton(rightBtn, "right");
    this.#registerKeyboard();
  }

  #registerButton(btn, direction) {
    const start = () => (this.held[direction] = true);
    const stop = () => (this.held[direction] = false);

    btn.addEventListener("mousedown", start);
    btn.addEventListener("mouseup", stop);
    btn.addEventListener("mouseleave", stop);
    btn.addEventListener("touchstart", start, { passive: true });
    btn.addEventListener("touchend", stop);
    btn.addEventListener("touchcancel", stop);
  }

  #registerKeyboard() {
    const map = {
      ArrowLeft: "left",
      a: "left",
      ArrowRight: "right",
      d: "right",
    };

    window.addEventListener("keydown", (e) => {
      if (map[e.key]) this.held[map[e.key]] = true;
    });
    window.addEventListener("keyup", (e) => {
      if (map[e.key]) this.held[map[e.key]] = false;
    });
  }

  isButtonDown(button) {
    return this.held[button];
  }

  isKeyDown(key) {
    return this.held[key];
  }
}
