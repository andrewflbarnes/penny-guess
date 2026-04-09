import {HOME_MESSAGE_UPDATE} from './action_names';
import api from '../api';

export function updateHomeMessage(message) {
  return {
    type: HOME_MESSAGE_UPDATE,
    message
  }
}

export function fetchHomeMessage() {
  return dispatch => {
    api.getWhatIs()
      .then(
        response => {
          if (response.what) {
            dispatch(updateHomeMessage(`Penny is ${response.what}`));
          }
        }
      );
  }
}
