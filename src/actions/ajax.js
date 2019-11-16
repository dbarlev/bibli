import {
    GET_BIBLIST_NAMES_FROM_DB,
    DELETE_RECORD_FROM_USER,
    INSERT_RECORD_TO_USER,
    INSERT_USER_TO_DB,
    GET_BIBLIST_FROM_DB,
    USER_MAIL_VERIFICATION,
    DELETE_BIBLIST,
    BIB_SEARCH,
    GET_RECORD,
    PASS_RECOVERY,
    PASS_RECOVERY_EDIT,
    CONTACT_US_MASSAGE,
    JOIN_MAIL_LIST,
    USER_LOGIN
} from './consts';
import axios from 'axios';

const API_PATH = "http://localhost/bibli/api";
// const API_PATH = "https://bibli.co.il/api";
// const API_PATH = window.location.origin + '/api';

export const getBibListNamesFromDB = (userID) => {
    return (dispatch) => {
        axios.get(`${API_PATH}/Biblist/${userID}`)
            .then(function(response) {
                dispatch({ type: GET_BIBLIST_NAMES_FROM_DB, value: response.data, userid: userID });
            })
            .catch(function(error) {
                console.log(error);
            });
    }
};

export const getRecordsFromDB = (userID, biblistID, listName) => {

    return (dispatch) => {
        axios.get(`${API_PATH}/biblioRecords/Records.php?userid=${userID}&biblistID=${biblistID}`)
            .then(function(response) {
                dispatch({ type: GET_BIBLIST_FROM_DB, value: response.data, userid: userID, listName });
            })
            .catch(function(error) {
                console.log(error);
            });
    }
};

export const getSingleRecord = (recordID) => {
    return (dispatch) => {
        axios.get(`${API_PATH}/biblioRecords/Records.php?recordID=${recordID}`)
            .then(function(response) {
                dispatch({ type: GET_RECORD, value: response.data });
            })
            .catch(function(error) {
                console.log(error);
            });
    }
};

export const removeSingleRecordFromStore = () => {
    return (dispatch) => {
        dispatch({ type: GET_RECORD, value: [] });
    }
};

export const DeleteRecordFromUser = (userID, recordID, biblistID) => {

    return (dispatch) => {
        axios.put(`${API_PATH}/biblioRecords/Records.php/?userid=${userID}&recordID=${recordID}&biblistID=${biblistID}`)
            .then(function(response) {
                dispatch({ type: DELETE_RECORD_FROM_USER, value: response.data });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

};

export const EditRecord = (data) => {

    return (dispatch) => {
        axios({
                url: `${API_PATH}/biblioRecords/Records.php`,
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data)
            })
            .then(function(response) {
                dispatch({ type: INSERT_RECORD_TO_USER, value: response.data });
            })
            .catch(function(error) {
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
        axios({
                url: `${API_PATH}/biblioRecords/biblist.php`,
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data)
            })
            .then(function(response) {
                dispatch({ type: GET_BIBLIST_NAMES_FROM_DB, value: response.data, editName: true });
            })
            .catch(function(error) {
                console.log(error);
            });
    }
};


export const DeleteBibList = (userID, biblistID) => {
    return (dispatch) => {
        axios.delete(`${API_PATH}/biblioRecords/Biblist.php/?userid=${userID}&biblistID=${biblistID}`)
            .then(function(response) {
                dispatch({ type: DELETE_BIBLIST, value: response.data });
            })
            .catch(function(error) {
                console.log(error);
            });
    }
};

export const InsertRecordToDB = (data, listID) => {

    return (dispatch) => {
        axios({
                url: `${API_PATH}/biblioRecords/Records.php`,
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data)
            })
            .then(function(response) {
                dispatch({ type: INSERT_RECORD_TO_USER, value: response.data });
            })
            .catch(function(error) {
                console.log(error);
            });
    }
};

export const InsertBibListToDB = (data) => {

    return (dispatch) => {
        axios({
                url: `${API_PATH}/biblioRecords/Biblist.php`,
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data)
            })
            .then(function(response) {
                dispatch({ type: GET_BIBLIST_NAMES_FROM_DB, value: response.data, newName: true });
            })
            .catch(function(error) {
                console.log(error);
            });
    }
};



export const InsertUserToDB = (data) => {
    console.log('data ff', data);
    return (dispatch) => {

        axios({
                url: `${API_PATH}/users/User.php`,
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data)
            })
            .then(function(response) {
                dispatch({ type: INSERT_USER_TO_DB, value: response.data });
            })
            .catch(function(error) {
                console.log(error);
            });
    }
}

export const userLogin = (userData) => {
    //console.log('userLogin', userData)
    return (dispatch) => {
        axios({
                url: `${API_PATH}/users/Login.php`,
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(userData)
            })
            .then(function(response) {
                dispatch({ type: USER_LOGIN, value: response.data });
            })
            .catch(function(error) {
                console.log(error);
            });
    }
}

//     fetch('http://localhost/bibli/api/user_switch/' + ${userData.username} + 
//     '/'+ this.state.password )
//     .then(response => response.json())
//     .then(json => {
//         if(json.count > 0)
//         {
//            console.log('json', json);
//             this.props.userLogedIn(json);
//             this.setState({auth: true, userid: json.userid, username: json.username});

//         }else{
//             let isError = true;
//             this.validate();
//             this.setState({
//                 auth: false,
//                 data: null
//             });
//         }

//     })
//     .catch(error => console.log('parsing faild', error))
// }



export const MailVerAction = (data) => {
    console.log('data ', data);
    return (dispatch) => {
        axios({
                url: `${API_PATH}/users/Mailconf.php?mailconf=${data}`,
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data)
            })
            .then(function(response) {
                dispatch({ type: USER_MAIL_VERIFICATION, value: response.data });
            })
            .catch(function(error) {
                console.log(error);
            });
    }
}



export const BibSearchAction = (q) => {
    return (dispatch) => {
        axios.get(`${API_PATH}/biblioRecords/Bibsearch.php?q=${q}`)
            .then(function(response) {
                dispatch({ type: BIB_SEARCH, value: response.data });
            })
            .catch(function(error) {
                console.log(error);
            });
    }
};

export const PassRecoveryAction = (email) => {

    console.log('PassRecoveryAction  email ajax', email);
    return (dispatch) => {
        axios.post(`${API_PATH}/users/Passrecovery.php?email=${email}`)
            .then(function(response) {
                dispatch({ type: PASS_RECOVERY, value: response.data });
            })
            .catch(function(error) {
                console.log(error);
            });
    }
};

export const PassRecoveryEdit = (data) => {
    console.log('data is', data);
    let dat = JSON.stringify(data)
    let url = `${API_PATH}/users/Passrecovery.php?data=${dat}`;

    return (dispatch) => {
        axios.put(url)
            .then(function(response) {
                dispatch({ type: PASS_RECOVERY_EDIT, value: response.data });
            })
            .catch(function(error) {
                console.log(error);
            });
    }
}


export const sendMassage = (data) => {

    let dat = JSON.stringify(data)
    console.log('sendMassage is', dat);
    let url = `${API_PATH}/users/Massage.php?data=${dat}`;

    return (dispatch) => {
        axios.post(url)
            .then(function(response) {
                dispatch({ type: CONTACT_US_MASSAGE, value: response.data });
            })
            .catch(function(error) {
                console.log(error);
            });
    }
}

export const joinMalList = (data) => {

    let dat = JSON.stringify(data)
    console.log('joinMalList is', dat);
    let url = `${API_PATH}/users/Massage.php?data=${dat}`;

    return (dispatch) => {
        axios.put(url)
            .then(function(response) {
                dispatch({ type: JOIN_MAIL_LIST, value: response.data });
            })
            .catch(function(error) {
                console.log(error);
            });
    }
}