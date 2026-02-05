window.onload = async function () {
  let canvas = document.querySelector("canvas");
  let ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  let birdBitmap;

  window.onresize = function () {
    const w = window.innerWidth;
    const h = window.innerHeight;

    console.log(document.body.clientWidth);
    canvas.width = w < 540 ? w : 540;
    canvas.height = h < 900 ? h : 900;

    setTimeout(() => {
      console.log("w", window.innerWidth);
    }, 1000);
  };

  async function loadData() {
    const req = await fetch("assets/flappy_bird.png");
    const blob = await req.blob();
    const img = new Image();

    birdBitmap = await createImageBitmap(blob);
  }
  function update() {}
  function draw() {
    ctx.drawImage(birdBitmap, 0, 0, birdBitmap.width, birdBitmap.height);
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  window.onresize();
  await loadData();

  loop();
};
