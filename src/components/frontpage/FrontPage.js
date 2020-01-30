import React, { Component } from "react";
import { Grid } from "react-bootstrap";
import Welcome from "./Welcome";
import FrontRegister from '../auth/FrontRegister/FrontRegister';
import Footer from "../footer/Footer";
import { getCookie } from "../Services/GetCookies";
import AboutUs from "./AboutUs/AboutUs";
import StatisticsRow from "./StatisticsRow/StatisticsRow";
import FrontFaq from "./FrontFaq/FrontFaq";
import StickyContact from "../stickyContact/StickyContact";
import WarningPopup from '../Modal/warningPopup/WarningPopup';

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
        <FrontRegister />
        <AboutUs />
        <StatisticsRow />
        <FrontFaq />
        <StickyContact />
        <Footer />
      </Grid>
    );
  }
}

export default FrontPage;
