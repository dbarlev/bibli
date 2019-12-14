import React, { Component } from 'react';
import { Row, Col, Form, FormControl, FormGroup, Button, Alert } from 'react-bootstrap';
import { apiClient } from '../../../common/apiClient';
import './FooterForm.scss';

class FooterForm extends Component {
    constructor() {
        super();
        this.state = {
            msg: null,
            msgState: null
        }
    }

    async formSubmit(e) {
        e.preventDefault();
        let name = e.target.elements.name;
        let email = e.target.elements.email;
        let obj = {
            name: name.value,
            email: email.value,
            checked: "checked"
        };
        let serverResponse = await apiClient("/users/MailingList.php", "post", obj);
        let msg = "";
        let msgState = "";

        if (serverResponse === 400) {
            msg = "חובה למלא את כל השדות";
            msgState = "danger";
        }
        else if (serverResponse === 200) {
            msg = "הצטרפת בהצלחה!";
            msgState = "success";
        }
        else {
            msg = "המייל קיים במערכת";
            msgState = "danger";
        }

        this.setState({ msg, msgState }, () => {
            msgState === "success" && this.removeNotifcation();
        });

        name.value = "";
        email.value = "";
    }

    removeNotifcation() {
        setTimeout(() => {
            this.setState({ msg: null, msgState: null });
        }, 5000);
    }

    render() {
        return (
            <div id="footer-form" >
                <Form onSubmit={this.formSubmit.bind(this)}>
                    <Row>
                        <Col md={5}></Col>
                        <Col md={2}>
                            {this.state.msgState &&
                                <Alert bsStyle={this.state.msgState} className="text-right">
                                    {this.state.msg}
                                </Alert>
                            }
                        </Col>
                        <Col md={4}></Col>
                    </Row>
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
                                    <FormControl required name="name" type="text" placeholder="שם" />
                                </FormGroup>
                            </Col>
                            <Col md="6" className="css-reset">
                                <FormGroup controlId="formBasicEmail">
                                    <FormControl required name="email" type="email" placeholder="אימייל" />
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