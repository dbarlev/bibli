import React, { Component } from 'react';
import { detect } from 'detect-browser';
import { connect } from 'react-redux';
import { sendMassage } from '../../actions/authActions';
import {
    Button,
    Modal,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Alert
} from 'react-bootstrap';
import './BugContact.scss';

class BugContact extends Component {

    constructor() {
        super();
        this.state = {
            show: false,
            errors: [],
            msg: ''
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.massageSent !== prevProps.massageSent) {
            this.massage()
        }
    }

    onFormSubmit(e) {
        let browser = detect();
        e.preventDefault();
        let elements = e.currentTarget.elements;
        /*let browser = elements.browser.value ? elements.browser.value.trim() : "";*/
        let name = elements.name.value ? elements.name.value.trim() : "";
        let email = elements.email.value ? elements.email.value.trim() : "";
        let text = elements.issueDetails.value ? elements.issueDetails.value.trim() : "";
        let formName = 'דיווח תקלה';
        let browserName = browser.name;
        let browserOs = browser.os;
        let browserVersion = browser.version;
        let isValid = this.validation(browser, text, email);
        if (!isValid)
            return;

        this.props.sendMassage({ name, email, browserName, browserOs, browserVersion, message: text, formName });
    }

    validation(browser, text, email) {
        let errors = [];
        if (browser === "select")
            errors.push("חובה לבחור דפדפן");

        if (text === "")
            errors.push("חובה למלא תיאור תקלה");

        if (email === "")
            errors.push("חובה למלא כתובת מייל תקינה");

        if (!!errors.length) {
            this.setState({ errors });
            return false;
        }
        else {
            this.setState({ errors: [] });
            return true;
        }

    }


    massage = () => {
        if (this.props.massageSent.contactussent === 1) {
            this.setState({ msg: 'ההודעה נשלחה בהצלחה ', color: 'green' });
            return this.state.msg;
        } else {
            this.setState({ msg: 'ההודעה לא נשלחה, נסה שנית מאוחר יותר', color: 'red' });
            return this.state.msg
        }

    }


    render() {
        return (
            <Modal id="bugContact" onHide={() => this.props.close()} size="sm" show={true}>
                <Modal.Header closeButton closeLabel="סגור" className="modalHeader">
                    <div className="text-center">
                        <h2>נתקלתם בתקלה באתר?</h2>
                        <h3>דווחו לנו בטופס למטה</h3>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    {
                        !!this.state.errors.length &&
                        <Alert bsStyle="danger" className="text-right">
                            <ul>
                                {this.state.errors.map((err) => {
                                    return <li>{err}</li>
                                })}
                            </ul>
                        </Alert>
                    }
                    <Form onSubmit={(e) => this.onFormSubmit(e)}>
                        <FormGroup controlId="name">
                            <ControlLabel>שם</ControlLabel>
                            <FormControl
                                placeholder="שם מלא"
                                type="text"
                            />
                        </FormGroup>
                        <FormGroup controlId="email">
                            <ControlLabel > כתובת מייל - שדה חובה</ControlLabel>
                            <FormControl
                                placeholder="כתובת מייל"
                                type="email"
                            />
                        </FormGroup>
                        {/*  <FormGroup controlId="browser">
                            <ControlLabel>דפדפן - שדה חובה</ControlLabel>
                            <FormControl componentClass="select" placeholder="browser">
                                <option value="select">בחרו מהרשימה...</option>
                                <option value="Chrome">Chrome</option>
                                <option value="Firefox">Firefox</option>
                                <option value="Edge">Edge</option>
                            </FormControl>
                        </FormGroup>
                */}
                        <FormGroup controlId="issueDetails">
                            <ControlLabel>תיאור הבעיה - שדה חובה</ControlLabel>
                            <FormControl rows={5} componentClass="textarea" placeholder="תיאור התקלה" />
                        </FormGroup>
                        {this.state.msg &&
                            <div className={this.state.color + '-alert'} role="alert">
                                {this.state.msg}
                            </div>
                        }
                        <div id="submitBtn">
                            <Button variant="primary" type="submit">
                                שלח
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        massageSent: state.emailMassageReducer.massageSent
    }
}

export default connect(mapStateToProps, { sendMassage })(BugContact);
