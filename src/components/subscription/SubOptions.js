import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Button, ButtonGroup } from 'react-bootstrap';
import {chooseSubscription} from '../../actions';

class SubOptions extends Component {

 constructor(){
    super();
    this.state = {
      subChoosen: "לא נבחרה חבילה"
    }
  }

 onChooseSubscription(value, name)
 {
     this.props.chooseSubscription(value, name);
     this.setState({
         subChoosen: name
    });
 }

  render() {
    return (
        <div>
        <div>
            <span>החבילה שנבחרה: </span>
            <span>{this.state.subChoosen}</span>
        </div>
        <ButtonGroup>
            <Button onClick={() => {this.onChooseSubscription(3, "חבילת סופר פרימיום") }} bsStyle="warning">חבילת סופר פרימיום</Button>
            <Button onClick={() => {this.onChooseSubscription(2, "חבילת פרימיום") }} bsStyle="info">חבילת פרימיום</Button>
            <Button onClick={() => {this.onChooseSubscription(1, "חבילת חינם") }} bsStyle="danger">חבילת חינם</Button>
        </ButtonGroup>
        </div>  
    );
  }
}

export default connect(null, {chooseSubscription})(SubOptions);

