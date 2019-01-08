import {
    CHOOSE_SUBSCRIPTION,
    SET_RETRIVED_DATE,
    ADD_USER,
    MAIL_VER
} from './consts';

export function chooseSubscription(value, name) {
    return {
        type: CHOOSE_SUBSCRIPTION,
        value,
        name
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
        type: MAIL_VER,
        mailver: 0
    }
}


