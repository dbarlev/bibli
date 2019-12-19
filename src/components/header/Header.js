import React, { Component } from "react";
import TopMenu from "./TopMenu/TopMenu";
import { Button, Grid, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { userLogedIn } from "../../actions";
import { getCookie } from "../Services/GetCookies";

class Header extends Component {
  state = {
    userid: getCookie("userid"),
    auth: getCookie("auth"),
    username: getCookie("username")
  };

  componentWillMount() {
    /*
    let userid = this.state.userid;
    let auth = this.state.auth;
    let username = this.state.username;
    if (auth) {
      console.log("logged in x");
      const json = {
        userid,
        auth,
        username
      };
      this.props.userLogedIn(json);
    } else {
      this.setState({ auth: false });
      console.log("no session");
    }
    */
    console.log("this.state ", this.state);
  }

  render() {
    return (
      <Grid className="show-grid">
        <div id="App-header">
          <TopMenu loginState={this.state.auth} />
        </div>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userLogedIn: params => dispatch(userLogedIn(params))
  };
};

const mapStateToProps = state => {
  return {
    userid: state.authReducer.userid,
    auth: state.authReducer.auth,
    username: state.authReducer.username
  };
};

//export default connect(mapStateToProps, mapDispatchToProps)(Header);

export default Header;