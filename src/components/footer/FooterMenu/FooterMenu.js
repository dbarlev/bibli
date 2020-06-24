import React, { Component } from 'react';
import { LinkContainer } from "react-router-bootstrap";
import './FooterMenu.scss';
import Accessibility from './accessibility';

class FooterMenu extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div id="FooterMenu">
                <ul>
                    <li>
                        <LinkContainer to="/takanon">
                            <a>תקנון</a>
                        </LinkContainer>
                    </li>
                    <li>
                        <LinkContainer to="/contact">
                            <a>דברו איתנו</a>
                        </LinkContainer>
                    </li>
                    <li>
                        <LinkContainer to="/faq">
                            <a>שאלות ותשובות</a>
                        </LinkContainer>
                    </li>
                    {/* <li>
                        <Accessibility />
                    </li> */}
                    <li>עקבו אחרינו ב- <i aria-hidden="true" className="fab fa-facebook-f"></i>
                        <span className="sr-only">facebook</span>
                    </li>
                </ul>
            </div>
        )
    }
}

export default FooterMenu;