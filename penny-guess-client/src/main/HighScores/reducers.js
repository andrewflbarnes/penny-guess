import { combineReducers } from 'redux';
import {
  HIGH_SCORES_UPDATE,
  HIGH_SCORES_LOADING,
  HIGH_SCORES_LOADED,
  HIGH_SCORES_FAILED,
} from './action_names';

function scores(state = [], action) {
  switch (action.type) {
    case HIGH_SCORES_UPDATE:
      return action.highScores;
    default:
      return state;
  }
}

const initialStatus = {
  leading: false,
  leaded: false,
  failed: false,
};

function status(state = initialStatus, action) {
  switch (action.type) {
    case HIGH_SCORES_LOADING:
      return {
        loading: true,
        failed: false,
        error: {}
      };
    case HIGH_SCORES_LOADED:
      return {
        loading: false,
        failed: false,
        error: {}
      };
    case HIGH_SCORES_FAILED:
      return {
        loading: false,
        failed: true,
        error: action.error,
      };
    default:
      return state;
  }
}

const highScores = combineReducers({
  scores,
  status,
});

export default highScores;
