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
    USER_LOGIN,
    DELETE_BIBLIST,
    INSERT_RECORD_TO_USER,
    BIB_SEARCH,
    GET_RECORD,
    PASS_RECOVERY,
    PASS_RECOVERY_EDIT,
    CONTACT_US_MASSAGE,
    EXPORT_RECORD_TO_WORD,
    ADD_NOTIFICATION
} from '../actions/consts';

import { populateAPAData, editListName } from './functions.js';
import { combineReducers } from 'redux';


function notificationList(state = [], action) {
    switch (action.type) {
        case ADD_NOTIFICATION:
            return {
                value: action.value
            }
        default:
            return state
    }
}

function recordsDataForExport(state = [], action) {
    switch (action.type) {
        case EXPORT_RECORD_TO_WORD:
            return {
                value: action.value
            }
        default:
            return state
    }
}

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

function activeBiblist(state = [], action) {
    switch (action.type) {
        case ACTIVE_BIBLIST:
            return action.value;
        case DELETE_BIBLIST:
            return action.value;
        case GET_BIBLIST_NAMES_FROM_DB:
            if (state.id && action.newName)
                return action.value[action.value.length - 1];
            else if (action.editName)
                return editListName(action.value, state);
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

function getEditRecord(state = [], action) {
    switch (action.type) {
        case GET_RECORD:
            return action.value;
        default:
            return state;
    }
}

function getBiblistFromDB(state = [], action) {
    switch (action.type) {
        case GET_BIBLIST_FROM_DB:
            let data = populateAPAData(action);
            if (data == undefined)
                data = [];
            return data;
        case DELETE_RECORD_FROM_USER:
            let data2 = populateAPAData(action);
            if (data2 == undefined)
                data2 = [];
            return data2;
        case INSERT_RECORD_TO_USER:
            let data3 = populateAPAData(action);
            if (data3 == undefined)
                data3 = [];
            return data3;
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
            return [
                action.user
            ];
        case INSERT_USER_TO_DB: //comes back from the ajax file response
            console.log('INSERT_USER_TO_DB', action)
            return {
                registerSuccess: action.value.userRegistered,
                username: action.value.username,
                email: action.value.email

            };
        case USER_MAIL_VERIFICATION: //comes back from the ajax file response
            return {
                mailver: action.value
            };
        case PASS_RECOVERY: //password recovery
            console.log('action.value', action);
            return {
                passRecoveryData: action.value
            };
        case PASS_RECOVERY_EDIT: //password recovery edit
            console.log('reducer PASS_RECOVERY_EDIT', action);
            return {
                passRecoveryEdit: action.value
            };
        default:
            return state
    }
}

function emailMassageReducer(state = [], action) {
    switch (action.type) {
        case CONTACT_US_MASSAGE:
            console.log('reducer CONTACT_US_MASSAGE', action);
            return {
                massageSent: action.value
            };
        default:
            return state
    }
}






function authReducer(state = [], action) {
    switch (action.type) {
        case LOGGED_IN:
            console.log('LOGGED_IN_reducer');
            console.log('LOGGED_IN_reducer action', action);

            return {
                ...state,
                auth: action.auth,
                userid: action.userid,
                email: action.email
            }
        case USER_LOGIN:
            console.log('USER_LOGIN');
            console.log('USER_LOGIN_reducer action', action);
            return {
                ...state,
                auth: action.value.auth,
                userid: action.value.userid
            }
        default:
            return state;

    }
}

function searcResultsReducer(state = [{ searchRes: [] }], action) {
    switch (action.type) {
        case BIB_SEARCH:
            //return action.value
            let data = populateAPAData(action);
            if (data == undefined)
                data = [];
            return data;
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
    getBiblistNamesFromDB,
    searcResultsReducer,
    getEditRecord,
    emailMassageReducer,
    recordsDataForExport,
    notificationList
});

export default rootReducer;