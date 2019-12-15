import React, { Component } from 'react';
import {Grid, Button, FormGroup, FormControl } from 'react-bootstrap';
import Header from '../header/Header.js';
import LoginForm from './LoginForm/LoginForm';

class Login extends Component {
  constructor()
  {
    super();
  }


  render() {
    return (
        <Grid fluid className="App" id="login">
        DAV
            <Header headline="התחברות"/>
            <LoginForm onLoginForm={this}/>
        </Grid>
        
    );
  }
}

export default Login;
