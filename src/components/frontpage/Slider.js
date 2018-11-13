import React, { Component } from 'react';
import {Grid, Jumbotron, Button, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
class Slider extends Component {
  render() {
    return (
      <Grid fluid id="slider" className="text-center">
        <Jumbotron>
            <h1>ברוכים הבאים ל- Bibli!</h1>
            <p>
            לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית לפרומי בלוף קינץ תתיח לרעח. לת צשחמי צש בליא, מנסוטו צמלח לביקו ננבי, צמוקו בלוקריה שיצמה ברורק. מוסן מנת. 
            </p>
            <p id="slider-btn">
                <Button bsStyle="primary" className="btn-yellow"> <Link to="/register"> אינך רשום? התחבר <i class="fas fa-chevron-left btn-yellow"></i></Link></Button>
            </p>
        </Jumbotron>

      </Grid>
    )
  }
}

export default Slider
