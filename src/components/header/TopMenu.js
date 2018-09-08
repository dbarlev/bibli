import React, { Component } from 'react';
import {Nav, Navbar, NavItem, MenuItem, NavDropdown, Button, FormGroup, FormControl } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer  } from "react-router-bootstrap";
import { Link  } from 'react-router-dom';


import logoSrc from '../img/logo.jpg';



class TopMenu extends Component {
  render() {
    return (
    <Navbar fluid collapseOnSelect>
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
                     <LinkContainer to="/aboutus" >
                        <NavItem>אודות</NavItem>
                    </LinkContainer>
                    <IndexLinkContainer  to="/" >
                        <NavItem>בית</NavItem>
                    </IndexLinkContainer >
                </Nav>
                <Navbar.Form pullLeft>
                    <FormGroup>
                        <FormControl type="text" placeholder="Search" />
                    </FormGroup>
                        <Button type="submit">Submit</Button>
                </Navbar.Form>
                <Nav pullLeft>
                    <LinkContainer to="/login" >
                        <NavItem>התחברות</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/register" >
                        <NavItem>הרשמה</NavItem>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default TopMenu;
