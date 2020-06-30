import {
    CHOOSE_SUBSCRIPTION,
    DELETE_RECORD_FROM_USER,
    GET_BIBLIST_NAMES_FROM_DB,
    SET_RETRIVED_DATE,
    ADD_USER,
    INSERT_USER_TO_DB,
    UPDATE_USER_DATA,
    GET_ALL_USER_DATA,
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
    ACCESSIBILITY,
    GET_POSTS_FROM_WP
} from '../actions/consts';

import { populateAPAData, editListName } from './functions.js';
import { combineReducers } from 'redux';

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

function getAccessibility(state = [], action) {
    switch (action.type) {
        case ACCESSIBILITY:
            return action.value
        default:
            return false
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
            data = data.sort((a, b) => (a.writers > b.writers) ? 1 : ((b.writers > a.writers) ? -1 : 0));
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
            data3 = data3.sort((a, b) => (a.writers > b.writers) ? 1 : ((b.writers > a.writers) ? -1 : 0));
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
            return {
                registerSuccess: action.value.userRegistered,
                username: action.value.username,
                email: action.value.email

            };

        case UPDATE_USER_DATA: //edit user data in user area page
            return {
                fname: action.value.fname,
                lname: action.value.lname,
                email: action.value.email,
                maslul: action.value.maslul,
                mosad: action.value.mosad,
                numOfLists: action.value.numOfLists,
                numOfBibs: action.value.numOfBibs,
            };
        case GET_ALL_USER_DATA: //GET ALL user data in user area page, USED IN PAGE LOAD
            return {
                fname: action.value.fname,
                lname: action.value.lname,
                email: action.value.email,
                maslul: action.value.maslul,
                mosad: action.value.mosad,
                numOfLists: action.value.numOfLists,
                numOfBibs: action.value.numOfBibs,
            };
        case USER_MAIL_VERIFICATION: //comes back from the ajax file response
            return {
                mailver: action.value
            };
        case PASS_RECOVERY: //password recovery
            return {
                passRecoveryData: action.value
            };
        case PASS_RECOVERY_EDIT: //password recovery edit
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
            return {
                ...state,
                auth: action.auth,
                userid: action.userid,
                email: action.email
            }
        case USER_LOGIN:
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

function PostsFromWPReducer(state = [], action) {
    console.log('wp Reducer', state);
    switch (action.type) {
        case GET_POSTS_FROM_WP:
            return {
                ...state,
                posts: action.value
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
    getBiblistNamesFromDB,
    searcResultsReducer,
    getEditRecord,
    emailMassageReducer,
    recordsDataForExport,
    getAccessibility,
    PostsFromWPReducer
});

export default rootReducer;