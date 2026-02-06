window.onload = async function () {
  let canvas = document.querySelector("canvas");
  let ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  let bird = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    bitmap: null,
  };

  window.onresize = function () {
    const w = document.body.clientWidth;
    const h = document.body.clientHeight;

    canvas.width = w < 540 ? w : 540;
    canvas.height = h < 900 ? h : 900;
  };

  async function loadData() {
    const req = await fetch("assets/flappy_bird.png");
    const blob = await req.blob();

    bird.bitmap = await createImageBitmap(blob);
    bird.w = bird.bitmap.width;
    bird.h = bird.bitmap.height;
  }
  function update() {
    bird.y += 1;
  }
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bird.bitmap, bird.x, bird.y, bird.w, bird.h);
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
