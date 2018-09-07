import { CHOOSE_SUBSCRIPTION, CREATE_APA_STANDARD } from '../actions';
import { populateBookApa } from './functions.js';
import { combineReducers } from 'redux';     


function chooseSubscription(state = [], action){
    switch (action.type) {
      case CHOOSE_SUBSCRIPTION:
        return {
          value: action.value,
          name: action.name
        }
    default:
        return {
          value: false,
          name: "לא נבחרה חבילה"
        }
  }
}

function createApa(state = [], action){
  switch (action.type) {
    case CREATE_APA_STANDARD:
        return populateBookApa(action);
    default:
        return state
  }
}


const rootReducer = combineReducers({
     chooseSubscription,
     createApa
});

export default rootReducer;