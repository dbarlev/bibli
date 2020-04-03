import React, { Component } from "react";
import TopMenu from "./TopMenu/TopMenu";
import { Grid } from "react-bootstrap";
import { getCookie } from "../Services/GetCookies";

class Header extends Component {
  state = {
    userid: getCookie("userid"),
    auth: getCookie("auth"),
    username: getCookie("username")
  };

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

export default Header;