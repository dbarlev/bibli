import React, { Component } from 'react';
import {Nav, Navbar,Badge, NavItem,InputGroup, MenuItem, Button, FormGroup, FormControl } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer  } from "react-router-bootstrap";
import { Link  } from 'react-router-dom';

const texts = {
    1: "התחבר/י",
    2: "התנתק/י"    
}


class UserMenu extends Component {

        
  render() {
    return (
    <Navbar id="userNav" className="nav-noStyle">
            <Navbar.Collapse >
                <Nav pullRight>
                    <LinkContainer className="topNavMenuItems white" to="/register" >
                        <NavItem>עזרה</NavItem>
                    </LinkContainer>
                     <LinkContainer className="topNavMenuItems white"  to="/register" >
                        <NavItem>ניהול רשימות ביבליוגרפיות</NavItem>
                    </LinkContainer>
                    <LinkContainer className="topNavMenuItems white" to="/login" >
                        <NavItem>אזור אישי </NavItem>
                    </LinkContainer>  
                    <li>
                       <a href="#" className="white"><Badge>2</Badge> <i className="far fa-bell"></i></a>
                    </li >
                </Nav>
                 <Navbar.Form>
                    <FormGroup className="searchArea">
                        <InputGroup>
                            <FormControl className="searchRecord" placeholder="חיפוש מאמר" type="text" />
                            <InputGroup.Button>
                                <Button className="searchRecordBtn"><i className="fas fa-search"></i></Button>
                            </InputGroup.Button>
                        </InputGroup>
                    </FormGroup>            
                </Navbar.Form>
            </Navbar.Collapse>
      </Navbar>

      
    );
  }
}

export default UserMenu;
