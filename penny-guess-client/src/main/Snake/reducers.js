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
import SnakeEngine from "./engine/SnakeEngine";
import SCHEMES from "./schemes";

/*
NOTE: Classes are note serialised well in react-redux. In order to correctly track the state
of the snakeEngine we convert it to a more "pure" object using this method which.

ALL access to the state of the snake engine should be made through the snakeState object.
The snakeEngine should be used for updating internal state by THIS reducer after which
it should be converted and stored using this method again.

The snakeEngine must NOT be included in the state as this causes replay issues in the redux
dev tools
 */
function engineAsState(engine) {
  return Object.assign({}, {...engine, trail: engine.trail.map(e => e)})
}

// TODO
const snakeEngine = new SnakeEngine(20, 15);

const initialStateGame = {
  tick: 0,
  colorScheme: SCHEMES.classic,
  snakeState: engineAsState(snakeEngine),
  interval: undefined,
  showSnake: true,
};

function game(state = initialStateGame, action) {
  const { interval, tick, snakeState } = state;

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
      snakeEngine.syncState(snakeState);
      snakeEngine.updateVelocities(action.velocity);

      return {
        ...state,
        snakeState: engineAsState(snakeEngine),
      };
    case SNAKE_GAME_SPEED_UPDATE:
      snakeEngine.syncState(snakeState);
      snakeEngine.setSpeed(action.speed);

      return {
        ...state,
        snakeState: engineAsState(snakeEngine),
      };
    case SNAKE_GAME_DEATH:
      snakeEngine.syncState(snakeState);
      snakeEngine.tailDeath();

      return {
        ...state,
        snakeState: engineAsState(snakeEngine),
      };
    case SNAKE_GAME_TICK:
      snakeEngine.syncState(snakeState);
      snakeEngine.game();
      const nextTick = tick + 1;

      return {
        ...state,
        tick: nextTick,
        snakeState: engineAsState(snakeEngine),
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
