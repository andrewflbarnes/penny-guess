import { combineReducers } from 'redux'
import highScores from './HighScores/reducers';
import home from './Home/reducers';
import snake from './Snake/reducers';

const reducers = combineReducers({
  highScores,
  home,
  snake,
});

export default reducers;
