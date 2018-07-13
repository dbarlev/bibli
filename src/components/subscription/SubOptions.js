import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Button, ButtonGroup } from 'react-bootstrap';
import {chooseSubscription} from '../../actions';

class SubOptions extends Component {

 onChooseSubscription(value)
 {
     
     this.props.chooseSubscription(value);
 }

  render() {
    return (
        <div>
        <ButtonGroup>
            <Button onClick={() => {this.onChooseSubscription(1)}} bsStyle="danger">חבילת חינם</Button>
            <Button onClick={() => {this.onChooseSubscription(2)}} bsStyle="info">חבילת פרימיום</Button>
            <Button onClick={() => {this.onChooseSubscription(3)}} bsStyle="warning">חבילת סופר פרימיום</Button>
        </ButtonGroup>
        </div>  
    );
  }
}

export default connect(null, {chooseSubscription})(SubOptions);

