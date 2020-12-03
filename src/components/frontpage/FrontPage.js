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
import StickyContact from "../sticky/stickyContact/StickyContact";
import SkipLinks from '../skipLinks';

const skipTo = [
  { id: "mainContent", text: "דלג לאזור המרכזי" },
  { id: "mainMenuRow", text: "דלג לתפריט הראשי" },
  { id: "footer", text: "דלג לסוף העמוד" },
  { id: "FrontRegisterRow", text: "דלג להרשמה" },
  { id: "home-createBib", text: "דלג ליצירת פריט ביבליוגרפיה ראשון" }
]

class FrontPage extends Component {

  constructor() {
    super();
  }

  componentDidMount() {
    if (window.top.location.href == "http://stage.bibli.co.il/checkout") {
      window.location.href = "http://stage.bibli.co.il";
    }

    document.querySelector("title").textContent = "ביבלי | מערכת ליצירת רשומות ביבליוגרפיות";

    let isLoggedin = getCookie("auth");
    if (isLoggedin && isLoggedin !== "")
      this.props.history.push("/records/biblist");
  }

  render() {
    return (
      <Grid fluid id="frontpage" className="jumbotron-main">
        <SkipLinks skipTo={skipTo} />
        <Welcome />
        <FrontRegister />
        <main id="mainContent">
          <CreateBibItem />
          <AboutUs />
          <FrontFaq />
          <StatisticsRow />
          <StickyContact />
        </main>
        <Footer />
      </Grid>
    );
  }
}

export default FrontPage;
