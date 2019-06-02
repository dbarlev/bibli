import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import {Button} from 'react-bootstrap';

import TopMenu from './TopMenu.js';
import UserMenu from './UserMenu.js';
import { userLogedIn } from '../../actions';


function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
class HeaderLogin extends Component {
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
    console.log('no session HeaderLogIn');
    }
  }

  render() {
  

    return (
       <div id="App-header">
            <TopMenu loginState={this.state.auth} />
            <div className="row user-menu">
                <div className="col-md-12">
                    <UserMenu loginState={this.state.auth}  />
                </div>
            </div>
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
      auth: state.authReducer.auth,
      username: state.authReducer.username
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLogin);
