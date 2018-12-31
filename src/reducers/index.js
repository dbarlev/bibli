import {
    CHOOSE_SUBSCRIPTION,
    DELETE_RECORD_FROM_USER,
    GET_BIBLIST_NAMES_FROM_DB,
    INSERT_RECORD_TO_USER,
    SET_RETRIVED_DATE,
    ADD_USER,
    INSERT_USER_TO_DB,
    GET_BIBLIST_FROM_DB
} from '../actions/consts';

import { populateBookApa, populatePaperApa, populateArticleApa, populateWebisteApa, formatRecordsToApa, populateAPAData } from './functions.js';
import { combineReducers } from 'redux';


function chooseSubscription(state = [], action) {
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

function deleteRecordFromUser(state = [], action) {
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

function getBiblistNamesFromDB(state = [], action) {
    switch (action.type) {
        case GET_BIBLIST_NAMES_FROM_DB:
            return action.value;
        default:
            return state;
    }
}

function getBiblistFromDB(state = [], action) {
    switch (action.type) {
        case GET_BIBLIST_FROM_DB:
            let data = populateAPAData(action);
            return data;
        default:
            return state;
    }
}

function retrivedDate(state = [], action) {
    switch (action.type) {
        case SET_RETRIVED_DATE:
            //return formatRecordsToApa(action);
            return populateAPAData(action);
        default:
            return state;
    }
}

function userReducer(state = [], action) {
    switch (action.type) {
        case ADD_USER:
            console.log('action user', action);
            return [
                action.user
            ];
            break;
        case INSERT_USER_TO_DB:
            console.log('User exits', action);
            return {
                    registerSuccess: action.value.userRegistered,
                    username: action.value.username,
                    email: action.value.email

            };
            console.log('User exits value', action.value);
            break;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    chooseSubscription,
    deleteRecordFromUser,
    retrivedDate,
    userReducer,
    getBiblistFromDB,
    getBiblistNamesFromDB
});

export default rootReducer;