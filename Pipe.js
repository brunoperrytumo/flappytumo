export default class Pipe {
  image; // This will be the composite image
  x = 0;
  y = -900;
  width;
  height;

  constructor() {}

  async init(screenHeight) {
    // Pass the desired pipe height
    try {
      // Load both images
      const [pipeBodyImg, pipeTopImg] = await Promise.all([
        this.loadImage("assets/pipe.png"),
        this.loadImage("assets/pipe_top.png"),
      ]);

      // Create a single composite image
      this.image = await this.createCompositePipe(pipeBodyImg, pipeTopImg, screenHeight);
      this.width = this.image.width;
      this.height = this.image.height;

      this.reset();

      return this;
    } catch (error) {
      console.error("Failed to load pipe images:", error);
      throw error;
    }
  }

  loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  createCompositePipe(pipeBodyImg, pipeTopImg, screenHeight) {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const pipeWidth = pipeTopImg.width;
      const pipeHeight = screenHeight;
      const gapHeight = 40;
      canvas.width = pipeWidth;
      canvas.height = screenHeight;
      ctx.imageSmoothingEnabled = false;

      ctx.drawImage(
        pipeBodyImg,
        0,
        0,
        pipeBodyImg.width,
        pipeBodyImg.height,
        0,
        0,
        pipeBodyImg.width,
        pipeHeight,
      );
      ctx.drawImage(pipeTopImg, 0, 0, pipeTopImg.width, pipeTopImg.height);

      // Convert canvas to image
      canvas.toBlob((blob) => {
        const compositeImage = new Image();
        compositeImage.onload = () => resolve(compositeImage);
        compositeImage.src = URL.createObjectURL(blob);
      }, "image/png");
    });
  }

  reset() {
    // this.y = this.randomBetween(-900, -600);
    this.y = 0;
    this.x = 200;
  }

  randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  update() {
    // this.x -= 2;
  }
}
