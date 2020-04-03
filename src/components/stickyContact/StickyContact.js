import React, { Component } from 'react';
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import BugContact from '../Modal/BugContact';
import './StickyContact.scss';

class StickyContact extends Component {

    constructor() {
        super();
        this.state = {
            showModal: false
        }
    }

    onContact() {
        this.setState({
            showModal: true
        })
    }

    onHide(e) {
        this.setState({
            showModal: false
        })
    }

    render() {
        return (
            <div>
                <OverlayTrigger onClick={() => this.onContact()} placement="right" overlay={<Tooltip>דיווח על תקלות</Tooltip>}>
                    <Button id="stickyContact">
                        <div id="stickyContactCont">
                            <span>
                                <i class="fas fa-envelope"></i>
                            </span>
                            <p>
                                צריכים עזרה?
                            </p>
                        </div>
                    </Button>
                </OverlayTrigger>
                {
                    this.state.showModal && <BugContact close={() => this.onHide()} />
                }
            </div>

        )
    }
}


export default StickyContact;
