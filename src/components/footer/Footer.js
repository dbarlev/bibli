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
        const stickToBottom = this.props.bottom ? "stickToBottom" : null;
        return (
            <div id="footer" className={stickToBottom}>
                <Row>
                    <Col md={12}>
                        <FooterForm />
                    </Col>
                </Row>
                <Row>
                    <Col md={4}></Col>
                    <Col md={4}>
                        <FooterMenu />
                    </Col>
                    <Col md={4}></Col>
                </Row>
            </div>
        )
    }
}

export default Footer;