const startPosition = 10;
const initialLength = 5;

export default class SnakeEngine {

  constructor(tiles, speed = 25) {

    this.tiles = tiles;
    this.speed = speed;
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
    this.death = false;
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  initSnakeGame() {
    this.resetState();
    this.spawnApple();
  }

  game() {
    this.updateSnakeState();
  }

  syncState(state) {
    const { px, py, ax, ay, vx, vy, lastvx, lastvy, tail, trail, score, tiles, speed, highScore, death } = state;

    this.tiles = tiles;
    this.speed = speed;
    this.highScore = highScore;
    this.px = px;
    this.py = py;
    this.vx = vx;
    this.vy = vy;
    this.ax = ax;
    this.ay = ay;
    this.lastvx = lastvx;
    this.lastvy = lastvy;
    this.tail = tail;
    this.trail = trail;
    this.score = score;
    this.death = death;
  }

  updateSnakeState() {
    // update position
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

    // check ate apple
    if (this.ax === this.px && this.ay === this.py) {
      this.score += this.speed;
      if (this.score > this.highScore) {
        this.highScore = this.score;
      }
      this.tail += 1;
      this.spawnApple();
    }

    // track tail length
    while (this.trail.length > this.tail) {
      this.trail.shift();
    }

    // check cannibal
    const { trail } = this;
    const length = trail.length - 1;

    for (let i = 0; i <= length; i++) {
      if (i !== length && trail[i].x === trail[length].x && trail[i].y === trail[length].y) {
        this.death = true;
        return;
      }
    }
  }

  tailDeath() {
    this.tail = initialLength;
    this.score = 0;
    this.trail = [];
    this.death = false;
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
