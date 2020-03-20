import React, { Component } from 'react';
import { Form, Row, Alert, FormGroup, Col, Button, FormControl, Grid, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Animated } from "react-animated-css";
import { withRouter } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';

import { PassRecoveryEdit } from '../../actions/ajax';

class PasswordRecoveryEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword: '',
            msg: ''
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.passRecoveryEditSuccess !== prevProps.passRecoveryEditSuccess) {
            this.massage()
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        this.setState({ msg: '' });
        this.setState({ passwordMatchError: '', passwordLengthError: '' });
    }


    formValidation = () => {
        let isError = false;
        const errors = {};

        if (this.state.password.length < 6 || this.state.password == '') {
            isError = true;
            errors.passwordLengthError = "על הסיסמה להיות ארוכה מ 6 תווים"
        } else {
            errors.passwordLengthError = ""
        }

        if (this.state.confirmPassword !== this.state.password) {
            isError = true;
            errors.passwordMatchError = "הסיסמאות לא תואמות"

        } else {
            errors.passwordMatchError = ""
        }

        this.setState({
            ...this.state,
            ...errors
        });
        return isError
    }

    onSubmit = (e) => {
        e.preventDefault();
        let obj = {
            password: this.state.password,
            token: this.props.match.params.token
        }
        let err = this.formValidation();
        if (!err) {
            this.props.PassRecoveryEdit(obj);
        }

    }

    massage = () => {
        if (this.props.passRecoveryEditSuccess.password_changed == 1) {
            this.setState({ msg: 'הסיסמה עודכנה בהצלחה ', alertColor: 'green-alert' });
            setTimeout(() => {
                this.props.history.push("/login");
            }, 2000);
            return this.state.msg + '<Link to="/">to link</Link>';
        } else {
            this.setState({ msg: 'הסיסמה לא עודכנה, נסה שנית מאוחר יותר און צר איתנו קשר דרך עמוד "צור קשר".', alertColor: 'red-alert' });
            return this.state.msg
        }

    }


    render() {
        return (
            <div>
                <Grid fluid className="page-wrap">
                    <Header headline="הזינו סיסמה חדשה" />
                    <Row>
                        <Col md={6} mdOffset={3}>
                            <h1>שחזור סיסמה</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} mdOffset={3}>
                            <p>יש להזין את הסיסמה החדשה</p>
                            <Animated animationIn="bounceIn" animationOut="fadeOut" isVisible={true}>
                                <p>שימו  <Glyphicon className="red-alert" glyph="heart" /></p>
                            </Animated>
                            <p>על הסיסמה להיות ארוכה משישיה תווים</p>

                        </Col>
                    </Row>
                    <Row>
                        <div className="col-xs-12 col-md-4 col-md-offset-4">

                            <Form horizontal onSubmit={this.onSubmit.bind(this)}>
                              
                            <FormGroup>
                            {this.state.passwordLengthError &&
                                <div className="red-alert" bsStyle="danger">{this.state.passwordLengthError}</div>
                            }

                            <FormControl
                                        ref="password"
                                        name="password"
                                        id="password"
                                        type="password"
                                        placeholder="הקלידו את הסיסמה"
                                        aria-label="הקלידו את הסיסמה"
                                        onChange={this.onChange.bind(this)}
                                    />
                                </FormGroup>
                               
                                <FormGroup>
                                {this.state.passwordMatchError &&

                                    <div className="red-alert" bsStyle="danger">{this.state.passwordMatchError}</div>
                                }
                                    <FormControl
                                        ref="confirmPassword"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="הקלידו הסיסמה שנית"
                                        aria-label="הקלידו הסיסמה שנית"
                                        onChange={this.onChange.bind(this)}
                                    />
                                </FormGroup>
                               
                                <FormGroup>

                                    <Button className="btn send" type="submit">שינוי סיסמה</Button>

                                </FormGroup>
                            </Form>

                            {this.state.msg &&

                                <div className={this.state.alertColor} bsStyle="danger"> {this.state.msg}</div>
                            }
                        </div>
                    </Row>
                </Grid>
                <Footer bottom />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        passRecoveryEditSuccess: state.userReducer.passRecoveryEdit
    }
}


export default connect(mapStateToProps, { PassRecoveryEdit })(withRouter(PasswordRecoveryEdit));
