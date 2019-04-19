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
import SnakeEngine from "./components/SnakeEngine";
import SCHEMES from "./schemes";

// TODO
const snakeEngine = new SnakeEngine(20, 15);

const initialStateGame = {
  tick: 0,
  colorScheme: SCHEMES.classic,
  snakeEngine,
  interval: {},
  showSnake: true,
};

function game(state = initialStateGame, action) {
  const { interval, tick, snakeEngine } = state;

  switch (action.type) {
    case SNAKE_GAME_COLOUR_UPDATE:
      return {
        ...snake,
        colorScheme: action.colorScheme
      };
    case SNAKE_GAME_DISPLAY:
      return {
        ...snake,
        showSnake: action.display
      };
    case SNAKE_GAME_VELOCITY_UPDATE:
      snakeEngine.updateVelocities(action.velocity);
      return state;
    case SNAKE_GAME_SPEED_UPDATE:
      return {
        ...state,
        speed: action.speed,
      };
    case SNAKE_GAME_DEATH:
      snakeEngine.tailDeath();
      return state;
    case SNAKE_GAME_TICK:
      snakeEngine.game();
      const nextTick = tick + 1;
      const { score, highScore } = snakeEngine;

      return {
        ...state,
        tick: nextTick,
        score,
        highScore,
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
};

function submit(state = initialStateSubmit, action) {
  switch (action.type) {
    case SNAKE_SUBMIT_DISPLAY:
      return {
        ...snake,
        showSubmit: action.display
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
