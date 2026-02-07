window.onload = async function () {
  //MAIN MENU STUFF
  let playButton;
  let scoresButton;
  function setupLayout() {
    playButton = document.querySelector("#play-button");
    scoresButton = document.querySelector("#scores-button");

    playButton.onclick = function () {
      console.log("click");
    };
  }
  function update() {}
  function draw() {}

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  setupLayout();
  loop();
};
