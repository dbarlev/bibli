import { CHOOSE_SUBSCRIPTION } from '../actions';
import { combineReducers } from 'redux';     


function chooseSubscription(state = [], action){
    switch (action.type) {
      case CHOOSE_SUBSCRIPTION:
        return action.value
    default:
        return false
  }
}

const rootReducer = combineReducers({
     chooseSubscription
});

export default rootReducer;