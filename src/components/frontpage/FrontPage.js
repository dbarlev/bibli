import React, { Component } from 'react'
import {Grid} from 'react-bootstrap'; 

import Header from '../header/Header';
import Login from '../auth/LoginForm';
import Slider from './Slider';
import InfoIcons from './InfoIcons';
import PricingTable from './PricingTable';
import Footer from '../footer/Footer';

class FrontPage extends Component {
  render() {
    return (
      <Grid fluid id="frontpage" className="jumbotron-main">
        <Header headline=""/>
        <Slider />
        <Login />
        <InfoIcons />
        // <PricingTable />
        <Footer />
      </Grid>
    )
  }
}

export default FrontPage
