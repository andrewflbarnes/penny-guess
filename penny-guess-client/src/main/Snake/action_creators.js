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
} from "./action_names";

export function updateSnakeSpeed(speed) {
  return {
    type: SNAKE_GAME_SPEED_UPDATE,
    speed,
  }
}

export function updateSnakeVelocity(velocity) {
  return {
    type: SNAKE_GAME_SPEED_UPDATE,
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

export function unpauseSnake() {
  return (dispatch, getState) => {
    const { speed, interval } = getState().snake.game;

    if (interval) {
      return
    }

    const newInterval = setInterval(() => {
      dispatch(tickSnake());
    }, 1000 / speed);

    dispatch(setSnakeInterval(newInterval));
  }
}

export function deathSnake() {
  return {
    type: SNAKE_GAME_DEATH
  }
}

export function deathSnakeAndUpdateDisplay() {
  return dispatch => {
    dispatch(deathSnake());
    dispatch(pauseSnake());
    dispatch(displaySnake(false));
    dispatch(displaySubmit(true));
  }
}

export function displaySubmit(display) {
  return {
    type: SNAKE_SUBMIT_DISPLAY,
    display,
  }
}

export function updateSubmitName(name) {
  return {
    type: SNAKE_SUBMIT_NAME_UPDATE,
    name,
  }
}

export function submitScore() {
  return {
    type: SNAKE_SUBMIT_PERFORM,
  }
}
