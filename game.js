window.onload = async function () {
  let canvas = document.querySelector("canvas");
  let ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  let bird = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    bitmap: null,
  };

  window.onresize = function () {
    const w = document.body.clientWidth;
    const h = document.body.clientHeight;

    canvas.width = w < 540 ? w : 540;
    canvas.height = h < 900 ? h : 900;
  };

  async function loadData() {
    const req = await fetch("assets/tumo_bird.png");
    const blob = await req.blob();

    bird.bitmap = await createImageBitmap(blob);
    bird.width = 64;
    bird.height = 64;
  }
  function update() {
    bird.y += 1;
  }
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bird.bitmap, bird.x, bird.y, bird.width, bird.height);
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  await loadData();
  window.onresize();
  loop();
};
