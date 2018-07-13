import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import Header from '../header/Header.js'

class Register extends Component {

 constructor()
 {
    super();
  }

  render() {

    return (
        <div className="App">
            <Header headline="הרשמה"/>
            <span>חבילה מסוג: </span>
            <span>{this.props.chooseSubscription.name}</span>
        </div>
        
    );
  }
}

const mapStateToProps = (state) => {
    console.log("state",state)
    return {
       chooseSubscription: state.chooseSubscription
    }
}

export default connect(mapStateToProps, {})(Register);
