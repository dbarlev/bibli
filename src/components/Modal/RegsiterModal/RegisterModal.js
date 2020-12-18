import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import './RegisterModal.scss';
import RegisterForm from './RegisterForm/RegisterForm';
import LoginForm from './LoginForm/LoginForm';
import PricingTable from '../../pages/packages/PricingTable';
import TermsOfService from '../../pages/TermsOfService/TermsOfService';

const TEXT = {
    LOGIN: {
        LEVEL2: "",
        LEVEL3: "התחברות לחשבון קיים"
    },
    REGISTER: {
        LEVEL2: "עוד שלב אחד ומתחילים",
        LEVEL3: "יצירת חשבון חדש"
    },
    TERMS: "תנאי שימוש"
}

class RegisterModal extends Component {

    constructor() {
        super();
        this.state = {
            isLogin: false,
            isTermsOfService: false,
            level2Text: TEXT.REGISTER.LEVEL2,
            level3Text: TEXT.REGISTER.LEVEL3
        }
    }

    changeToRegister() {
        this.setState({
            isLogin: false,
            isTermsOfService: false,
            level2Text: TEXT.REGISTER.LEVEL2,
            level3Text: TEXT.REGISTER.LEVEL3,
        })
    }

    changeToLogin() {
        this.setState({
            isLogin: true,
            isTermsOfService: false,
            level2Text: TEXT.LOGIN.LEVEL2,
            level3Text: TEXT.LOGIN.LEVEL3,
        })
    }

    changeToTermsOfService() {
        this.setState({
            isLogin: false,
            isTermsOfService: true,
            level2Text: TEXT.TERMS,
            level3Text: "",
        })

    }

    render() {
        return (
            <Modal id="registerModal" size="sm" show={true}>
                <Modal.Header className="modalHeader">
                    <div className="text-center">
                        <h2>{this.state.level2Text}</h2>
                        <h3>{this.state.level3Text}</h3>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    {!this.state.showPackages && this.state.isLogin && !this.state.isTermsOfService &&
                        <LoginForm changeToRegister={() => this.changeToRegister()} />
                    }
                    {!this.state.showPackages && !this.state.isLogin && !this.state.isTermsOfService &&
                        <RegisterForm
                            changeToLogin={() => this.changeToLogin()}
                            changeToTermsOfService={() => this.changeToTermsOfService()}
                        />
                    }
                    {this.state.isTermsOfService &&
                        <div>
                            <TermsOfService />
                            <button className="btn" onClick={() => this.changeToRegister()}>חזור לטופס התחברות</button>
                        </div>
                    }
                </Modal.Body>
            </Modal>
        );
    }
}


export default RegisterModal;
