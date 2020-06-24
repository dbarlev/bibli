import {
  GET_BIBLIST_NAMES_FROM_DB,
  DELETE_RECORD_FROM_USER,
  INSERT_RECORD_TO_USER,
  INSERT_USER_TO_DB,
  UPDATE_USER_DATA,
  GET_BIBLIST_FROM_DB,
  USER_MAIL_VERIFICATION,
  DELETE_BIBLIST,
  BIB_SEARCH,
  GET_RECORD,
  PASS_RECOVERY,
  PASS_RECOVERY_EDIT,
  CONTACT_US_MASSAGE,
  JOIN_MAIL_LIST,
  USER_LOGIN,
  GET_POSTS_FROM_WP
} from "./consts";
import axios from "axios";
import apiPath from "../constants/api";

const WordpressApiPath = "http://blog.bibli.co.il/wp-json/wp/v2";

export const addBibListNamesToStore = (userid, list) => {
  return dispatch => {
    dispatch({
      type: GET_BIBLIST_NAMES_FROM_DB,
      value: list,
      userid: userid
    });
  }
};

export const saveRecordsOnStore = (userid, listOfRecords) => {
  return dispatch => {
    dispatch({
      type: GET_BIBLIST_FROM_DB,
      value: listOfRecords,
      userid: userid
    });
  }
};

export const getSingleRecord = recordID => {
  return dispatch => {
    axios
      .get(`${apiPath}/biblioRecords/Records.php?recordID=${recordID}`)
      .then(function (response) {
        dispatch({ type: GET_RECORD, value: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const removeSingleRecordFromStore = () => {
  return dispatch => {
    dispatch({ type: GET_RECORD, value: [] });
  };
};

export const DeleteRecordFromUser = (userID, recordID, biblistID) => {
  return dispatch => {
    axios
      .put(
        `${apiPath}/biblioRecords/Records.php/?userid=${userID}&recordID=${recordID}&biblistID=${biblistID}`
      )
      .then(function (response) {
        dispatch({ type: DELETE_RECORD_FROM_USER, value: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const EditRecord = data => {
  return dispatch => {
    axios({
      url: `${apiPath}/biblioRecords/Records.php`,
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      data: JSON.stringify(data)
    })
      .then(function (response) {
        dispatch({ type: INSERT_RECORD_TO_USER, value: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const EditBiblistName = (userID, biblistID, name) => {
  let data = {
    userID,
    biblistID,
    name
  };

  return dispatch => {
    axios({
      url: `${apiPath}/biblioRecords/Biblist.php`,
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      data: JSON.stringify(data)
    })
      .then(function (response) {
        dispatch({
          type: GET_BIBLIST_NAMES_FROM_DB,
          value: response.data,
          editName: true
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const DeleteBibList = (userID, biblistID) => {
  return dispatch => {
    axios
      .delete(
        `${apiPath}/biblioRecords/Biblist.php/?userid=${userID}&biblistID=${biblistID}`
      )
      .then(function (response) {
        dispatch({ type: DELETE_BIBLIST, value: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const InsertRecordToDB = (data, listID) => {
  return dispatch => {
    axios({
      url: `${apiPath}/biblioRecords/Records.php`,
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      data: JSON.stringify(data)
    })
      .then(function (response) {
        dispatch({ type: INSERT_RECORD_TO_USER, value: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const InsertBibListToDB = data => {
  return dispatch => {
    axios({
      url: `${apiPath}/biblioRecords/Biblist.php`,
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      data: JSON.stringify(data)
    })
      .then(function (response) {
        dispatch({
          type: GET_BIBLIST_NAMES_FROM_DB,
          value: response.data,
          newName: true
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

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

/*edit/insert user data from userdata page */ 
export const EditUserData = data => {
  console.log('ajax EditUserData', data)
  return dispatch => {
    axios({
      url: `${apiPath}/users/User.php`,
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      data: JSON.stringify(data)
    })
      .then(function (response) {
        console.log('return from php EditUserData', response)
        dispatch({ type: UPDATE_USER_DATA, value: response.data });
       
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

export const BibSearchAction = q => {
  return dispatch => {
    axios
      .get(`${apiPath}/biblioRecords/Bibsearch.php?q=${q}`)
      .then(function (response) {
        dispatch({ type: BIB_SEARCH, value: response.data });
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



export const getPostsFromWp = () =>{
  return dispatch => {
    axios
      .get(`${WordpressApiPath}/posts`)
      .then(function (response) {
        console.log(response)
        dispatch({ type: GET_POSTS_FROM_WP, value: response });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}