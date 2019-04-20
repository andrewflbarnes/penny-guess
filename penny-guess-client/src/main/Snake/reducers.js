import { combineReducers } from 'redux';
import {
  SNAKE_GAME_TICK,
  SNAKE_GAME_COLOUR_UPDATE,
  SNAKE_GAME_SPEED_UPDATE,
  SNAKE_GAME_VELOCITY_UPDATE,
  SNAKE_GAME_PAUSE,
  SNAKE_GAME_UNPAUSE,
  SNAKE_GAME_DISPLAY,
  SNAKE_GAME_DEATH,
  SNAKE_SUBMIT_DISPLAY,
  SNAKE_SUBMIT_NAME_UPDATE,
} from './action_names';
import SCHEMES from "./schemes";

function spawnApple(trail, tiles) {
  let needNewApple = true;
  let ax, ay;

  while (needNewApple) {
    needNewApple = false;

    ax = Math.floor(Math.random() * tiles);
    ay = Math.floor(Math.random() * tiles);

    for (let i = 0; i < trail.length; i++) {
      if (ax === trail[i].x && ay === trail[i].y) {
        needNewApple = true;
        break;
      }
    }
  }

  return { ax, ay }
}

const startPosition = 10;
const initialLength = 5;
const startSpeed = 15;
const initialTiles = 20;
const { ax, ay } = spawnApple([], initialTiles);

const initialStateGame = {
  tick: 0,
  colorScheme: SCHEMES.classic,
  snakeState: {
    tiles: initialTiles,
    speed: startSpeed,
    highScore: 0,
    px: startPosition,
    py: startPosition,
    vx: 1,
    vy: 0,
    ax,
    ay,
    lastvx: 0,
    lastvy: 0,
    tail: initialLength,
    trail: [],
    score: 0,
    death: false,
  },
  interval: undefined,
  showSnake: true,
};

function game(state = initialStateGame, action) {
  const { interval, tick, snakeState } = state;
  let { px, py, ax, ay, vx, vy, lastvx, lastvy, trail,
    tail, score, highScore, tiles, speed, death } = snakeState;

  switch (action.type) {
    case SNAKE_GAME_COLOUR_UPDATE:
      return {
        ...state,
        colorScheme: action.colorScheme
      };
    case SNAKE_GAME_DISPLAY:
      return {
        ...state,
        showSnake: action.display
      };
    case SNAKE_GAME_VELOCITY_UPDATE:
      const { velocity } = action;

      if ((lastvx === 1 && velocity.vx === -1) ||
        (lastvx === -1 && velocity.vx === 1) ||
        (lastvy === 1 && velocity.vy === -1) ||
        (lastvy === -1 && velocity.vy === 1)) {
        return state;
      }

      return {
        ...state,
        snakeState: {
          ...snakeState,
          vx: velocity.vx,
          vy: velocity.vy,
        },
      };
    case SNAKE_GAME_SPEED_UPDATE:
      trail.forEach(t => newTrail.push({x:t.x, y:t.y}));

      return {
        ...state,
        snakeState: {
          ...snakeState,
          speed: action.speed,
        },
      };
    case SNAKE_GAME_DEATH:
      return {
        ...state,
        snakeState: {
          ...snakeState,
          tail: initialLength,
          score: 0,
          trail: [],
          death: false,
        },
      };
    case SNAKE_GAME_TICK:
      const nextTick = tick + 1;

      const newTrail = [];
      trail.forEach(t => newTrail.push({x:t.x, y:t.y}));

      //update position
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

      newTrail.push({x: px, y: py});

      // check ate apple
      if (ax === px && ay === py) {
        score += speed;
        if (score > highScore) {
          highScore = score;
        }
        tail += 1;
        ({ ax: ax, ay: ay } = spawnApple(newTrail, tiles));
      }

      // track tail length
      while (newTrail.length > tail) {
        newTrail.shift();
      }

      // check cannibal
      const length = newTrail.length - 1;

      for (let i = 0; i <= length; i++) {
        if (i !== length && newTrail[i].x === newTrail[length].x && newTrail[i].y === newTrail[length].y) {
          death = true;
        }
      }

      return {
        ...state,
        tick: nextTick,
        snakeState: {
          ...snakeState,
          trail: newTrail,
          px, py, ax, ay, vx, vy, lastvx, lastvy,
          tail, score, highScore, tiles, speed, death
        },
      };
    case SNAKE_GAME_PAUSE:
      if (interval) {
        clearInterval(interval);
      }

      return {
        ...state,
        interval: undefined
      };
    case SNAKE_GAME_UNPAUSE:
      if (interval) {
        // TODO error
        clearInterval(interval);
      }

      return {
        ...state,
        interval: action.interval
      };
    default:
      return state;
  }
}

const initialStateSubmit = {
  name: '',
  showSubmit: false,
  score: 0,
};

function submit(state = initialStateSubmit, action) {
  switch (action.type) {
    case SNAKE_SUBMIT_DISPLAY:
      return {
        ...state,
        showSubmit: action.display,
        score: action.score,
      };
    case SNAKE_SUBMIT_NAME_UPDATE:
      return {
        ...state,
        name: action.name
      };
    default:
      return state;
  }
}

const snake = combineReducers({
  game,
  submit,
});

export default snake;
