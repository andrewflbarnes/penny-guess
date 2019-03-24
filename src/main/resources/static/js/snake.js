const initialLength = 5;
// Speed also defines the score per apple
const speed = 15;
const startPosition = 10;
const tiles = 20;
let canvasSize;
let tileSize;

let highScore = 0;
let score;

let snakeGame;
let scoreElement;
let highScoreElement;
let canvas;
let ctx;

let trail;
let px;
let py;
let vx;
let vy;
let lastvx;
let lastvy;
let ax;
let ay;
let tail;
let snakeInstance;
let paused;

function initSnake() {
  snakeGame = document.getElementById('snake-game');
  scoreElement = document.getElementById('snake-score');
  highScoreElement = document.getElementById('snake-high-score');
  canvas = document.getElementById('snake');
  ctx = canvas.getContext('2d');

  canvasSize = canvas.width;
  tileSize = canvasSize / tiles;
}

function initSnakeGame() {
  //position
  px = startPosition;
  py = startPosition;
  // velocity
  vx = 0;
  vy = 0;
  // last velocity - helps with rapid multiple key presses
  lastvx = 0;
  lastvy = 0;
  // snake length
  tail = initialLength;
  trail = [];
  // state interval tracker
  snakeInstance = null;
  // score
  score = 0;
  paused = false;
  snakeGame.style.visibility = 'visible';
  document.addEventListener("keydown", keyPush);
  spawnApple();
}

function unInitSnake() {
  document.removeEventListener("keydown", keyPush);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snakeGame.style.visibility = 'hidden';
}

// Handles pressing a pause button (resetAction false) or a close/new button (resetAction true)
function snakeTrigger(resetAction = false) {
  if (snakeInstance || (resetAction && paused)) {
    // Stop/pause
    clearInterval(snakeInstance);
    snakeInstance = null;
    if (resetAction) {
      unInitSnake();
      paused = false;
    } else {
      paused = true;
    }
  } else {
    // Start/resume
    paused = false;
    if (resetAction) {
      initSnakeGame();
    }
    snakeInstance = setInterval(game, 1000 / speed);
  }
}

function game() {
  updateSnakeState();
  checkAteApple();
  trackTailLength();

  drawBackground();
  drawApple();
  drawSnake();

  updateScores();
}

function updateSnakeState() {
  px += vx;
  py += vy;
  lastvx = vx;
  lastvy = vy;

  if (px < 0) {
    px = tiles - 1
  }

  if (px > tiles - 1) {
    px = 0;
  }

  if (py < 0) {
    py = tiles - 1;
  }

  if (py > tiles - 1) {
    py = 0;
  }
}

function drawBackground() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawApple() {
  drawTile(ax, ay, 'red');
}

function drawSnake() {
  for (let i = 0; i < trail.length; i++) {
    let color = 'lime';

    if (i === trail.length - 1) {
      color = 'green';
    } else if (trail[i].x === px && trail[i].y === py) {
      tailDeath();
    }

    drawTile(trail[i].x, trail[i].y, color);
  }
}

function drawTile(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * tileSize + 1, y * tileSize + 1, tileSize - 2, tileSize - 2);
}

function trackTailLength() {
  trail.push({x: px, y: py});

  while (trail.length > tail) {
    trail.shift();
  }
}

function updateScores() {
  scoreElement.innerHTML = score;
  if (score > highScore) {
    highScore = score;
    highScoreElement.innerHTML = highScore;
  }
}

function tailDeath() {
  tail = initialLength;
  score = 0;
}

function checkAteApple() {
  if (ax === px && ay === py) {
    score += speed;
    tail++;
    spawnApple();
  }
}

function spawnApple() {
  let needNewApple = true;

  while (needNewApple) {
    needNewApple = false;

    ax = Math.floor(Math.random() * tiles);
    ay = Math.floor(Math.random() * tiles);

    for (let i = 0; i < trail.length; i++) {
      if (ax === trail[i].x && trail[i].y === py) {
        needNewApple = true;
        break;
      }
    }
  }
}

function keyPush(evt) {
  switch (evt.keyCode) {
    case 32:
      // space
      snakeTrigger();
      break;
    case 37:
      // left
      if (lastvx === 1) {
        return;
      }
      vx = -1;
      vy = 0;
      break;
    case 38:
      // up
      if (lastvy === 1) {
        return;
      }
      vx = 0;
      vy = -1;
      break;
    case 39:
      // right
      if (lastvx === -1) {
        return;
      }
      vx = 1;
      vy = 0;
      break;
    case 40:
      // down
      if (lastvy === -1) {
        return;
      }
      vx = 0;
      vy = 1;
      break;
    case 81:
      // q
      snakeTrigger(true);
      break;
  }
}
