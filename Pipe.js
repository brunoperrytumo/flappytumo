export default class Pipe {
  x = 0;
  y = 0;
  #gap = 80;
  #screenHeight;
  #screenWidth;
  speed = 0.6;
  width;
  height;

  upperBox;
  lowerBox;

  hasPassed = false;

  constructor() {}

  async init(screenWidth, screenHeight) {
    try {
      // Load both images
      const [pipeBodyImg, pipeCapImg] = await Promise.all([
        this.#loadImage("assets/pipe.png"),
        this.#loadImage("assets/pipe_top.png"),
      ]);

      this.width = pipeCapImg.width;
      this.height = screenHeight * 2 + this.#gap;
      this.#screenHeight = screenHeight;
      this.#screenWidth = screenWidth;

      this.image = await this.#createCompositePipe(pipeBodyImg, pipeCapImg);

      this.reset(screenWidth, -this.#screenHeight / 2);
    } catch (error) {
      console.error("Failed to load pipe images:", error);
      throw error;
    }
  }

  #loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  #createCompositePipe(pipeBodyImg, pipeCapImg) {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = this.width;
      canvas.height = this.height;
      ctx.imageSmoothingEnabled = false;

      //upper pipe
      ctx.drawImage(
        pipeBodyImg,
        0,
        0,
        pipeBodyImg.width,
        pipeBodyImg.height,
        0,
        -this.#gap / 2,
        pipeBodyImg.width,
        this.#screenHeight,
      );
      ctx.drawImage(
        pipeCapImg,
        0,
        this.#screenHeight - pipeCapImg.height - this.#gap / 2,
        pipeCapImg.width,
        pipeCapImg.height,
      );
      this.upperBox = new DOMRect(
        0,
        0,
        pipeCapImg.width,
        this.#screenHeight - this.#gap / 2,
      );

      //lower pipe
      ctx.drawImage(
        pipeBodyImg,
        0,
        0,
        pipeBodyImg.width,
        pipeBodyImg.height,
        0,
        this.#screenHeight + this.#gap / 2,
        pipeBodyImg.width,
        this.#screenHeight,
      );
      ctx.drawImage(
        pipeCapImg,
        0,
        this.#screenHeight + this.#gap / 2,
        pipeCapImg.width,
        pipeCapImg.height,
      );
      this.lowerBox = new DOMRect(
        0,
        this.#screenHeight + this.#gap / 2,
        pipeCapImg.width,
        this.#screenHeight,
      );

      canvas.toBlob((blob) => {
        const compositeImage = new Image();
        compositeImage.onload = () => resolve(compositeImage);
        compositeImage.src = URL.createObjectURL(blob);
      }, "image/png");
    });
  }

  reset(xPos, yPos) {
    this.x = xPos;
    this.y = yPos;

    this.upperBox.x = this.lowerBox.x = this.x;
    this.upperBox.y = this.y;
    this.lowerBox.y = this.y + this.#screenHeight + this.#gap / 2;

    this.hasPassed = false;
  }

  update() {
    this.x -= this.speed;
    this.upperBox.x = this.lowerBox.x = this.x;

    if (this.x < -this.width) {
      const y = this.randomNum(this.#gap, this.#screenHeight - this.#gap);
      this.reset(this.#screenWidth, y - this.#screenHeight);
    }
  }

  randomNum(min, max) {
    return Math.random() * (max - min) + min;
  }
}
