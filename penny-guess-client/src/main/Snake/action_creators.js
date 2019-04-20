import {
  SNAKE_GAME_COLOUR_UPDATE,
  SNAKE_GAME_TICK,
  SNAKE_GAME_SPEED_UPDATE,
  SNAKE_GAME_PAUSE,
  SNAKE_GAME_UNPAUSE,
  SNAKE_GAME_DISPLAY,
  SNAKE_GAME_DEATH,
  SNAKE_SUBMIT_DISPLAY,
  SNAKE_SUBMIT_NAME_UPDATE,
  SNAKE_GAME_VELOCITY_UPDATE,
} from "./action_names";
import api from '../api';

export function updateSnakeSpeed(speed) {
  return {
    type: SNAKE_GAME_SPEED_UPDATE,
    speed,
  }
}

export function updateSnakeVelocity(velocity) {
  return {
    type: SNAKE_GAME_VELOCITY_UPDATE,
    velocity,
  }
}

export function updateSnakeColourScheme(colorScheme) {
  return {
    type: SNAKE_GAME_COLOUR_UPDATE,
    colorScheme,
  }
}

export function tickSnake() {
  return {
    type: SNAKE_GAME_TICK
  }
}

export function displaySnake(display) {
  return {
    type: SNAKE_GAME_DISPLAY,
    display,
  }
}

export function pauseSnake() {
  return {
    type: SNAKE_GAME_PAUSE
  }
}

export function setSnakeInterval(interval) {
  return {
    type: SNAKE_GAME_UNPAUSE,
    interval,
  }
}

export function deathSnake() {
  return {
    type: SNAKE_GAME_DEATH
  }
}

export function displaySubmit(display, score = 0) {
  return {
    type: SNAKE_SUBMIT_DISPLAY,
    display,
    score,
  }
}

export function updateSubmitName(name) {
  return {
    type: SNAKE_SUBMIT_NAME_UPDATE,
    name,
  }
}

export function tickSnakeAndHandleDeath() {
  return (dispatch, getState) => {
    dispatch(tickSnake());

    const { death, score } = getState().snake.game.snakeState;

    if (death) {
      dispatch(displaySubmit(true, score));
      dispatch(deathSnake());
      dispatch(pauseSnake());
      dispatch(displaySnake(false));
    }
  }
}

export function unpauseSnake() {
  return (dispatch, getState) => {
    const { snakeState, interval } = getState().snake.game;
    const { speed } = snakeState;

    if (interval) {
      return
    }

    const newInterval = setInterval(() => {
      dispatch(tickSnakeAndHandleDeath());
    }, 1000 / speed);

    dispatch(setSnakeInterval(newInterval));
  }
}

export function submitScore() {
  return (dispatch, getState) => {
    const { name, score } = getState().snake.submit;
    api.addHighScore(name, score)
      .then(() => {
        dispatch(displaySubmit(false));
        dispatch(displaySnake(true));
        dispatch(unpauseSnake());
      })
  }
}
