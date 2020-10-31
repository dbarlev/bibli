import {
  GET_BIBLIST_NAMES_FROM_DB,
  DELETE_RECORD_FROM_USER,
  INSERT_RECORD_TO_USER,
  GET_BIBLIST_FROM_DB,
  DELETE_BIBLIST,
  BIB_SEARCH,
  GET_RECORD,
} from "./consts";
import axios from "axios";
import apiPath from "../constants/api";

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

export const BibSearchAction = value => {
  return dispatch => {
    axios
      .get(`${apiPath}/biblioRecords/Bibsearch.php?q=${value}`)
      .then(function (response) {
        dispatch({ type: BIB_SEARCH, value: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};