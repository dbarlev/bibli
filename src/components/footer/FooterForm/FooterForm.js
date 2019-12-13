import React, { Component } from 'react';
import { Row, Col, Form, FormControl, FormGroup, Button } from 'react-bootstrap';
import './FooterForm.scss';

class FooterForm extends Component {
    constructor() {
        super()
    }

    formSubmit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div id="footer-form" >
                <Form onSubmit={(e) => this.formSubmit.bind(this, e)}>
                    <Row>
                        <Col md="5">
                            <Row className="pull-left newsLetterText">
                                <Col>
                                    <p>רוצים להצטף לניוזלטר שלנו ?</p>
                                </Col>
                                <Col className="pull-left">
                                    <p>השאירו פרטים ></p>
                                </Col>
                            </Row>
                        </Col>
                        <Col md="3" className="form-container" >
                            <Col md="4" className="css-reset">
                                <FormGroup controlId="formName">
                                    <FormControl required type="text" placeholder="שם" />
                                </FormGroup>
                            </Col>
                            <Col md="6" className="css-reset">
                                <FormGroup controlId="formBasicEmail">
                                    <FormControl required type="email" placeholder="אימייל" />
                                </FormGroup>
                            </Col>
                            <Col>
                                <Button type="submit" >שלח</Button>
                            </Col>
                        </Col>
                    </Row>
                </Form>
            </div >
        )
    }
}

export default FooterForm;