import React, {Component} from 'react';
import { Grid, Row, Col, Nav, NavItem, Navbar, MenuItem } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import logoSrc from '../img/logo.jpg';

class Footer extends Component{
    render(){
  
        return(
            <Grid fluid>
                <Row className="footer">
                    <Col xs={6} md={4}  className="pull-right"> 
                  menu1 
                    </Col>
                    <Col xs={6} md={4} className="pull-right" >
                        menu2
                    </Col>
                    <Col xs={12} md={4} className="pull-right" >
                        image
                    
                        <Navbar.Header >
                            <Navbar.Brand >
                                <LinkContainer to="/" >
                                    <MenuItem className="logo" ><img alt="Bibli Logo" src={logoSrc} /></MenuItem>
                                </LinkContainer>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                    </Col>
                </Row>
            </Grid>

        )
    }
}

export default Footer;