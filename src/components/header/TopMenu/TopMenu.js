import React, { Component } from "react";
import { Nav, Navbar, NavItem, MenuItem, Row, Col, Grid } from "react-bootstrap";
import { LinkContainer, IndexLinkContainer } from "react-router-bootstrap";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { userLogedIn } from "../../../actions"; //deletes the cookie value 
import logoSrc from "../../img/bibli-logo.png";
import { LogOut } from "../LogOut/LogOut";
import LoginForm from "../../auth/LoginForm/LoginForm";
import SiteMassage from '../SiteMassage/SiteMassage'
import { moveFocus } from '../../Services/MoveFocus';
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
                    <Col xs={12} sm={8} md={9} lg={8} className="mainMenuRowCol">
                        <Navbar id="TopNav" className="nav-noStyle">
                            <Navbar.Header>
                                <Navbar.Brand>
                                    <LinkContainer id="logo" to="/"
                                        onKeyDown={(e) => {
                                            moveFocus(e, {
                                                left: "aboutUsLink"
                                            })
                                        }}
                                    >
                                        <a className="logo">
                                            <img alt="ביבלי לוגו" src={logoSrc} />
                                        </a>
                                    </LinkContainer>
                                </Navbar.Brand>
                                <Navbar.Toggle />
                            </Navbar.Header>
                            <Navbar.Collapse>
                                <Nav>
                                    <li>
                                        <IndexLinkContainer id="aboutUsLink" className="topNavMenuItems black" to="/odot"
                                            onKeyDown={(e) => {
                                                moveFocus(e, {
                                                    left: "faqLink",
                                                    right: "logo",
                                                })
                                            }}
                                        >
                                            <a>מי אנחנו</a>

                                        </IndexLinkContainer>
                                    </li>
                                    <li>
                                        <LinkContainer id="faqLink" className="topNavMenuItems black" to="/faq"
                                            onKeyDown={(e) => {
                                                moveFocus(e, {
                                                    left: "takanonLink",
                                                    right: "aboutUsLink"
                                                })
                                            }}
                                        >
                                            <a>שאלות ותשובות</a>
                                        </LinkContainer>
                                    </li>
                                    <li>
                                        <LinkContainer id="takanonLink" className="topNavMenuItems black" to="/takanon"
                                            onKeyDown={(e) => {
                                                moveFocus(e, {
                                                    left: "contactLink",
                                                    right: "faqLink"
                                                })
                                            }}
                                        >
                                            <a>תנאי שימוש</a>
                                        </LinkContainer>
                                    </li>
                                    <li>
                                        <LinkContainer id="contactLink" className="topNavMenuItems black" to="/contact"
                                            onKeyDown={(e) => {
                                                moveFocus(e, {
                                                    right: "takanonLink"
                                                })
                                            }}
                                        >
                                            <a>צור קשר</a>
                                        </LinkContainer>
                                    </li>
                                    <li>
                                            <a href="/blog" target="_self">
                                                בלוג
                                            </a>
                                    </li>
                                    <li className="facebook">
                                        <a href="https://www.facebook.com/biblio.co.il/" target="__blank">
                                            <i aria-hidden="true" className="fab fa-facebook-f"></i>
                                            <span class="sr-only">facebook</span>
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
