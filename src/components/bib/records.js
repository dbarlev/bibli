import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import AddBibList from './listOfRecords/AddBibList';
import EditRecord from './records/EditRecord';
import AddRecord from './records/AddRecord';
import HeaderLogin from '../header/HeaderLogin.js';
import BibList from './records/BibList';
import ListOfBiblist from './listOfRecords/ListOfBiblist';
import EditBiblist from './listOfRecords/EditBiblist';
import { userLogedIn, activeBiblist } from '../../actions';
import { addBibListNamesToStore, saveRecordsOnStore, InsertBibListToDB } from '../../actions/ajax';
import Footer from '../footer/Footer.js';
import { getCookie } from '../Services/GetCookies';
import { apiClient } from '../../common/apiClient';
import '../App.css';

class Records extends Component {

  constructor() {
    super();
    this.state = {
      biblistID: -1,
      userid: getCookie("userid"),
      auth: getCookie("auth"),
    }
  }

  async componentDidMount() {
    let userid = getCookie("userid");
    let serverResponseForRecords = await apiClient(`/biblioRecords/Records.php?userid=${userid}&biblistID=0`, "get");
    let serverResponseForBibList = await apiClient(`/biblist/${userid}`, "get");

    if (serverResponseForBibList && serverResponseForBibList.length > 0) {
      this.props.addBibListNamesToStore(userid, serverResponseForBibList);
      if (serverResponseForBibList.length == 1) {
        this.props.activeBiblist(serverResponseForBibList[0]);
      }

      if (serverResponseForRecords && serverResponseForRecords.length > 0) {
        this.props.saveRecordsOnStore(userid, serverResponseForRecords);
      }
    }
    else {
      this.props.InsertBibListToDB({ userid, name: "עבודה מספר 1" });
      this.props.history.push("/records/addRecord/ApaBooks")
    }
  }


  componentWillMount() {
    let userid = this.state.userid;
    let auth = this.state.auth;


    if (auth) {
      const json = {
        userid,
        auth
      }
      this.props.userLogedIn(json);
    } else {
      // debugger;
      this.props.history.push('/');
    }
  }


  render() {
    return (
      <div className="App">

        <HeaderLogin />
        <br />
        <div className="mainArea userBiblist">
          <div className="row">
            <div className="col-md-2 col-md-offset-2 col-sm-4 col-xs-12">
              <ListOfBiblist userid={Number(this.state.userid)} />
            </div>
            <div className="col-md-8 col-sm-8" >
              <Route path="/records/biblist" component={BibList} />
              <Route path="/records/addNewList" component={AddBibList} />
              <Route path="/records/addRecord" component={AddRecord} />
              <Route path="/records/editList" component={EditBiblist} />
              <Route path="/records/editRecord/:type/:id" component={EditRecord} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    userid: state.authReducer.userid,
    auth: state.authReducer.auth
  }
}

export default connect(mapStateToProps, { InsertBibListToDB, userLogedIn, addBibListNamesToStore, saveRecordsOnStore, activeBiblist })(withRouter(Records));
