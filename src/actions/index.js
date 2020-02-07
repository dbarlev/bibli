import {
    CHOOSE_SUBSCRIPTION,
    SET_RETRIVED_DATE,
    ADD_USER,
    USER_MAIL_VERIFICATION,
    ACTIVE_BIBLIST,
    LOGGED_IN,
    PASS_RECOVERY,
    EXPORT_RECORD_TO_WORD,
    INSERT_RECORD_TO_USER
} from './consts';


export function exportRecordData(value) {
    return {
        type: EXPORT_RECORD_TO_WORD,
        value
    }
}

export function chooseSubscription(value, name) {
    return {
        type: CHOOSE_SUBSCRIPTION,
        value,
        name
    }
}

export function activeBiblist(biblistItem) {
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
    return {
        type: ADD_USER,
        user: obj
    }
}

export function MailVerAction(obj) {
    return {
        type: USER_MAIL_VERIFICATION,
        mailver: 0
    }
}

export function userLogedIn(user) {
    return {
        type: LOGGED_IN,
        userid: user.userid,
        email: user.email
    }

}


export function PassRecovery(data) {
    return {
        type: PASS_RECOVERY,
        email: data
    }
}

