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

    var packageNameDictionary = {
        1: "חבילת חינם",
        2: "חבילת פרימיום",
        3: "חבילת סופר פרימיום"
    }  

    return (
        <div className="App">
            <Header headline="הרשמה"/>
            <span>בחרת חבילה מסוג:</span>
            <span>{packageNameDictionary[this.props.chooseSubscription]}</span>
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
