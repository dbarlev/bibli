import React, { Component } from 'react';
import { connect } from 'react-redux';
import TopMenu from './TopMenu/TopMenu';
import UserMenu from './UserMenu.js';
import { userLogedIn } from '../../actions';
import { getCookie } from '../Services/GetCookies';

class HeaderLogin extends Component {
  state = {
    userid: getCookie("userid"),
    auth: getCookie("auth"),
    username: getCookie("username")
  }


  componentWillMount() {
    let userid = this.state.userid;
    let auth = this.state.auth;
    let username = this.state.username;

    if (auth) {
      const json = {
        userid,
        auth,
        username
      }
      this.props.userLogedIn(json);
    }
  }

  render() {


    return (
      <div id="App-header" className="container-fluid">
        <TopMenu loginState={this.state.auth} />
        <div className="row user-menu">
          <div className="col-md-12 col-lg-12">
            <UserMenu loginState={this.state.auth} />
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
  return {
    userid: state.authReducer.userid,
    auth: state.authReducer.auth,
    username: state.authReducer.username
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLogin);
