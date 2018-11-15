import React, { Component } from 'react';
import {Grid, Button, FormGroup, FormControl } from 'react-bootstrap';
import Header from '../header/Header.js';
import LoginForm from './LoginForm';

class Login extends Component {
  constructor()
  {
    super();
  }

  render() {
    return (
        <Grid fluid className="App" id="login">
            <Header headline="התחברות"/>
            <LoginForm />
        </Grid>
        
    );
  }
}

export default Login;
