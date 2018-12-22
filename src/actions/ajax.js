import {
    GET_RECORDS_FROM_DB,
    DELETE_RECORD_FROM_USER,
    INSERT_RECORD_TO_USER,
    INSERT_USER_TO_DB,
    GET_BIBLIST_FROM_DB
} from './consts';
import axios from 'axios';

export const getRecordsFromDB = (userID) => {
    return (dispatch) => {
        fetch('http://127.0.0.1/bibli/api/records/' + userID, {
                method: "GET"
            })
            .then((response) => {
                response.json()})
            .then((json) => {
                dispatch({ type: GET_RECORDS_FROM_DB, value: json, userid: userID });
            })
            .catch(error => console.log('parsing faild', error))
    };
};

export const getBibListFromDB = (userID) => {
    return (dispatch) => {
        fetch('http://127.0.0.1/bibli/api/biblist/' + userID, {
                method: "GET"
            })
            .then((response) => response.json())
            .then((json) => {
                dispatch({ type: GET_BIBLIST_FROM_DB, value: json, userid: userID });
            })
            .catch(error => console.log('parsing faild', error))
    };
};

export const DeleteRecordFromUser = (userID, recordID) => {
    return (dispatch) => {
        fetch("http://127.0.0.1/bibli/api/biblioRecords/Records.php/?userid=" + userID + "&recordID=" + recordID, {
                method: "PUT"
            })
            .then((response) => response.json())
            .then((json) => {
                dispatch({ type: DELETE_RECORD_FROM_USER, value: recordID });
            })
            .catch(error =>
                console.log('parsing faild', error)
            )
    };
};

export const InsertRecordToDB = (data) => {

    return (dispatch) => {
        fetch("http://127.0.0.1/bibli/api/biblioRecords/Records.php", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then((response) => response.json())
            .then((json) => {
                dispatch({ type: INSERT_RECORD_TO_USER, value: json, userid: data.userid });
            })
            .catch(error =>
                console.log('parsing faild', error)
            )
    };
};

export const InsertBibListToDB = (data) => {

    return (dispatch) => {
        fetch("http://127.0.0.1/bibli/api/biblioRecords/Biblist.php", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then((response) => response.json())
            .then((json) => {
               dispatch({ type: GET_BIBLIST_FROM_DB, value: json});
            })
            .catch(error =>
                console.log('parsing faild', error)
            )
    };
};


export const InsertUserToDB = (data) => {
    console.log('InsertUserToDB', data);
    return (dispatch) => {
        fetch("http://127.0.0.1/bibli/api/users/User.php", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then((response) => response.json())
            .then((json) => {
                dispatch({ type: INSERT_USER_TO_DB, value: json, data: data });
            })
            
            .catch(error =>
                console.log('parsing faild', error)
            )
    };
};