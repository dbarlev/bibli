import React, { Component } from 'react'
import {Grid} from 'react-bootstrap'; 

import NewWelcome from './newWelcome';
import Header from '../header/Header';
import Login from '../auth/LoginForm';
import Slider from './Slider';
import InfoIcons from './InfoIcons';
import FrontRegister from '../auth/FrontRegister';
import Footer from '../footer/Footer';
import { getCookie } from '../Services/GetCookies';


class FrontPage extends Component {

  componentDidMount(){
    let isLoggedin = getCookie("auth");
    if(isLoggedin)
      this.props.history.push("/records/biblist");
  }

  render() {
    return (
      <Grid fluid id="frontpage" className="jumbotron-main">
        <Header headline=""/>
        <NewWelcome />
        
       
        <FrontRegister />
        <InfoIcons />
       
        <Footer />
      </Grid>
    )
  }
}

export default FrontPage
