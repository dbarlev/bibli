import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import StickyContact from '../sticky/stickyContact/StickyContact';
import SkipLinks from '../skipLinks';
import TermsOfService from './TermsOfService/TermsOfService';
import './Takanon.scss';

const skipTo = [
  { id: "takanon-mainContent", text: "דלג לאזור המרכזי" },
  { id: "mainMenuRow", text: "דלג לתפריט הראשי" },
  { id: "footer", text: "דלג לסוף העמוד" },
]

class Takanon extends Component {

  componentDidMount() {
    document.querySelector("title").textContent = "ביבלי | תקנון";
  }

  render() {
    return (
      <Grid fluid id="takanon">
        <SkipLinks skipTo={skipTo} />
        <Header />
        <main id="takanon-mainContent">
          <Row>
            <Col md={6} mdOffset={3}>
              <h1>תנאי שימוש באתר bibli.co.il</h1>
              <TermsOfService />
            </Col>
          </Row>
        </main>
        <StickyContact />
        <Footer />
      </Grid>
    );
  }
}

export default Takanon;
