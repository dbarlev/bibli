import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer, IndexLinkContainer } from "react-router-bootstrap";
import './FooterMenu.scss';

class FooterMenu extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div id="FooterMenu">
                <ul>
                    <LinkContainer to="/takanon">
                        <NavItem>תקנון</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/contact">
                        <NavItem>דברו איתנו</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/">
                        <NavItem>האזור האישי</NavItem>
                    </LinkContainer>
                    <li>עקבו אחרינו ב- <i className="fab fa-facebook-f"></i>
                        <span className="sr-only">facebook</span>
                    </li>
                </ul>
            </div>
        )
    }
}

export default FooterMenu;