import React, { Component } from "react";
import { Nav, Navbar, NavItem, MenuItem, Row, Col, Grid } from "react-bootstrap";
import { LinkContainer, IndexLinkContainer } from "react-router-bootstrap";
// import { Redirect } from "react-route-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { userLogedIn } from "../../../actions";

import logoSrc from "../../img/logo1.png";
import { LogOut } from "../LogOut";
import LoginForm from "../../auth/LoginForm/LoginForm";
import Takanon from "../../pages/Takanon";
import "./TopMenu.scss"


const texts = {
    "": "התחבר/י",
    true: "התנתק/י"
};

function eraseCookie(name) {
    document.cookie = name + "=; Max-Age=-99999999;";
}

class TopMenu extends Component {
    logOut = () => {
        eraseCookie("auth");
        eraseCookie("userid");
        eraseCookie("username");

        this.props.userLogedIn();
        return <Redirect to="/" />;
    };

    render() {
        {
            console.log("this.props.loginState ", this.props.loginState);
        }
        return (
            <Grid fluid className="container">
                <Row>
                    <Col xs={12} sm={8} md={7} lg={7} style={TopMargin}>
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
                    <Col xs={6} sm={4} md={5} lg={5} className="text-center" id="loginFormCont">
                        {this.props.loginState ? (
                            <LogOut />
                        ) : (
                                <LoginForm />
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
    marginTop: "27px"
};
