import { apiClient } from '../../../common/apiClient';

export const LoginServerValidation = async (email, password) => {
    let userData = { email, password };
    let response = await apiClient("/users/Login.php", "post", userData);
    let errorMsg = checkUserValidation(response.error);
    if (errorMsg) {
        return { success: false, data: errorMsg };
    }
    else {
        setCookie(response.auth, response.userid);
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
            afterValError = "חשבון לא מאומת";
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
    userid = `userid=${userid};expires=${exp}`;

    document.cookie = auth;
    document.cookie = userid;
}