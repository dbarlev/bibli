import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import HeaderLogin from '../header/HeaderLogin.js';
import BibList from './records/BibList';
import ListOfBiblist from './listOfRecords/ListOfBiblist';
import { userLogedIn } from '../../actions';
import Footer from '../footer/Footer.js';

import '../App.css';


class ShowUserBibList extends Component {

  constructor()
  {
     super();
     this.state = {
       biblistID: -1,
       userid: localStorage.getItem('userid'),
       auth: localStorage.getItem('auth')
     } 
  }

  componentWillMount(){
    const userid = this.state.userid;
    const auth = this.state.auth;

    if(auth == true){
      const json = {
        userid,
        auth
      }
      this.props.userLogedIn(json); 
    }else{
      // debugger;
      return <Redirect to='/' />
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
                    <ListOfBiblist />  
                          
                </div>
                <div className="col-md-6">               
                    <BibList />
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

export default connect(mapStateToProps, mapDispatchToProps)(ShowUserBibList);

