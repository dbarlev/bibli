import { apiClient } from '../../../common/apiClient';
import React from 'react';
import axios from 'axios';
import apiPath from '../../../constants/api';
const CryptoJS = require('crypto-js');

export const LoginServerValidation = async(email, password) => {
    let userData = { email, password };
    let response = await apiClient("/users/Login.php", "post", userData);
    let errorMsg = checkUserValidation(response.error);
    if (errorMsg) {
        return { success: false, data: errorMsg, error: response.error };
    } else {
        setCookie(response.auth, response.userid);
        console.log('response', response);
        return { success: true, data: response };
    }
}



const checkUserValidation = (error) => {
    let afterValError;
    switch (error) {
        case 1:
            afterValError = "משתשמש לא קיים";
            break;
        case 2:
            afterValError = "סיסמה שגויה";
            break;
        case 3:
            afterValError = "mailVerification";
            break;
    }

    return afterValError;
}


export const sendNewConfMail = async(email) => {
    let response = await axios.get(`${apiPath}/users/Mailconf.php?email=${email}`);
    if(response && response.data.error == 0){
        return {doPush: true};
    }
  }

const setCookie = (auth, userid) => {
    const timestamp = new Date().getTime(); // current time
    const exp = timestamp + 60 * 60 * 24 * 1000 * 7; // add one week

    auth = `auth=${auth};expires=${exp}`;
    userid = `userid=${CryptoJS.AES.encrypt(userid, 'bibli data')};expires=${exp}`;

    document.cookie = auth;
    document.cookie = userid;
}