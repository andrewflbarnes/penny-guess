import { combineReducers } from 'redux'
import highScores from './HighScores/reducers';
import home from './Home/reducers';

const reducers = combineReducers({
  highScores,
  home,
});

export default reducers;
