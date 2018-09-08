import { CHOOSE_SUBSCRIPTION, CREATE_APA_BOOKS_STANDARD, CREATE_APA_PAPER_STANDARD, CREATE_APA_ARTICLE_STANDARD, CREATE_APA_WEBSITE_STANDARD } from '../actions';
import { populateBookApa, populatePaperApa, populateArticleApa, populateWebisteApa } from './functions.js';
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
    case CREATE_APA_BOOKS_STANDARD:
        return populateBookApa(action);
    case CREATE_APA_PAPER_STANDARD:
        return populatePaperApa(action);
    case CREATE_APA_ARTICLE_STANDARD:
        return populateArticleApa(action);
    case CREATE_APA_WEBSITE_STANDARD:
        return populateWebisteApa(action);
    default:
        return state
  }
}


const rootReducer = combineReducers({
     chooseSubscription,
     createApa
});

export default rootReducer;