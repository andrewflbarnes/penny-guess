import { combineReducers } from 'redux';
import {HIGH_SCORES_UPDATE} from './action_names';

function scores(state = [], action) {
  switch (action.type) {
    case HIGH_SCORES_UPDATE:
      return action.highScores;
    default:
      return state;
  }
}

const highScores = combineReducers({
  scores
});

export default highScores;
