import React, { Component } from "react";
import { Grid } from "react-bootstrap";

import NewWelcome from "./newWelcome";
import Header from "../header/Header";
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
        <Header headline="" />
        <NewWelcome />

        <InfoIcons />

        <Footer />
      </Grid>
    );
  }
}

export default FrontPage;
