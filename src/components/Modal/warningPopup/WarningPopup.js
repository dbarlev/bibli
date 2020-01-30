import React, { Component } from 'react';
import {
    Button,
    Modal
} from 'react-bootstrap';
import './WarningPopup.scss';
import { getCookie } from '../../Services/GetCookies';

class WarningPopup extends Component {

    constructor() {
        super();
        this.state = {
            firstVisit: true
        }
    }

    componentDidMount() {
        let first_visit_cookie = getCookie("bibli_first_Visit_Cookie");
        if (first_visit_cookie.trim() === "true") {
            this.addCookie();
            this.setState({ firstVisit: false });
        }
        else {
            this.setState({ firstVisit: true });
        }
    }

    addCookie() {
        const timestamp = new Date().getTime(); // current time
        const exp = timestamp + 60 * 60 * 24 * 1000 * 7 * 4; // add one month
        document.cookie = `bibli_first_Visit_Cookie='true';expires=${exp}`;
    }

    render() {
        return (
            <Modal id="bugContact" size="sm" show={this.state.firstVisit}>
                <Modal.Header closeButton closeLabel className="modalHeader">
                    <div className="text-center">
                        <h2>ברוכים הבאים לביבלי!</h2>
                    </div>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
            </Modal>
        );
    }
}

export default WarningPopup;
