import React, { Component } from "react";
import { Nav, Navbar, NavItem, MenuItem, Row, Col, Grid } from "react-bootstrap";
import { LinkContainer, IndexLinkContainer } from "react-router-bootstrap";
// import { Redirect } from "react-route-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { userLogedIn } from "../../actions";

import logoSrc from "../img/logo1.png";
import { LogOut } from "./LogOut";
import LoginForm from "../auth/LoginForm";
import Takanon from "../pages/Takanon";


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
                <Col xs={10} sm={10} md={10} lg={8} style={TopMargin}>
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
                            <li>
                                <a href="https://www.facebook.com/biblio.co.il/" target="__blank">
                                    {" "}
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                            </li>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                </Col>
                <Col xs={2} sm={2} md={2} lg={4} className="text-center" id="loginFormCont">
                {this.props.loginState ? (
                    <LogOut />
                ) : (   
                    <LoginForm />
                    )}

                {/* <LinkContainer className="btn-warning black topnav-login-logout-btn" to="/" >
                            
                    <MenuItem onClick={this.logOut}> {this.props.loginState  ?  'התנתק/י' : 'התחבר/י'} </MenuItem>
                    </LinkContainer>
                    */}
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
