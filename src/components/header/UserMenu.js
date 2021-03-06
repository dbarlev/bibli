import React, { Component } from 'react';
import { Nav, Navbar, Badge, NavItem, InputGroup, MenuItem, Button, FormGroup, FormControl } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from "react-router-bootstrap";
import './UserMenu.scss';
import BibSearch from './BibSearch';

class UserMenu extends Component {


  render() {
    return (
      <Navbar id="userNav" className="nav-noStyle">
        <Navbar.Collapse >
          <Nav>
            <li className="hidden">
              <a href="#" className="white"><Badge>2</Badge> <i aria-hidden="true" className="far fa-bell"></i></a>
            </li >
            <LinkContainer className="topNavMenuItems white hidden" to="#" >
              <NavItem>אזור אישי  </NavItem>
            </LinkContainer>
            <LinkContainer className="topNavMenuItems white" to="/records/biblist" >
              <NavItem>ניהול רשימות ביבליוגרפיות</NavItem>
            </LinkContainer>
            <LinkContainer className="topNavMenuItems white hidden" to="/faq" >
              <NavItem>עזרה</NavItem>
            </LinkContainer>
          </Nav>
          <BibSearch />
        </Navbar.Collapse>
      </Navbar>


    );
  }
}


export default UserMenu;
