import api from '../api/api';
import {HIGH_SCORES_UPDATE} from './action_names';

export function updateHighScores(highScores) {
  return {
    type: HIGH_SCORES_UPDATE,
    highScores
  }
}

export function fetchHighScores() {
  return dispatch => {
    api.getHighScores()
      .then(highScores =>
        dispatch(updateHighScores(highScores))
      )
  };
}
