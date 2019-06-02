import {
    CHOOSE_SUBSCRIPTION,
    DELETE_RECORD_FROM_USER,
    GET_BIBLIST_NAMES_FROM_DB,
    SET_RETRIVED_DATE,
    ADD_USER,
    INSERT_USER_TO_DB,
    GET_BIBLIST_FROM_DB,
    USER_MAIL_VERIFICATION,
    ACTIVE_BIBLIST, 
    LOGGED_IN,
    DELETE_BIBLIST
} from '../actions/consts';

import { populateAPAData } from './functions.js';
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

function activeBiblist(state = [], action){
    switch (action.type) {
        case ACTIVE_BIBLIST:
            return action.value;
        case DELETE_BIBLIST:
            return action.value;
        case GET_BIBLIST_NAMES_FROM_DB:
            if(state.id && action.newName)
                return action.value[action.value.length - 1]
            else
                return state;
        default:
            return state;
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
        case DELETE_BIBLIST:
            return action.value;
        default:
            return state;
    }
}

function getBiblistFromDB(state = [], action) {
    switch (action.type) {
        case GET_BIBLIST_FROM_DB:
            let data = populateAPAData(action);
            if(data == undefined)
                data = [];   
            return data;
        case DELETE_RECORD_FROM_USER:
            let data2 = populateAPAData(action);
            if(data2 == undefined)
                data2 = [];   
            return data2;
        case DELETE_BIBLIST:
            return [];
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
        case INSERT_USER_TO_DB: //comes back from the ajax file response
            console.log('User exits', action);
            return {
                    registerSuccess: action.value.userRegistered,
                    username: action.value.username,
                    email: action.value.email

            };
            console.log('User exits value', action.value);
            break;
        case USER_MAIL_VERIFICATION: //comes back from the ajax file response
        console.log('User mailver is', action.value);
        return {
                mailver: action.value
        };
        console.log('user test mailver', action.value);
        break;
        default:
            return state
    }
}

function authReducer(state = [], action){
    switch(action.type){
        case LOGGED_IN:
        console.log('LOGGED_IN_reducer');
        console.log('LOGGED_IN_reducer action', action);
        return{
            ...state,
            auth: true,
            userid: action.userid,
            username: action.username
        }
        default:
            return state;

    }
}

const rootReducer = combineReducers({
    chooseSubscription,
    deleteRecordFromUser,
    retrivedDate,
    userReducer,
    authReducer,
    activeBiblist,
    getBiblistFromDB,
    getBiblistNamesFromDB
});

export default rootReducer;