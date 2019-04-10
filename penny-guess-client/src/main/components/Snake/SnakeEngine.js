const startPosition = 10;
const initialLength = 5;

export default class SnakeEngine {

  constructor(tiles, options) {
    options = options || {};

    this.tiles = tiles;
    this.speed = options.speed || 15;
    this.highScore = 0;
    this.initSnakeGame();
  }

  resetState() {
    this.px = startPosition;
    this.py = startPosition;
    this.vx = 1;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.lastvx = 0;
    this.lastvy = 0;
    this.tail = initialLength;
    this.trail = [];
    this.score = 0;
  }

  initSnakeGame() {
    this.resetState();
    this.spawnApple();
  }

  game() {
    this.updateSnakeState();
    this.checkAteApple();
    this.trackTailLength();
  }

  updateSnakeState() {
    this.px += this.vx;
    this.py += this.vy;
    this.lastvx = this.vx;
    this.lastvy = this.vy;

    if (this.px < 0) {
      this.px = this.tiles - 1
    }

    if (this.px > this.tiles - 1) {
      this.px = 0;
    }

    if (this.py < 0) {
      this.py = this.tiles - 1;
    }

    if (this.py > this.tiles - 1) {
      this.py = 0;
    }

    this.trail.push({x: this.px, y: this.py});
  }

  trackTailLength() {
    while (this.trail.length > this.tail) {
      this.trail.shift();
    }
  }

  tailDeath() {
    this.tail = initialLength;
    this.score = 0;
  }

  checkAteApple() {
    if (this.ax === this.px && this.ay === this.py) {
      this.score += this.speed;
      if (this.score > this.highScore) {
        this.highScore = this.score;
      }
      this.tail++;
      this.spawnApple();
    }
  }

  spawnApple() {
    let needNewApple = true;

    while (needNewApple) {
      needNewApple = false;

      this.ax = Math.floor(Math.random() * this.tiles);
      this.ay = Math.floor(Math.random() * this.tiles);

      for (let i = 0; i < this.trail.length; i++) {
        if (this.ax === this.trail[i].x && this.ay === this.trail[i].y) {
          needNewApple = true;
          break;
        }
      }
    }
  }

  updateVelocities({ vx, vy }) {
    if ((this.lastvx === 1 && vx === -1) ||
      (this.lastvx === -1 && vx === 1) ||
      (this.lastvy === 1 && vy === -1) ||
      (this.lastvy === -1 && vy === 1)) {
      return;
    }

    this.vx = vx;
    this.vy = vy;
  }
}