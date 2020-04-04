import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, FormControl, Button, FormCheck, Alert, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { sendMassage } from '../../actions/ajax';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import SkipLinks from '../skipLinks';
import './contact.scss';

const skipTo = [
    { id: "contact-main", text: "דלג לאזור המרכזי" },
    { id: "mainMenuRow", text: "דלג לתפריט הראשי" },
    { id: "footer", text: "דלג לסוף העמוד" },
    { id: "contact-main", text: "דלג לטופס יצירת קשר" }
]

class Contact extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            phone: '',
            massage: '',
            addToMailingList: '',
            msg: '',
            formName: 'צור קשר'
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.massageSent !== prevProps.massageSent) {
            this.massage()
        }
    }

    onChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({ [e.target.name]: value });

    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.sendMassage(this.state)

    }

    massage = () => {
        if (this.props.massageSent.contactussent == 1) {
            this.setState({ msg: 'ההודעה נשלחה בהצלחה ', color: 'green' });
            return this.state.msg;
        } else {
            this.setState({ msg: 'ההודעה לא נשלחה, נסה שנית מאוחר יותר', color: 'red' });
            return this.state.msg
        }

    }


    formValidation = () => {
        let isError = false;
        const errors = {};

        if (this.state.name.length != '') {
            isError = true;
            errors.passwordLengthError = "חייב למלא את שדה שם מלא"
        } else {
            isError = false;
            errors.passwordLengthError = ""
        }

        if (this.state.confirmPassword !== this.state.password) {
            isError = true;
            errors.passwordMatchError = "הסיסמאות לא תואמות"

        } else {
            isError = false;
            errors.passwordMatchError = ""
        }

        this.setState({
            ...this.state,
            ...errors
        });
        return isError
    }


    render() {
        return (
            <div id="contact">
                <SkipLinks skipTo={skipTo} />
                <Header />
                <main id="contact-main">
                    <Row>
                        <Col md={6} mdOffset={3}>
                            <h1>צור קשר</h1>
                        </Col>
                    </Row>
                    <div className="row">
                        <div className="col-xs-4 col-xs-offset-4">
                            <h2 className="text-center">
                                <p className="bold">יש משהו שאתם רוצים לשאול?</p>
                                <p className="bold">בקשה? בעיה?</p>
                            </h2>
                            <h3 className="text-center">
                                <p>כתבו לנו ונדאג לחזור אליכם בהקדם</p>
                            </h3>
                        </div>
                    </div>
                    <div className="row">
                        <Form horizontal onSubmit={this.onSubmit.bind(this)}>
                            <div className="col-xs-12 col-md-2 col-md-offset-5">
                                <div className="row">

                                    <div className="form-group">
                                        <input
                                            required
                                            aria-label="הכנס שם מלא"
                                            className="form-control"
                                            Placeholder="הכנס שם מלא"
                                            ref="name"
                                            name="name"
                                            id="name"
                                            type="text"
                                            onChange={this.onChange.bind(this)}
                                        />
                                    </div>

                                </div>
                                <div className="row">

                                    <div className="form-group">
                                        <input
                                            required
                                            aria-label="הכנס כתובת מייל"
                                            className="form-control"
                                            Placeholder="כתובת מייל"
                                            ref="email"
                                            name="email"
                                            id="email"
                                            type="email"
                                            onChange={this.onChange.bind(this)}
                                        />
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            aria-label="הכנס מספר טלפון"
                                            Placeholder="טלפון"
                                            ref="phone"
                                            name="phone"
                                            id="phone"
                                            type="text"
                                            onChange={this.onChange.bind(this)}
                                        />
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="form-group">
                                        <textarea
                                            rows="7"
                                            required
                                            aria-label="תוכן ההודעה, במה נוכל לעזור"
                                            className="form-control"
                                            Placeholder="כתוב לנו במה נוכל לעזור..."
                                            ref="massage"
                                            name="massage"
                                            id="massage"
                                            onChange={this.onChange.bind(this)}
                                        ></textarea>
                                    </div>

                                </div>
                                <div className="row">

                                    <div className="form-group">

                                        <div className="col-xs-2 pad-0">
                                            <input
                                                className="form-control"
                                                ref="checkbox"
                                                name="addToMailingList"
                                                id="addToMailingList"
                                                type="checkbox"
                                                onChange={this.onChange.bind(this)}
                                            />
                                        </div>
                                        <div className="col-xs-10 pad-0">
                                            <label htmlFor="addToMailingList">
                                                מעוניין להצטרף לרשימת התפוצה
                                            </label>
                                        </div>

                                    </div>

                                </div>
                                <div className="row">
                                    <div className="text-center">
                                        <div className="form-group">
                                            <button className="btn send" >שלח</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-md-2 col-md-offset-5">
                                <div className="row">
                                    {this.state.msg &&
                                        <div className={this.state.color + '-alert'} role="alert">
                                            {this.state.msg}
                                        </div>
                                    }
                                </div>
                            </div>
                        </Form>

                    </div>
                </main>
                <Footer bottom />
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        massageSent: state.emailMassageReducer.massageSent
    }
}
export default connect(mapStateToProps, { sendMassage })(Contact);