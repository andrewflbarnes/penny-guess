const startPosition = 10;
const initialLength = 5;

export default class SnakeEngine {
  constructor(tiles, drawer) {
    this.state = {
      renderer: drawer,
      speed: 15,
      tiles: tiles,
      backgroundColor: 'black',
      appleColor: 'red',
      snakeHeadColor: 'lime',
      snakeBodyColor: 'green',
      px: startPosition,
      py: startPosition,
      vx: 0,
      vy: 0,
      ax: 0,
      ay: 0,
      lastvx: 0,
      lastvy: 0,
      tail: initialLength,
      trail: [],
      score: 0,
      highScore: 0,
      paused: false,
    };
  }

  getState() {
    return this.state;
  }
}

SnakeEngine.prototype.resetState = function() {
  const state = this.getState();
    state.px = startPosition;
    state.py = startPosition;
    state.vx = 0;
    state.vy = 0;
    state.ax = 0;
    state.ay = 0;
    state.lastvx = 0;
    state.lastvy = 0;
    state.tail = initialLength;
    state.trail = [];
    state.score = 0;
    state.paused = false;
};

SnakeEngine.prototype.initSnakeGame = function() {
  const state = this.getState();

  state.renderer.showBoard();
  state.eventListener = (evt) => this.keyPush(evt);
  document.addEventListener("keydown", state.eventListener);
  this.resetState();
  this.spawnApple();
};

SnakeEngine.prototype.unInitSnake = function() {
  const state = this.getState();
  document.removeEventListener("keydown", state.eventListener);
  state.renderer.clearCanvas();
  state.renderer.hideBoard();
};

// Handles pressing a pause button (resetAction false) or a close/new button (resetAction true)
SnakeEngine.prototype.snakeTrigger = function(resetAction = false) {
  const state = this.getState();

  if (state.snakeInstance || (resetAction && state.paused)) {
    // Stop/pause
    clearInterval(state.snakeInstance);
    state.snakeInstance = null;
    if (resetAction) {
      this.unInitSnake();
      state.paused = false;
    } else {
      state.paused = true;
    }
  } else {
    // Start/resume
    state.paused = false;
    if (resetAction) {
      this.initSnakeGame();
    }
    state.snakeInstance = setInterval(() => this.game(), 1000 / state.speed);
  }
};

SnakeEngine.prototype.game = function() {
  this.updateSnakeState();
  this.checkAteApple();
  this.trackTailLength();

  this.drawBackground();
  this.drawApple();
  this.drawSnake();

  this.drawScores();
};

SnakeEngine.prototype.updateSnakeState = function() {
  const state = this.getState();

  state.px += state.vx;
  state.py += state.vy;
  state.lastvx = state.vx;
  state.lastvy = state.vy;

  if (state.px < 0) {
    state.px = state.tiles - 1
  }

  if (state.px > state.tiles - 1) {
    state.px = 0;
  }

  if (state.py < 0) {
    state.py = state.tiles - 1;
  }

  if (state.py > state.tiles - 1) {
    state.py = 0;
  }

  state.trail.push({x: state.px, y: state.py});
};

SnakeEngine.prototype.trackTailLength = function() {
  const state = this.getState();

  while (state.trail.length > state.tail) {
    state.trail.shift();
  }
};

SnakeEngine.prototype.tailDeath = function() {
  const state = this.getState();

  state.tail = initialLength;
  state.score = 0;
};

SnakeEngine.prototype.checkAteApple = function() {
  const state = this.getState();

  if (state.ax === state.px && state.ay === state.py) {
    state.score += state.speed;
    state.tail++;
    this.spawnApple();
  }
};

SnakeEngine.prototype.spawnApple = function() {
  const state = this.getState();

  let needNewApple = true;

  while (needNewApple) {
    needNewApple = false;

    state.ax = Math.floor(Math.random() * state.tiles);
    state.ay = Math.floor(Math.random() * state.tiles);

    for (let i = 0; i < state.trail.length; i++) {
      if (state.ax === state.trail[i].x && state.ay === state.trail[i].y) {
        needNewApple = true;
        break;
      }
    }
  }
};

SnakeEngine.prototype.drawApple = function() {
  const state = this.getState();

  this.drawTile(state.ax, state.ay, state.appleColor);
};

SnakeEngine.prototype.drawSnake = function() {
  const state = this.getState();

  for (let i = 0; i < state.trail.length; i++) {
    let color = state.snakeBodyColor;

    if (i === state.trail.length - 1) {
      color = state.snakeHeadColor;
    } else if (state.trail[i].x === state.px && state.trail[i].y === state.py) {
      this.tailDeath();
    }

    this.drawTile(state.trail[i].x, state.trail[i].y, color);
  }
};

SnakeEngine.prototype.drawScores = function() {
  const state = this.getState();

  if (state.score > state.highScore) {
    state.highScore = state.score;
  }

  state.renderer.updateHighScore(state.highScore);
  state.renderer.updateScore(state.score);
};

SnakeEngine.prototype.drawTile = function(x, y, color) {
  this.getState().renderer.drawTile(color, x, y)
};

SnakeEngine.prototype.drawBackground = function() {
  const state = this.getState();

  state.renderer.drawBackground(state.backgroundColor);
};

SnakeEngine.prototype.keyPush = function(evt) {
  const state = this.getState();

  switch (evt.keyCode) {
    case 32:
      // space
      this.snakeTrigger();
      break;
    case 37:
      // left
      if (state.lastvx === 1) {
        return;
      }
      state.vx = -1;
      state.vy = 0;
      break;
    case 38:
      // up
      if (state.lastvy === 1) {
        return;
      }
      state.vx = 0;
      state.vy = -1;
      break;
    case 39:
      // right
      if (state.lastvx === -1) {
        return;
      }
      state.vx = 1;
      state.vy = 0;
      break;
    case 40:
      // down
      if (state.lastvy === -1) {
        return;
      }
      state.vx = 0;
      state.vy = 1;
      break;
    case 81:
      // q
      this.snakeTrigger(true);
      break;
  }
};
