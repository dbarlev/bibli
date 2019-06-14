import React, { Component } from 'react';
import {Grid, Jumbotron, Button, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { headerPic } from '../img/header-pic.jpg';

class Slider extends Component {
  render() {
    return (
      <Grid fluid id="slider" className="text-center">
        <Jumbotron>
            <h1 className="white bold">ברוכים הבאים ל- Bibli!</h1>
            <p className="white">
            לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית לפרומי בלוף קינץ תתיח לרעח. לת צשחמי צש בליא, מנסוטו צמלח לביקו ננבי, צמוקו בלוקריה שיצמה ברורק. מוסן מנת. 
            </p>
            <p id="slider-btn">
                <Button bsStyle="primary" className="btn-yellow blue-text"> <Link to="/register"> קפצו להרשמה <i className="fas fa-chevron-left btn-yellow"></i></Link></Button>
            </p>
        </Jumbotron>

      </Grid>
    )
  }
}

export default Slider
