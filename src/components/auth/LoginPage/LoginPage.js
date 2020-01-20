import React, { Component } from "react";
import { Grid, Row, Col, Button, Form, FormGroup, FormControl, Alert } from "react-bootstrap";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import { withRouter } from 'react-router-dom';
import { LoginServerValidation, sendNewConfMail } from './LoginServerValidation';
import './LoginPage.scss';

class LoginPage extends Component {

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
                console.log('aaa', response)
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
        .then((data)=>{
          console.log('mailSent', data.doPush);
          if(data.doPush){
            this.props.history.push("/registersuccess");
           }
        })
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
                                {this.state.newMailVer && (
                                    <a onClick={() => this.sendNewConfMailT(this.state.email)}>
                                      לקבלת מייל חדש לחץ כאן
                                    </a>
                  
                                
                                  )}
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
