import React, { Component } from 'react';
import TopMenu from './TopMenu.js';
import {Button, Grid} from 'react-bootstrap';
import { connect } from 'react-redux'; 
import { userLogedIn } from '../../actions';
import { getCookie } from '../Services/GetCookies';


class Header extends Component {
  state = {
    userid: getCookie("userid"),
    auth: getCookie("auth"),
    username: getCookie("username")
  } 
  

  componentWillMount(){
    let userid = this.state.userid;
    let auth = this.state.auth;
    let username = this.state.username;

    console.log('this auth', this.state.auth);
    if(auth){
      console.log('logged in');
      const json = {
        userid,
        auth, 
        username
      }
      this.props.userLogedIn(json); 
    }else{
      // debugger;
    console.log('no session');
    }
  }

 
  render() {
  

    return (
        <Grid className="show-grid">
        <div id="App-header">
            <TopMenu loginState={this.state.auth}  />
            <div>
                <h1 className="App-title">{this.props.headline}</h1>
            </div>
        </div>
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
      auth: state.authReducer.auth,
      username: state.authReducer.username
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
