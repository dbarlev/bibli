import React, { Component } from 'react';
import {Nav, Navbar,Badge, NavItem,InputGroup, MenuItem, Button, FormGroup, FormControl } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer  } from "react-router-bootstrap";
import BibSearch from './BibSearch';
import { Link  } from 'react-router-dom';


class UserMenu extends Component {


  render() {
    return (
    <Navbar id="userNav" className="nav-noStyle">
            <Navbar.Collapse >
                <Nav pullRight>
                    <li>
                       <a href="#" className="white"><Badge>2</Badge> <i className="far fa-bell"></i></a>
                    </li >
                    <LinkContainer className="topNavMenuItems white" to="/login" >
                        <NavItem>אזור אישי  </NavItem>
                    </LinkContainer> 
                     <LinkContainer className="topNavMenuItems white"  to="/register" >
                        <NavItem>ניהול רשימות ביבליוגרפיות</NavItem>
                    </LinkContainer>
                    <LinkContainer className="topNavMenuItems white" to="/register" >
                        <NavItem>עזרה</NavItem>
                    </LinkContainer>
                     
                    
                </Nav>
                 <Navbar.Form>
                   
                            <BibSearch />
                           
                </Navbar.Form>
            </Navbar.Collapse>
      </Navbar>

      
    );
  }
}


export default UserMenu;
