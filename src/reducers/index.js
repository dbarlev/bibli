import { 
     CHOOSE_SUBSCRIPTION,
     DELETE_RECORD_FROM_USER,
     GET_RECORDS_FROM_DB,
     INSERT_RECORD_TO_USER,
     SET_RETRIVED_DATE
} from '../actions/consts';

import { populateBookApa, populatePaperApa, populateArticleApa, populateWebisteApa, formatRecordsToApa, populateAPAData } from './functions.js';
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
 
function deleteRecordFromUser(state = [], action){
    switch (action.type) {
        case DELETE_RECORD_FROM_USER:
        return {
            value: action.value,
            name: "bookid"
        }
    default:
        return state;
    }
}

function getRecordsFromDB(state = [], action){
    switch (action.type) {
        case GET_RECORDS_FROM_DB:
           //return formatRecordsToApa(action);
           return populateAPAData(action);
        case INSERT_RECORD_TO_USER:
            //return formatRecordsToApa(action);
           return populateAPAData(action);
    default:
        return state;
    }
}


function retrivedDate(state = [], action){
    switch (action.type) {
        case SET_RETRIVED_DATE:
           //return formatRecordsToApa(action);
           return populateAPAData(action);
    default:
        return state;
    }
}

const rootReducer = combineReducers({
     chooseSubscription,
     deleteRecordFromUser,
     getRecordsFromDB,
     retrivedDate
});

export default rootReducer;