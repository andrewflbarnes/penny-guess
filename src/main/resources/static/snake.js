const initialLength = 5;
const speed = 15;

let px = 10;
let py = 10;
let vx = 0;
let vy = 0;
let lastvx = 0;
let lastvy = 0;
let tc = 20;
let gs = 20;
let ax = 15;
let ay = 15;
let canvas;
let ctx;
let trail = [];
let tail = initialLength;

function snake() {

  canvas = document.getElementById('snake');
  ctx = canvas.getContext('2d');
  document.addEventListener("keydown", keyPush);
  setInterval(game, 1000/speed);

}

function game() {
  console.log({px, py, vx, vy, ax, ay, gs, tc, tail, trail});
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
    case 40 :
      if (lastvy === -1) {
        return;
      }
      vx = 0;
      vy = 1;
      break;
  }
}
