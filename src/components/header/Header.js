import React, { Component } from 'react';
import TopMenu from './TopMenu.js';
import {Button} from 'react-bootstrap';



class Header extends Component {
  render() {
  

    return (
       
        <div className="App-header">
            <TopMenu />
            <div>
                <h1 className="App-title">{this.props.headline}</h1>
            </div>
        </div>
    );
  }
}

export default Header;
