export default class Character {
  x = 0;
  y = 0;
  r = 0;
  s = 1;

  image;

  constructor(x = 0, y = 0, r = 0, s = 1) {
    this.x = x;
    this.y = y;
    this.r = `${r}deg`;
    this.s = s;
  }

  translateX(val) {
    this.x += val;
  }
  translateY(val) {
    this.y += val;
  }
  rotate(angle) {
    this.r = `${angle}deg`;
  }
  scale(val) {
    this.s = val;
  }
}
