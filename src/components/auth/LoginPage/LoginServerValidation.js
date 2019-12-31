import { apiClient } from '../../../common/apiClient';
import React from 'react';
const CryptoJS = require("crypto-js");

export const LoginServerValidation = async(email, password) => {
    let userData = { email, password };
    let response = await apiClient("/users/Login.php", "post", userData);
    let errorMsg = checkUserValidation(response.error, email);
    if (errorMsg) {
        return { success: false, data: errorMsg };
    } else {
        setCookie(response.auth, response.userid);
        return { success: true, data: response };
    }
}

const sendNewConfMail = async(email) => {
    console.log('sendNewConfMail', email);
    let userEmail = { email };
    let response = await apiClient("/users/Mailconf.php", "get", userEmail);
        console.log('response', response);
        return { data: response };
}

const checkUserValidation = (error, email) => {
    let afterValError;
    switch (error) {
        case 1:
            afterValError = "משתשמש לא קיים";
            break;
        case 2:
            {afterValError = <span> החשבון לא אומת < a onClick = { () => sendNewConfMail(email) } > לחץ כאן כדי לקבל מייל אימות חדש < /a></span >}
            break;
        case 3:
            afterValError = "סיסמה שגויה";
            break;
    }

    return afterValError;
}

const setCookie = (auth, userid) => {
    const timestamp = new Date().getTime(); // current time
    const exp = timestamp + 60 * 60 * 24 * 1000 * 7; // add one week

    auth = `auth=${auth};expires=${exp}`;
    userid = `userid=${CryptoJS.AES.encrypt(userid, 'bibli data')};expires=${exp}`;

    document.cookie = auth;
    document.cookie = userid;
}