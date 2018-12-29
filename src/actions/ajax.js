import {
    GET_BIBLIST_NAMES_FROM_DB,
    DELETE_RECORD_FROM_USER,
    INSERT_RECORD_TO_USER,
    INSERT_USER_TO_DB,
    GET_BIBLIST_FROM_DB
} from './consts';
import axios from 'axios';

export const getBibListNamesFromDB = (userID) => {
    return (dispatch) => { axios.get('http://127.0.0.1/bibli/api/Biblist/' + userID)
        .then(function (response) {
            dispatch({ type: GET_BIBLIST_NAMES_FROM_DB, value: response.data, userid: userID });
        })
        .catch(function (error) {
            console.log(error);
        });
    }
};

export const getRecordsFromDB = (userID) => {

    return (dispatch) => { axios.get('http://127.0.0.1/bibli/api/records/' + userID)
        .then(function (response) {
            
            dispatch({ type: GET_BIBLIST_FROM_DB, value: response.data, userid: userID });
        })
        .catch(function (error) {
            console.log(error);
        });
    }
};

export const DeleteRecordFromUser = (userID, recordID) => {

     return (dispatch) => { axios.put("http://127.0.0.1/bibli/api/biblioRecords/Records.php/?userid=" + userID + "&recordID=" + recordID)
        .then(function (response) {
            dispatch({ type: DELETE_RECORD_FROM_USER, value: response.data });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

};

export const InsertRecordToDB = (data) => {

        return (dispatch) => { axios({
                url: "http://127.0.0.1/bibli/api/biblioRecords/Records.php",
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
                url: "http://127.0.0.1/bibli/api/biblioRecords/Biblist.php",
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data)
        })
        .then(function (response) {
            dispatch({ type: GET_BIBLIST_NAMES_FROM_DB, value: response.data });
        })
        .catch(function (error) {
            console.log(error);
        });
    }
};


export const InsertUserToDB = (data) => {
    
    return (dispatch) => { axios({
                url: "http://127.0.0.1/bibli/api/users/User.php",
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

    // return (dispatch) => {
    //     fetch("http://127.0.0.1/bibli/api/users/User.php", {
    //             method: "POST",
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(data)
    //         })
    //         .then((response) => {
    //             let clone = response.clone();
    //             return clone.json()})
    //         .then((json) => {
    //             dispatch({ type: INSERT_USER_TO_DB, value: json, data: data });
    //         })
            
    //         .catch(error =>
    //             console.log('parsing faild', error)
    //         )
    // };
};