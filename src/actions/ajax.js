import {
    GET_BIBLIST_NAMES_FROM_DB,
    DELETE_RECORD_FROM_USER,
    INSERT_RECORD_TO_USER,
    INSERT_USER_TO_DB,
    GET_BIBLIST_FROM_DB, 
    USER_MAIL_VERIFICATION,
    DELETE_BIBLIST,
    BIB_SEARCH
} from './consts';
import axios from 'axios';

const API_PATH = "http://127.0.0.1/bibli/api";

export const getBibListNamesFromDB = (userID) => {
    return (dispatch) => { axios.get(`${API_PATH}/Biblist/${userID}`)
        .then(function (response) {
            dispatch({ type: GET_BIBLIST_NAMES_FROM_DB, value: response.data, userid: userID });
        })
        .catch(function (error) {
            console.log(error);
        });
    }
};

export const getRecordsFromDB = (userID, biblistID, listName) => {

    return (dispatch) => { axios.get(`${API_PATH}/biblioRecords/Records.php?userid=${userID}&biblistID=${biblistID}`)
        .then(function (response) {
            dispatch({ type: GET_BIBLIST_FROM_DB, value: response.data, userid: userID, listName });
        })
        .catch(function (error) {
            console.log(error);
        });
    }
};

export const DeleteRecordFromUser = (userID, recordID, biblistID) => {

     return (dispatch) => { axios.put(`${API_PATH}/biblioRecords/Records.php/?userid=${userID}&recordID=${recordID}&biblistID=${biblistID}`)
        .then(function (response) {
            dispatch({ type: DELETE_RECORD_FROM_USER, value: response.data });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

};

export const EditBiblistName = (userID, biblistID, name) => {

    let data = {
        userID,
        biblistID,
        name
    }

    return (dispatch) => { 
        axios(
        {
            url: `${API_PATH}/biblioRecords/biblist.php`,
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        })
        .then(function (response) {
            dispatch({ type: GET_BIBLIST_NAMES_FROM_DB, value: response.data, editName: true });
        })
        .catch(function (error) {
            console.log(error);
        });
    }
};


export const DeleteBibList = (userID, biblistID) => {
    return (dispatch) => { axios.delete(`${API_PATH}/biblioRecords/Biblist.php/?userid=${userID}&biblistID=${biblistID}`)
       .then(function (response) {
           dispatch({ type: DELETE_BIBLIST, value: response.data });
       })
       .catch(function (error) {
           console.log(error);
       });
   }
};

export const InsertRecordToDB = (data, listID) => {

        return (dispatch) => { axios({
                url: `${API_PATH}/biblioRecords/Records.php`,
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data)
        })
        .then(function (response) {
            dispatch({ type: INSERT_RECORD_TO_USER, value: response.data });
        })
        .catch(function (error) {
            console.log(error);
        });
    }
};

export const InsertBibListToDB = (data) => {

    return (dispatch) => { axios({
                url: `${API_PATH}/biblioRecords/Biblist.php`,
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data)
        })
        .then(function (response) {
            dispatch({ type: GET_BIBLIST_NAMES_FROM_DB, value: response.data, newName: true });
        })
        .catch(function (error) {
            console.log(error);
        });
    }
};


export const InsertUserToDB = (data) => {
    
    return (dispatch) => { axios({
                url: `${API_PATH}/users/User.php`,
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data)
        })
        .then(function (response) {
            dispatch({ type: INSERT_USER_TO_DB, value: response.data });
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}

export const MailVerAction = (data) => {
    console.log('data ', data);
    return (dispatch) => { axios({
                url: `${API_PATH}/users/mailconf.php?mailconf=${data}`,
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data)
        })
        .then(function (response) {
            dispatch({ type: USER_MAIL_VERIFICATION, value: response.data });
        })
        .catch(function (error) {
            console.log(error);
        });
    }
};


export const BibSearchAction = (q) => {
    console.log('q ajax', q);
    return (dispatch) => { axios.get(`${API_PATH}/biblioRecords/Bibsearch.php?q=${q}`)
        .then(function (response) {
            dispatch({ type: BIB_SEARCH, value: response.data});
            console.log('response.q', response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
};
