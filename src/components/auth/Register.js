import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import Header from '../header/Header.js'
import RegisterForm from './RegisterForm.js'


class Register extends Component {

  constructor()
  {
    super();
  }

  render() {
    return (
      <div className="App" id="register">
        <Header headline="הרשמה"/>
        <span>חבילה מסוג:
        </span>
        <span>{this.props.chooseSubscription.name}</span>
        <RegisterForm />
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  console.log("state", state)
  return {chooseSubscription: state.chooseSubscription}
}

export default connect(mapStateToProps, {})(Register);
