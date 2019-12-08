import React, { Component } from "react";
import { Grid } from "react-bootstrap";

import Welcome from "./Welcome";

import Login from "../auth/LoginForm";
import Slider from "./Slider";
import InfoIcons from "./InfoIcons";

import Footer from "../footer/Footer";
import { getCookie } from "../Services/GetCookies";

class FrontPage extends Component {
  componentDidMount() {
    let isLoggedin = getCookie("auth");
    if (isLoggedin && isLoggedin !== "")
      this.props.history.push("/records/biblist");
  }

  render() {
    return (
      <Grid fluid id="frontpage" className="jumbotron-main">
        
        <Welcome />

        <InfoIcons />

        <Footer />
      </Grid>
    );
  }
}

export default FrontPage;
