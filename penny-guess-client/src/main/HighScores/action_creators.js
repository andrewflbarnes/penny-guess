import api from '../api';
import {
  HIGH_SCORES_UPDATE,
  HIGH_SCORES_LOADED,
  HIGH_SCORES_LOADING,
  HIGH_SCORES_FAILED,
} from './action_names';

export function updateHighScores(highScores) {
  return {
    type: HIGH_SCORES_UPDATE,
    highScores
  }
}

export function loadingHighScores() {
  return {
    type: HIGH_SCORES_LOADING,
  }
}

export function loadedHighScores() {
  return {
    type: HIGH_SCORES_LOADED,
  }
}

export function failedHighScores(error) {
  return {
    type: HIGH_SCORES_FAILED,
    error
  }
}

export function fetchHighScores() {
  return dispatch => {
    dispatch(loadingHighScores());

    api.getHighScores()
      .then(
        highScores => {
          dispatch(loadedHighScores());
          dispatch(updateHighScores(highScores));
        },
        error => {
          console.log(error);
          dispatch(failedHighScores(error));
        }
      )
  };
}
