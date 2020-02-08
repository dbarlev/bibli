import { apiClient } from '../../../common/apiClient';

export const RegisterServerValidation = async (userData) => {
    let serverResponse = await apiClient("/users/User.php", "post", userData);
    if (serverResponse.userRegistered === "1") {
        return { success: true, data: serverResponse };
    }
    else {
        let msg = checkUserValidation(serverResponse.error)
        return { success: false, data: msg };
    }
};


const checkUserValidation = (error) => {
    let msg;
    switch (error) {
        case 0:
            msg = 'הסיסמה קטנה מ 6 תווים';
            break;
        case 1:
            msg = 'שדה כתובת מייל ריק';
            break;
        case 2:
            msg = 'כתובת המייל שהוזנה אינה תקינה';
            break;
        case 3:
            msg = 'כתובת המייל קיימת במערכת';
            break;
        default:
            break;
    }

    return msg;
}