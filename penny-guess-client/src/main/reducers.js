import { combineReducers } from 'redux'
import highScores from './HighScores/reducers';

const reducers = combineReducers({
  highScores
});

export default reducers;
