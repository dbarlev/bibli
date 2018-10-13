import React, { Component } from 'react';
import TopMenu from './TopMenu.js';
import UserMenu from './UserMenu.js';
import {Button} from 'react-bootstrap';



class HeaderLogin extends Component {
  render() {
  

    return (
       <div id="App-header">
            <TopMenu loginState="2" />
            <div className="row user-menu">
                <div className="col-md-12">
                    <UserMenu loginState="2"  />
                </div>
            </div>
        </div>
    );
  }
}

export default HeaderLogin;
