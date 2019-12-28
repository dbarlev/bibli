import React, { Component } from "react";
import { connect } from "react-redux";
import { getCookie } from "../../Services/GetCookies";
import { apiClient } from '../../../common/apiClient';
import { withRouter } from "react-router-dom";
import { Modal, Button, Form, FormGroup, FormControl, Col } from "react-bootstrap";


class AddOrChooseList extends Component {

    render() {
        return (
            <Modal id="modal-addOrChooseList" show={true} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>יצירת עבודה חדשה</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form closeButton horizontal className="no-border">
                        <FormGroup>
                            <Col lg={7} md={7} xs={7}>
                                <FormControl
                                    ref="email"
                                    name="email"
                                    id="email"
                                    type="email"
                                    placeholder="שם העבודה"
                                    aria-label="דואר אלקטרוני"
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col lg={4} mdOffset={3}>
                                <Button type="submit">התחבר</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        );
    }
}


export default connect(null, {})(
    withRouter(AddOrChooseList)
);
