import {
    INSERT_USER_TO_DB,
    USER_MAIL_VERIFICATION,
    PASS_RECOVERY,
    PASS_RECOVERY_EDIT,
    CONTACT_US_MASSAGE,
    JOIN_MAIL_LIST,
    USER_LOGIN,
    USER_PACAKGE
} from "./consts";
import axios from "axios";
import apiPath from "../constants/api";

export const InsertUserToStore = data => {
    return dispatch => {
        dispatch({ type: INSERT_USER_TO_DB, value: data });
    };
};

export const userLogin = userData => {

    return dispatch => {

        axios({
            url: `${apiPath}/users/Login.php`,
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            data: JSON.stringify(userData)
        })
            .then(function (response) {
                dispatch({ type: USER_LOGIN, value: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    };
};


export const MailVerAction = data => {
    console.log("data ", data);
    return dispatch => {
        axios({
            url: `${apiPath}/users/Mailconf.php?mailconf=${data}`,
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            data: JSON.stringify(data)
        })
            .then(function (response) {
                dispatch({ type: USER_MAIL_VERIFICATION, value: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    };
};

export const PassRecoveryAction = email => {
    return dispatch => {
        axios
            .post(`${apiPath}/users/Passrecovery.php?email=${email}`)
            .then(function (response) {
                dispatch({ type: PASS_RECOVERY, value: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    };
};

export const PassRecoveryEdit = data => {
    let dat = JSON.stringify(data);
    let url = `${apiPath}/users/Passrecovery.php?data=${dat}`;

    return dispatch => {
        axios
            .put(url)
            .then(function (response) {
                dispatch({ type: PASS_RECOVERY_EDIT, value: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    };
};

export const sendMassage = data => {
    let dat = JSON.stringify(data);
    let url = `${apiPath}/users/Massage.php?data=${dat}`;

    return dispatch => {
        axios
            .post(url)
            .then(function (response) {
                dispatch({ type: CONTACT_US_MASSAGE, value: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    };
};

export const joinMalList = data => {
    let dat = JSON.stringify(data);
    let url = `${apiPath}/users/Massage.php?data=${dat}`;

    return dispatch => {
        axios
            .put(url)
            .then(function (response) {
                dispatch({ type: JOIN_MAIL_LIST, value: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    };
};

export const getUserPackage = userid => {
    let url = `${apiPath}/users/Package.php?userid=${userid}`;

    return dispatch => {
        axios
            .get(url)
            .then(function (response) {
                dispatch({ type: USER_PACAKGE, value: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    };
};