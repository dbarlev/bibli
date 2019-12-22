import React, { Component } from "react";
import { Grid, Row, Col, Button, Form, FormGroup, FormControl, Alert } from "react-bootstrap";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import { withRouter } from 'react-router-dom';
import { LoginServerValidation } from './LoginServerValidation';
import './LoginPage.scss';

class LoginPage extends Component {

    constructor() {
        super();

        this.state = {
            errorMsg: "",
            errorMsgState: false
        }
    }

    async FormSubmit(e) {
        e.preventDefault();
        let email = e.target.elements.email.value.trim();
        let password = e.target.elements.password.value.trim();
        if (this.clinetValidate(email, password)) {
            let response = await LoginServerValidation(email, password);
            if (response && !response.success) {
                this.setState({
                    errorMsgState: true,
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

    render() {
        return (
            <Grid fluid id="loginPage">
                <Header />
                <Row>
                    <Col md={6} mdOffset={3}>
                        <h1>התחברות לאתר</h1>
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
                <Form horizontal className="no-border" onSubmit={this.FormSubmit.bind(this)}>
                    <FormGroup>
                        <Col lg={4} md={4} xs={4} mdOffset={3}>
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
                        <Col lg={4} md={4} xs={4} mdOffset={3}>
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
                        <Col lg={4} mdOffset={3}>
                            <Button type="submit">התחבר</Button>
                        </Col>
                    </FormGroup>
                </Form>
                <Footer bottom />
            </Grid>
        );
    }
}

export default withRouter(LoginPage);
