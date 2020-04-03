import React, { Component } from "react";
import TopMenu from "./TopMenu/TopMenu";
import { Grid } from "react-bootstrap";
import SkipLinks from '../skipLinks';
import { userLogedIn } from "../../actions";
import { getCookie } from "../Services/GetCookies";

const skipTo = [
  { id: "home-createBib", text: "דלג לאזור המרכזי" },
  { id: "mainMenuRow", text: "דלג לתפריט הראשי" },
  { id: "footer", text: "דלג לסוף העמוד" },
  { id: "FrontRegisterRow", text: "דלג להרשמה" }
]

class Header extends Component {
  state = {
    userid: getCookie("userid"),
    auth: getCookie("auth"),
    username: getCookie("username")
  };

  render() {
    return (
      <>
        <SkipLinks skipTo={skipTo} />
        <Grid className="show-grid">
          <div id="App-header">
            <TopMenu loginState={this.state.auth} />
          </div>
        </Grid>
      </>
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