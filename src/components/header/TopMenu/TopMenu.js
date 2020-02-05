import React, { Component } from "react";
import { Nav, Navbar, NavItem, MenuItem, Row, Col, Grid } from "react-bootstrap";
import { LinkContainer, IndexLinkContainer } from "react-router-bootstrap";
// import { Redirect } from "react-route-dom";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";

import { userLogedIn } from "../../../actions"; //deletes the cookie value 

import logoSrc from "../../img/bibli-logo.png";
import { LogOut } from "../LogOut/LogOut";
import LoginForm from "../../auth/LoginForm/LoginForm";
import Takanon from "../../pages/Takanon";
import SiteMassage from '../SiteMassage/SiteMassage'
import "./TopMenu.scss"


function eraseCookie(name) {
    document.cookie = name + "=; Max-Age=-99999999;";
}

class TopMenu extends Component {

    constructor() {

        super();

        this.state = {
            showErrClass: false
        }
    }

    logOut = () => {
        eraseCookie("auth");
        eraseCookie("userid");
        eraseCookie("username");

        this.props.userLogedIn();
        return <Redirect to="/" />;
    };


    render() {

        const { showErrClass } = this.state;
        return (
            <Grid fluid className="container">
                <SiteMassage />
                <Row id="mainMenuRow" className={showErrClass ? "showMsg" : ""}>
                    <Col xs={12} sm={8} md={9} lg={8} style={TopMargin} className="mainMenuRowCol">
                        <Navbar id="TopNav" className="nav-noStyle">
                            <Navbar.Header>
                                <Navbar.Brand>
                                    <LinkContainer to="/">
                                        <MenuItem className="logo">
                                            <img alt="Bibli Logo" src={logoSrc} />
                                        </MenuItem>
                                    </LinkContainer>
                                </Navbar.Brand>
                                <Navbar.Toggle />
                            </Navbar.Header>
                            <Navbar.Collapse>
                                <Nav>
                                    <IndexLinkContainer className="topNavMenuItems black" to="/odot">
                                        <NavItem>מי אנחנו</NavItem>
                                    </IndexLinkContainer>

                                    <LinkContainer className="topNavMenuItems black" to="/faq">
                                        <NavItem>שאלות ותשובות</NavItem>
                                    </LinkContainer>
                                    <LinkContainer className="topNavMenuItems black" to="/takanon">
                                        <NavItem>תנאי שימוש</NavItem>
                                    </LinkContainer>
                                    <LinkContainer className="topNavMenuItems black" to="/contact">
                                        <NavItem>צור קשר</NavItem>
                                    </LinkContainer>
                                    <li className="facebook">
                                        <a href="https://www.facebook.com/biblio.co.il/" target="__blank">
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                    </li>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </Col>
                    <Col xs={6} sm={4} md={3} lg={4} className="text-center" id="loginFormCont">
                        {this.props.loginState ? (
                            <LogOut />
                        ) : (
                                <LoginForm showError={() => this.setState({ showErrClass: true })} />
                            )}
                    </Col>
                </Row>
            </Grid>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userLogedIn: params => dispatch(userLogedIn(params))
    };
};





export default connect(
    null,
    mapDispatchToProps
)(TopMenu);

const TopMargin = {
    marginTop: "77px"
};
