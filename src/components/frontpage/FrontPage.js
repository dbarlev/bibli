import React, { Component } from "react";
import { Grid } from "react-bootstrap";
import Welcome from "./Welcome";
import FrontRegister from '../auth/FrontRegister/FrontRegister';
import Footer from "../footer/Footer";
import { getCookie } from "../Services/GetCookies";
import AboutUs from "./AboutUs/AboutUs";
import CreateBibItem from "./CreateBibItem/CreateBibItem";
import StatisticsRow from "./StatisticsRow/StatisticsRow";
import FrontFaq from "./FrontFaq/FrontFaq";
import StickyContact from "../stickyContact/StickyContact";


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
        <CreateBibItem />
        <AboutUs />
        <FrontFaq />
        <StatisticsRow />
        <StickyContact />
        <Footer />
      </Grid>
    );
  }
}

export default FrontPage;
