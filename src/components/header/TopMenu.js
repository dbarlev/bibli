import React, { Component } from 'react';
import {Nav, Navbar, NavItem, MenuItem, NavDropdown, Button, FormGroup, FormControl } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer  } from "react-router-bootstrap";
import { Link  } from 'react-router-dom';


import logoSrc from '../img/logo1.png';

const texts = {
    1: "התחבר/י",
    2: "התנתק/י"    
}


class TopMenu extends Component {

        
  render() {
    return (
    <Navbar id="TopNav" className="nav-noStyle">
            <Navbar.Header className="pull-right">
                <Navbar.Brand >
                <LinkContainer to="/" >
                    <MenuItem className="logo pull-right"><img alt="Bibli Logo" src={logoSrc} /></MenuItem>
                </LinkContainer>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse >
                <Nav pullRight>
                    <LinkContainer className="btn-warning black topnav-login-logout-btn" to="/login" >
                            <MenuItem> {texts[this.props.loginState]} </MenuItem>
                    </LinkContainer>
                    <li>
                       <a href="#"> <i class="fab fa-facebook-f"></i></a>
                    </li > 
                    <li>
                       <a href="#"><i class="fas fa-search"></i><span className="seperator">|</span></a>
                    </li > 
                    <LinkContainer className="topNavMenuItems black" to="/login" >
                        <NavItem>צור קשר</NavItem>
                    </LinkContainer>
                    <LinkContainer className="topNavMenuItems black" to="/register" >
                        <NavItem>תנאי שימוש</NavItem>
                    </LinkContainer>
                     <LinkContainer className="topNavMenuItems black"  to="/adminPanel" >
                        <NavItem>צור רשומה</NavItem>
                    </LinkContainer>
                    <IndexLinkContainer className="topNavMenuItems black" to="/" >
                        <NavItem>מי אנחנו</NavItem>
                    </IndexLinkContainer>  
                </Nav>
            </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default TopMenu;
