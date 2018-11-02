import React, { Component } from 'react';
import TopMenu from './TopMenu.js';
import {Button, Grid} from 'react-bootstrap';



class Header extends Component {
  render() {
  

    return (
        <Grid className="show-grid">
        <div id="App-header">
            <TopMenu loginState="1"  />
            <div>
                <h1 className="App-title">{this.props.headline}</h1>
            </div>
        </div>
        </Grid>
    );
  }
}

export default Header;
