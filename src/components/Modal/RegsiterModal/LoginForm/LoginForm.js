import React, { Component } from "react";
import { Row, Col, Button, Form, FormGroup, FormControl, Alert } from "react-bootstrap";
import { withRouter, Link } from 'react-router-dom';
import { LoginServerValidation, sendNewConfMail } from '../../../auth/Services/LoginServerValidation';
import './LoginForm.scss';

class LoginForm extends Component {

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
        const email = e.target.elements.email.value.trim();
        const password = e.target.elements.password.value.trim();
        this.setState({
            email
        });
        if (this.clinetValidate(email, password)) {
            let response = await LoginServerValidation(email, password);
            if (response && response.data == 'mailVerification') {
                this.setState({
                    errorMsg: 'החשבון לא אומת ',
                    newMailVer: true,
                    errorState: true
                });
            }
            else if (response && !response.success) {
                this.setState({
                    errorMsgState: true,
                    newMailVer: false,
                    errorMsg: response.data
                });
            }
            else if (response) {
                this.props.history.push("/records/biblist");
            }
        }
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

    sendNewConfMailT = (email) => {
        let mailSent = sendNewConfMail(email)
            .then((data) => {
                if (data.doPush) {
                    this.props.history.push("/registersuccess");
                }
            })
    }

    render() {
        return (
            <div id="loginForm">
                <Row>
                    <Col lg={4} md={4} xs={4} mdOffset={3}>
                        {this.state.errorMsgState &&
                            <Alert bsStyle="danger" className="text-right">
                                {this.state.errorMsg}
                                {this.state.newMailVer &&
                                    <a onClick={() => this.sendNewConfMailT(this.state.email)}>
                                        לקבלת מייל חדש לחץ כאן
                                </a>
                                }
                            </Alert>
                        }
                    </Col>
                </Row>
                <Form horizontal className="no-border" onSubmit={this.FormSubmit.bind(this)}>
                    <FormGroup>
                        <Col lg={7} md={7} xs={7} mdOffset={3}>
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
                        <Col lg={7} md={4} xs={7} mdOffset={3}>
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
                        <Col lg={7} md={6} mdOffset={4}>
                            <Row>
                                <Col >
                                    <Button type="submit">התחבר</Button>
                                </Col>
                                <Col>
                                    <Link className="linkToForgetPassword" to="/passwordrecovery">שכחת את הסיסמה?</Link>
                                </Col>
                                <Col>
                                    <a className="linkToRegister" href="#" onClick={() => this.props.changeToRegister()}>אין לך עדיין חשבון?</a>
                                </Col>
                            </Row>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default withRouter(LoginForm);
