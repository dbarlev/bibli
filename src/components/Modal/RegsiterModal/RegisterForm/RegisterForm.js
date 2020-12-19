import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { RegisterServerValidation } from "../../../auth/Services/RegisterService";
import { setCookie } from "../../../auth/Services/LoginServerValidation";
import { InsertUserToStore, SelectedPackage } from '../../../../actions';
import { apiClient } from '../../../../common/apiClient';
import {
    Button,
    Form,
    FormGroup,
    FormControl,
    Col,
    Row,
    Alert
} from 'react-bootstrap';
import './RegisterForm.scss';
import PricingTable from '../../../pages/packages/PricingTable';


class RegisterForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errorMsg: '',
            errorMsgState: false,
            newMailVer: false,
            email: this.props.email || '',
            password: "",
            showPackages: false,
            termsChecked: false
        }
    }

    async submitForm(event) {

        event.preventDefault();
        const email = this.state.email.trim();
        const password = event.target.elements.password.value.trim();

        if (email.trim() === "" || password.trim() === "") {
            this.setState({
                errorMsgState: true,
                errorMsg: "כל השדות חובה"
            });
            return;
        }

        let obj = {
            email,
            password,
            package: 0
        };

        let serverResponse = await apiClient("/users/User.php", "post", obj);
        if (serverResponse.userRegistered === "1") {
            this.props.InsertUserToStore(serverResponse);
            this.setState({ email, password, showPackages: true });
        }
        else {
            let error = '';
            switch (serverResponse.error) {
                case 0:
                    error = 'הסיסמה קטנה מ 6 תווים';
                    break;
                case 1:
                    error = 'שדה כתובת מייל ריק';
                    break;
                case 2:
                    error = 'כתובת המייל שהוזנה אינה תקינה';
                    break;
                case 3:
                    error = 'כתובת המייל קיימת במערכת';
                    break;
                default:
                    break;
            }
            this.setState({
                errorMsgState: true,
                newMailVer: false,
                errorMsg: error
            });
        }

    }

    onPackageChoosen = async (packageData) => {
        const { history, SelectedPackage, user } = this.props;

        if (packageData && packageData.name !== "free") {
            SelectedPackage(packageData);
            history.push("/checkout");
            return;
        }

        setCookie(true, user.userid);
        history.push("/records/biblist");
        this.setState({ showPacakgesModal: false });
    }


    render() {
        return (
            <div id="registerForm">
                {
                    !!this.state.errorMsgState &&
                    <Alert bsStyle="danger" className="text-right">
                        <li>{this.state.errorMsg}</li>
                    </Alert>
                }
                {this.state.showPackages
                    ?
                    <PricingTable onPackageChoosen={this.onPackageChoosen} />
                    :
                    <Form horizontal className="no-border" onSubmit={this.submitForm.bind(this)}>
                        <FormGroup>
                            <Col lg={7} md={8} xs={10} mdOffset={3}>
                                <FormControl
                                    onChange={(e) => this.setState({ email: e.target.value })}
                                    value={this.state.email}
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
                            <Col lg={7} md={8} xs={10} mdOffset={3}>
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
                            <Row>
                                <Col lg={1} md={1} xs={1} mdOffset={3}>
                                    <input
                                        onChange={(e) => this.setState({ termsChecked: e.target.checked })}
                                        ref="terms"
                                        name="terms"
                                        id="terms"
                                        type="checkbox"
                                        aria-label="מסכים לתנאי השימוש"
                                    />
                                </Col>
                                <Col lg={5} md={5} xs={5}>
                                    <label for="terms">
                                        <span style={{ fontSize: 12 }}>אני מסכים/ה</span>
                                        <a
                                            role="link"
                                            style={{ marginRight: 5, textDecoration: 'underlina', fontSize: 12, cursor: 'pointer' }}
                                            onClick={() => this.props.changeToTermsOfService()}>לתנאי השימוש</a>
                                    </label>
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Col lg={7} md={7} mdOffset={4}>
                                <Row>
                                    <Col>
                                        <Button disabled={!this.state.termsChecked} type="submit">הירשם</Button>
                                    </Col>
                                    {!this.props.isFrontRegister && <Col>
                                        <a className="linkToLogin" href="#" onClick={() => this.props.changeToLogin()}>יש לך כבר חשבון?</a>
                                    </Col>}
                                </Row>
                            </Col>
                        </FormGroup>
                    </Form>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer,
    };
};

export default connect(mapStateToProps, { InsertUserToStore, SelectedPackage })(withRouter(RegisterForm));
