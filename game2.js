import Submarine from "./Submarine.js";

window.onload = () => {
  const player = new Submarine("#player");

  const loop = () => {
    requestAnimationFrame(loop);
  };

  loop();
};
