import React, { Component } from 'react'
import {Grid} from 'react-bootstrap'; 

import Header from '../header/Header';
import Login from '../auth/LoginForm';
import Slider from './Slider';
import SecondLine from './SecondLine';

class FrontPage extends Component {
  render() {
    return (
      <Grid fluid id="frontpage" className="jumbotron-main">
        <Header headline=""/>
        <Slider />
        <Login />
      </Grid>
    )
  }
}

export default FrontPage
