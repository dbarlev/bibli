import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AddBibList from './listOfRecords/AddBibList';
import EditRecord from './records/EditRecord';
import AddRecord from './records/AddRecord';
import HeaderLogin from '../header/HeaderLogin.js';
import BibList from './records/BibList';
import ListOfBiblist from './listOfRecords/ListOfBiblist';
import EditBiblist from './listOfRecords/EditBiblist';
import { userLogedIn } from '../../actions';
import Footer from '../footer/Footer.js';
import { getCookie } from '../Services/GetCookies';
import '../App.css';

class Records extends Component {

  constructor()
  {
     super();
     this.state = {
       biblistID: -1,
       userid: getCookie("userid"),
       auth: getCookie("auth"),
     } 
  }

  componentWillMount(){
    let userid = this.state.userid;
    let auth = this.state.auth;

   
    if(auth){
      const json = {
        userid,
        auth
      }
      this.props.userLogedIn(json); 
    }else{
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
              <div className="col-md-2 col-md-offset-2">    
                    <ListOfBiblist userid={Number(this.state.userid)}/>          
                </div>
                <div className="col-md-7"> 
                    <Route path="/records/biblist" component={BibList} />
                    <Route path="/records/addNewList" component={AddBibList}/>
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

const mapDispatchToProps = dispatch => {
  return {
      userLogedIn: (params) => dispatch(userLogedIn(params))
  };
};


const mapStateToProps = state => {
  return{
      userid: state.authReducer.userid,
      auth: state.authReducer.auth
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Records);

