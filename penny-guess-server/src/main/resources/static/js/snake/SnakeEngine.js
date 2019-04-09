const startPosition = 10;
const initialLength = 5;

function SnakeEngine(tiles, renderer, options) {

  options = options || {};

  this.tiles = tiles;
  this.renderer = renderer;
  this.backgroundColor = options.bgColor || 'black';
  this.appleColor = options.appleColor || 'red';
  this.snakeHeadColor = options.snakeHeadColor || 'lime';
  this.snakeBodyColor = options.snakeBodyColor || 'green';
  this.speed = options.speed || 15;
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
  this.highScore = 0;
  this.paused = false;
}

SnakeEngine.prototype.setColorScheme = function(scheme) {
  const self = this;
  scheme = scheme || {};

  self.backgroundColor = scheme.bgColor || self.options.backgroundColor;
  self.appleColor = scheme.appleColor || self.appleColor;
  self.snakeHeadColor = scheme.snakeHeadColor || self.snakeHeadColor;
  self.snakeBodyColor = scheme.snakeBodyColor || self.snakeBodyColor;
};

SnakeEngine.prototype.resetState = function() {
  const self = this;

  self.px = startPosition;
  self.py = startPosition;
  self.vx = 1;
  self.vy = 0;
  self.ax = 0;
  self.ay = 0;
  self.lastvx = 0;
  self.lastvy = 0;
  self.tail = initialLength;
  self.trail = [];
  self.score = 0;
  self.paused = false;
};

SnakeEngine.prototype.initSnakeGame = function() {
  const self = this;

  self.renderer.showBoard();
  self.eventListener = function(evt) {self.keyPush(evt)};
  document.addEventListener("keydown", self.eventListener);
  self.resetState();
  self.spawnApple();
};

SnakeEngine.prototype.unInitSnake = function() {
  const self = this;

  document.removeEventListener("keydown", self.eventListener);
  self.renderer.clearCanvas();
  self.renderer.hideBoard();
};

// Handles pressing a pause button (resetAction false) or a close/new button (resetAction true)
SnakeEngine.prototype.snakeTrigger = function(resetAction = false) {
  const self = this;

  if (self.snakeInstance || (resetAction && self.paused)) {
    // Stop/pause
    clearInterval(self.snakeInstance);
    self.snakeInstance = null;
    if (resetAction) {
      self.unInitSnake();
      self.paused = false;
    } else {
      self.paused = true;
    }
  } else {
    // Start/resume
    self.paused = false;
    if (resetAction) {
      self.initSnakeGame();
    }

    self.snakeInstance = setInterval(function() {self.game()}, 1000 / self.speed);
  }
};

SnakeEngine.prototype.game = function() {
  const self = this;

  self.updateSnakeState();
  self.checkAteApple();
  self.trackTailLength();

  self.drawBackground();
  self.drawApple();
  self.drawSnake();

  self.drawScores();
};

SnakeEngine.prototype.updateSnakeState = function() {
  const self = this;

  self.px += self.vx;
  self.py += self.vy;
  self.lastvx = self.vx;
  self.lastvy = self.vy;

  if (self.px < 0) {
    self.px = self.tiles - 1
  }

  if (self.px > self.tiles - 1) {
    self.px = 0;
  }

  if (self.py < 0) {
    self.py = self.tiles - 1;
  }

  if (self.py > self.tiles - 1) {
    self.py = 0;
  }

  self.trail.push({x: self.px, y: self.py});
};

SnakeEngine.prototype.trackTailLength = function() {
  const self = this;

  while (self.trail.length > self.tail) {
    self.trail.shift();
  }
};

SnakeEngine.prototype.tailDeath = function() {
  const self = this;

  self.tail = initialLength;
  self.score = 0;

  renderer.showSubmitScore();
  renderer.hideBoard();
};

SnakeEngine.prototype.checkAteApple = function() {
  const self = this;

  if (self.ax === self.px && self.ay === self.py) {
    self.score += self.speed;
    self.tail++;
    self.spawnApple();
  }
};

SnakeEngine.prototype.spawnApple = function() {
  const self = this;

  let needNewApple = true;

  while (needNewApple) {
    needNewApple = false;

    self.ax = Math.floor(Math.random() * self.tiles);
    self.ay = Math.floor(Math.random() * self.tiles);

    for (let i = 0; i < self.trail.length; i++) {
      if (self.ax === self.trail[i].x && self.ay === self.trail[i].y) {
        needNewApple = true;
        break;
      }
    }
  }
};

SnakeEngine.prototype.drawApple = function() {
  const self = this;

  self.drawTile(self.ax, self.ay, self.appleColor);
};

SnakeEngine.prototype.drawSnake = function() {
  const self = this;

  for (let i = 0; i < self.trail.length; i++) {
    let color = self.snakeBodyColor;

    if (i === self.trail.length - 1) {
      color = self.snakeHeadColor;
    } else if (self.trail[i].x === self.px && self.trail[i].y === self.py) {
      self.tailDeath();
    }

    self.drawTile(self.trail[i].x, self.trail[i].y, color);
  }
};

SnakeEngine.prototype.drawScores = function() {
  const self = this;

  if (self.score > self.highScore) {
    self.highScore = self.score;
  }

  self.renderer.updateHighScore(self.highScore);
  self.renderer.updateScore(self.score);
};

SnakeEngine.prototype.drawTile = function(x, y, color) {
  const self = this;

  self.renderer.drawTile(color, x, y)
};

SnakeEngine.prototype.drawBackground = function() {
  const self = this;

  self.renderer.drawBackground(self.backgroundColor, self.snakeHeadColor);
};

SnakeEngine.prototype.keyPush = function(evt) {
  const self = this;

  switch (evt.keyCode) {
    case 32:
      // space
      self.snakeTrigger();
      break;
    case 37:
      // left
      if (self.lastvx === 1) {
        return;
      }
      self.vx = -1;
      self.vy = 0;
      break;
    case 38:
      // up
      if (self.lastvy === 1) {
        return;
      }
      self.vx = 0;
      self.vy = -1;
      break;
    case 39:
      // right
      if (self.lastvx === -1) {
        return;
      }
      self.vx = 1;
      self.vy = 0;
      break;
    case 40:
      // down
      if (self.lastvy === -1) {
        return;
      }
      self.vx = 0;
      self.vy = 1;
      break;
    case 81:
      // q
      self.snakeTrigger(true);
      break;
  }
};
