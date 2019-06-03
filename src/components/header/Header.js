import React, { Component } from 'react';
import TopMenu from './TopMenu.js';
import {Button, Grid} from 'react-bootstrap';
import { connect } from 'react-redux'; 
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
            {console.log('this.state.auth', this.state.auth )}
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
