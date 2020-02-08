import React, { Component } from "react";
import { Row, Col, Button, Form, FormGroup, FormControl, Alert } from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import './RegisterPage.scss';
import { RegisterServerValidation } from "../Services/RegisterService";

class RegisterPage extends Component {

    constructor() {
        super();

        this.state = {
            errorMsg: '',
            errorMsgState: false,
            newMailVer: false,
            email: ''
        }
    }

    async FormSubmit(e) {
        e.preventDefault();

    }

    clinetValidate(email, password) {

        if (email === "" || password === "") {
            this.setState({
                errorMsgState: true,
                errorMsg: "כל השדות חובה"
            });
            return false;
        }

        return true;
    }

    async submitForm(event) {
        event.preventDefault();
        const email = event.target.elements.email.value.trim();
        const password = event.target.elements.password.value.trim();
        if (this.clinetValidate(email, password)) {
            let response = await RegisterServerValidation({email, password, package: 1});
            if (response && !response.success) {
                this.setState({
                    errorMsgState: true,
                    newMailVer: false,
                    errorMsg: response.data
                });
            }
            else if (response) {
                this.props.InsertUserToStore(response.data);
                this.props.history.push("/registersuccess");
            }
        }
    }

    render() {
        return (
            <div id="registerPage">
                <Row>
                    <Col lg={6} md={8} xs={10} mdOffset={3}>
                        <h1>יצירת חשבון חדש</h1>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4} md={4} xs={4} mdOffset={3}>
                        {this.state.errorMsgState &&
                            <Alert bsStyle="danger" className="text-right">
                                {this.state.errorMsg}
                            </Alert>
                        }
                    </Col>
                </Row>
                <Form horizontal className="no-border" onSubmit={this.submitForm.bind(this)}>
                    <FormGroup>
                        <Col lg={4} md={8} xs={10} mdOffset={3}>
                            <FormControl
                                ref="email"
                                name="email"
                                id="email"
                                type="email"
                                placeholder="הקלד דואר אלקטרוני"
                                aria-label="דואר אלקטרוני"
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col lg={4} md={8} xs={10} mdOffset={3}>
                            <FormControl
                                ref="password"
                                name="password"
                                id="password"
                                type="password"
                                placeholder="סיסמה"
                                aria-label="הקלד סיסמה"
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col lg={4} md={6} mdOffset={4}>
                            <Row>
                                <Col >
                                    <Button type="submit">הירשם</Button>
                                </Col>
                                <Col>
                                    <a className="linkToLogin" href="#" onClick={() => this.props.changeToLogin()}>יש לך כבר חשבון?</a>
                                </Col>
                            </Row>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default withRouter(RegisterPage);
