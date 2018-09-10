import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import Header from '../header/Header.js';
import LoginForm from './LoginForm';

class Login extends Component {
  constructor()
  {
    super();
  }

  render() {
    return (
        <div className="App" id="login">
            <Header headline="התחברות"/>
            <LoginForm />
        </div>
        
    );
  }
}

export default Login;
