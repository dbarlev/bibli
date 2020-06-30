
import React, { Component } from 'react';
import { Grid, Row, Col, Nav, NavItem, Navbar, MenuItem, FormGroup, FormControl, Button } from 'react-bootstrap';
import './Footer.scss';
import FooterMenu from './FooterMenu/FooterMenu';
import FooterForm from './FooterForm/FooterForm';

class Footer extends Component {
    constructor() {
        super()
    }


    render() {
        const footerStyle = this.props.bottom ? "stickToBottom" : "relative-inline";
        return (
            <footer id="footer" className={footerStyle}>
                <Row>
                    <Col md={12}>
                        <FooterForm />
                    </Col>
                </Row>
                <Row>
                    <Col md={4}></Col>
                    <Col lg={5} md={6}>
                        <FooterMenu />
                    </Col>
                    <Col md={4}></Col>
                </Row>
            </footer>
        )
    }
}

export default Footer;