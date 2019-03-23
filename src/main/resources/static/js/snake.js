const initialLength = 5;
const speed = 15;

let canvas;
let ctx;

let trail;
let px;
let py;
let vx;
let vy;
let lastvx;
let lastvy;
let tc;
let gs;
let ax;
let ay;
let tail;
let snakeInstance;
let score;
let highScore;
let paused;

function getSnakeCanvas() {
  canvas = document.getElementById('snake');
  ctx = canvas.getContext('2d');
}

function initSnake() {
  //position
  px = 10;
  py = 10;
  // velocity
  vx = 0;
  vy = 0;
  // last velocity - helps with rapid multiple key presses
  lastvx = 0;
  lastvy = 0;
  // tile count and tile size
  tc = 20;
  gs = 20;
  // apple
  ax = 15;
  ay = 15;
  // snake length
  tail = initialLength;
  trail = [];
  // state interval tracker
  snakeInstance = null;
  // score
  score = 0;
  highScore = 0;
  paused = false;
  document.addEventListener("keydown", keyPush);
}

function unInitSnake() {
  document.removeEventListener("keydown", keyPush);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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
      initSnake();
    }
    snakeInstance = setInterval(game, 1000/speed);
  }
}

function game() {
  px += vx;
  py += vy;
  lastvx = vx;
  lastvy = vy;

  if (px < 0) {
    px = tc -1
  }

  if (px > tc - 1) {
    px = 0;
  }

  if (py < 0) {
    py = tc -1;
  }

  if (py > tc - 1) {
    py = 0;
  }

  ctx.fillStyle='black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle='red';
  ctx.fillRect(ax * gs, ay * gs, gs - 2, gs - 2 );

  ctx.fillStyle='lime';
  for (let i = 0; i < trail.length; i++) {
    ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs - 2, gs - 2 );
    if (trail[i].x === px && trail[i].y === py) {
      tail = initialLength;
    }
  }

  if (ax === px && ay === py) {
    tail++;
    let needNewApple = true;
    while (needNewApple) {
      newApple();
      needNewApple = false;
      for (let i = 0; i < trail.length; i++) {
        if (ax === px && ay === py) {
          needNewApple = true;
          break;
        }
      }
    }
  }

  trail.push({x: px, y: py});
  while (trail.length > tail) {
    trail.shift();
  }
}

function newApple() {
  ax = Math.floor(Math.random()*tc);
  ay = Math.floor(Math.random()*tc);
}

function keyPush(evt) {
  switch (evt.keyCode) {
    case 32:
      snakeTrigger();
      break;
    case 37:
      if (lastvx === 1) {
        return;
      }
      vx = -1;
      vy = 0;
      break;
    case 38:
      if (lastvy === 1) {
        return;
      }
      vx = 0;
      vy = -1;
      break;
    case 39:
      if (lastvx === -1) {
        return;
      }
      vx = 1;
      vy = 0;
      break;
    case 40:
      if (lastvy === -1) {
        return;
      }
      vx = 0;
      vy = 1;
      break;
    case 81:
      snakeTrigger(true);
      break;
  }
}
