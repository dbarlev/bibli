import React, { Component } from 'react'
import {Grid} from 'react-bootstrap'; 

import Header from '../header/Header';
import Login from '../auth/LoginForm';
import Slider from './Slider';
import InfoIcons from './InfoIcons';
import FrontRegister from '../auth/FrontRegister';
import Footer from '../footer/Footer';

class FrontPage extends Component {
  render() {
    return (
      <Grid fluid id="frontpage" className="jumbotron-main">
        <Header headline=""/>
        <Slider />
        <FrontRegister />
        <InfoIcons />
       
        <Footer />
      </Grid>
    )
  }
}

export default FrontPage
