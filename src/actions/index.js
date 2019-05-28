import {
    CHOOSE_SUBSCRIPTION,
    SET_RETRIVED_DATE,
    ADD_USER,
    USER_MAIL_VERIFICATION,
    ACTIVE_BIBLIST,
    LOGGED_IN
} from './consts';

export function chooseSubscription(value, name) {
    return {
        type: CHOOSE_SUBSCRIPTION,
        value,
        name
    }
}

export function activeBiblist(biblistItem){
    return {
        type: ACTIVE_BIBLIST,
        value: biblistItem
    }
}

export function setRetriveDate(date) {
    return {
        type: SET_RETRIVED_DATE,
        value: date
    }
}


export function addUser(obj) {
    console.log("obj", obj)
    return {
        type: ADD_USER,
        user: obj
    }
}

export function MailVerAction(obj) {
    console.log("obj", obj)
    return {
        type: USER_MAIL_VERIFICATION,
        mailver: 0
    }
}

export function userLogedIn(user){
    console.log('LOGGED_IN action');
    console.log('LOGGED_IN user', user);

    return{
        type: LOGGED_IN,
        userid: user.userid,
        username: user.username
    }
    
}

