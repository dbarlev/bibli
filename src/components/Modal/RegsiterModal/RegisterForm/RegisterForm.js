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

    constructor() {
        super();

        this.state = {
            errorMsg: '',
            errorMsgState: false,
            newMailVer: false,
            email: '',
            password: "",
            showPackages: false
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
            let serverValidation = await apiClient("/users/User.php?validate=true", "post", { email, password });
            if (serverValidation === "success") {
                this.setState({ email, password, showPackages: true });
            }
            else {
                let error = '';
                switch (serverValidation.error) {
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
    }

    onPackageChoosen = async (packageData) => {
        const { history, SelectedPackage } = this.props;
        const { email, password } = this.state;

        if (packageData && packageData.name !== "free") {
            SelectedPackage(packageData);
            history.push("/checkout");
            return;
        }

        let response = await RegisterServerValidation({ email, password, package: 1 });
        if (response && !response.success) {
            this.setState({
                errorMsgState: true,
                newMailVer: false,
                errorMsg: response.data
            });
        }
        else if (response) {
            this.props.InsertUserToStore(response.data);
            setCookie(true, response.data.userid);
            this.props.history.push("/records/biblist");
        }
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
                            <Col lg={7} md={7} mdOffset={4}>
                                <Row>
                                    <Col>
                                        <Button type="submit">הירשם</Button>
                                    </Col>
                                    <Col>
                                        <a className="linkToLogin" href="#" onClick={() => this.props.changeToLogin()}>יש לך כבר חשבון?</a>
                                    </Col>
                                </Row>
                            </Col>
                        </FormGroup>
                    </Form>
                }
            </div>
        );
    }
}

export default connect(null, { InsertUserToStore, SelectedPackage })(withRouter(RegisterForm));
