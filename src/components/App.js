import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button, Grid} from 'react-bootstrap';
import Header from './header/Header.js';
import SubOptions from './subscription/SubOptions';
import Search from './bib/search/Search';
import Footer from './footer/Footer'
import { userLogedIn } from './../actions';

import './App.css';

class App extends Component {
  state = {
       biblistID: -1,
       userid: '',
       auth: ''
     } 
  

  componentDidMount(){
 /*   console.log('appjs');
    let userid = this.state.userid;
    let auth = this.state.auth;
    console.log('appכAF', this.state);

   
    if(auth === true){
      console.log('svvvvv');
      const json = {
        userid,
        auth
      }
      this.props.userLogedIn(json); 
    }
    */
  }

  render() {
    return (
      <Grid className="App">
        <Header headline="ברוכים הבאים לביבלי"/>
        <SubOptions />
        <br />
        <Footer className="site-footer"/>
      </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
