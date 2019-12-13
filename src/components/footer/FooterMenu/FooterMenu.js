import React, { Component } from 'react';
import { MenuItem } from 'react-bootstrap';
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
                        <MenuItem>תקנון</MenuItem>
                    </LinkContainer>
                    <LinkContainer to="/contact">
                        <MenuItem>דברו איתנו</MenuItem>
                    </LinkContainer>
                    <LinkContainer to="/">
                        <MenuItem>האזור האישי</MenuItem>
                    </LinkContainer>
                    <li>עקבו אחרינו ב- <i className="fab fa-facebook-f"></i></li>
                </ul>
            </div>
        )
    }
}

export default FooterMenu;