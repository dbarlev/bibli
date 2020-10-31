import {
    CHOOSE_SUBSCRIPTION,
    SET_RETRIVED_DATE,
    ADD_USER,
    USER_MAIL_VERIFICATION,
    ACTIVE_BIBLIST,
    LOGGED_IN,
    PASS_RECOVERY,
    EXPORT_RECORD_TO_WORD,
    ACCESSIBILITY,
    INSERT_USER_TO_DB,
    SHOW_UPGRADE_MODAL,
    SELECTED_PACAKGE
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

export function setAccessibility(value) {
    return {
        type: ACCESSIBILITY,
        value: value
    }
}


export const InsertUserToStore = data => {
    return dispatch => {
        dispatch({ type: INSERT_USER_TO_DB, value: data });
    };
};

export const ShowUpgradeModal = state => {
    return dispatch => {
        dispatch({ type: SHOW_UPGRADE_MODAL, value: state });
    };
};


export const SelectedPackage = data => {
    return dispatch => {
        dispatch({ type: SELECTED_PACAKGE, value: data });
    };
};