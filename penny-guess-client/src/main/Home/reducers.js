import { combineReducers } from 'redux';
import {HOME_MESSAGE_UPDATE} from './action_names';

const initialState = 'Penny is...';

function message(state = initialState, action) {
  switch (action.type) {
    case HOME_MESSAGE_UPDATE:
      return action.message;
    default:
      return state;
  }
}

const home = combineReducers({
  message
});

export default home;
