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
import { addBibListNamesToStore, saveRecordsOnStore } from '../../actions/ajax';
import Footer from '../footer/Footer.js';
import { getCookie } from '../Services/GetCookies';
import { apiClient } from '../../common/apiClient';
import { addRecordFromStorage, getRecordFromStorage } from './services/addRecordFromStorage';
import { constructNewUserRecords } from './services/constructNewUserRecords';
import StickyContact from '../sticky/stickyContact/StickyContact';
import '../App.css';
import ChooseBiblist from './modal/chooseBiblist';

class Records extends Component {

  constructor(props) {
    super(props);
    this.state = {
      biblistID: -1,
      userid: getCookie("userid"),
      auth: getCookie("auth"),
      showChooseBiblistModal: false,
      biblist: []
    }
  }

  async componentWillMount() {
    const { userid, auth } = this.state;

    if (auth) {
      const json = { userid, auth }
      this.props.userLogedIn(json);
      await this.init();
    } else {
      this.props.history.push('/');
    }
  }

  async init() {
    let userid = getCookie("userid");
    let serverResponseForBibList = await apiClient(`/biblist/${userid}`, "get");
    if (serverResponseForBibList && serverResponseForBibList.length > 0) {
      await this.constructExistingUser(userid, serverResponseForBibList);
    }
    else {
      await constructNewUserRecords(userid, this.props);
    }
  }

  async constructExistingUser(userid, serverResponseForBibList) {
    this.props.addBibListNamesToStore(userid, serverResponseForBibList);
    let hasRecordOnStorage = getRecordFromStorage();
    if (!hasRecordOnStorage) {
      await addRecordFromStorage(userid, serverResponseForBibList, this.props);
      this.props.activeBiblist(serverResponseForBibList[0]);
      let serverResponseForRecords = await apiClient(`/biblioRecords/Records.php?userid=${userid}&biblistID=${serverResponseForBibList[0].id}`, "get");
      if (serverResponseForRecords && serverResponseForRecords.length > 0) {
        this.props.saveRecordsOnStore(userid, serverResponseForRecords);
      }
    }
    else if (hasRecordOnStorage) {
      let data = serverResponseForBibList.map((item) => {
        return {
          id: item.id,
          value: item.id,
          label: item.Name
        }
      })
      this.setState({ showChooseBiblistModal: true, biblist: data });
    }
  }

  closeModal = () => {
    this.setState({ showChooseBiblistModal: false, biblist: [] });
  }

  onBiblistChosen = async (selectedOption) => {
    let userid = getCookie("userid");
    let biblist = {
      id: selectedOption.id,
      userid: userid,
      Name: selectedOption.label
    };
    this.props.activeBiblist(biblist);
    await addRecordFromStorage(userid, [biblist], this.props);
    let serverResponseForRecords = await apiClient(`/biblioRecords/Records.php?userid=${userid}&biblistID=${biblist.id}`, "get");
    this.closeModal();
    if (serverResponseForRecords && serverResponseForRecords.length > 0) {
      this.props.saveRecordsOnStore(userid, serverResponseForRecords);
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
        <StickyContact />
        <Footer />
        {this.state.showChooseBiblistModal &&
          <ChooseBiblist
            closeModal={this.closeModal}
            onBiblistChosen={(selectedOption) => this.onBiblistChosen(selectedOption)}
            biblist={this.state.biblist}
          />
        }
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

export default connect(mapStateToProps, { addBibListNamesToStore, userLogedIn, saveRecordsOnStore, activeBiblist })(withRouter(Records));
