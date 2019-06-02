import React, { Component } from 'react';
import {Nav, Navbar, NavItem, MenuItem, NavDropdown, Button, FormGroup, FormControl } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer  } from "react-router-bootstrap";
// import { Redirect } from "react-route-dom";
import { Redirect  } from 'react-router-dom';
import { connect  } from 'react-redux';

import { userLogedIn } from '../../actions';

import logoSrc from '../img/logo1.png';

const texts = {
    null: "התחבר/י",
    true: "התנתק/י"    
}

function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}

class TopMenu extends Component {

    logOut = () => {
        eraseCookie('auth')
        eraseCookie('userid')
        eraseCookie('username')

        this.props.userLogedIn();
        return <Redirect to='/' />
    }

  render() {
      
    return (
    <Navbar id="TopNav" className="nav-noStyle">
    {console.log('aaaaaa',this.props)}
            <Navbar.Header>
                <Navbar.Brand >
                <LinkContainer to="/" >
                    <MenuItem className="logo"><img alt="Bibli Logo" src={logoSrc} /></MenuItem>
                </LinkContainer>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse >
                <Nav>
                    <IndexLinkContainer className="topNavMenuItems black" to="/" >
                        <NavItem>מי אנחנו</NavItem>
                    </IndexLinkContainer>  


                    <LinkContainer className="topNavMenuItems black" to="/faq" >
                        <NavItem>שאלות ותשובות</NavItem>
                    </LinkContainer>    
                    <LinkContainer className="topNavMenuItems black" to="/register" >
                        <NavItem>תנאי שימוש</NavItem>
                    </LinkContainer>
                     <LinkContainer className="topNavMenuItems black"  to="/biblist" >
                        <NavItem>צור קשר</NavItem>
                    </LinkContainer>
                    <li>
                       <a href="#"> <i className="fab fa-facebook-f"></i></a>
                    </li > 
                    <li>
                       <a href="#"><i className="fas fa-search"></i><span className="seperator">|</span></a>
                    </li > 
                    <LinkContainer className="btn-warning black topnav-login-logout-btn" to="/" >
                            <MenuItem onClick={this.logOut}> {texts[this.props.loginState]} </MenuItem>
                    </LinkContainer>

                </Nav>
            </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return {
        userLogedIn: (params) => dispatch(userLogedIn(params))
    };
};


export default connect(null, mapDispatchToProps)(TopMenu);
