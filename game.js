import Satelite from "./Satelite.js";

window.onload = async () => {
  const player = new Satelite();
  await player.init("assets/satelite.png");

  const loop = () => {
    player.update();

    requestAnimationFrame(loop);
  };

  loop();
};
