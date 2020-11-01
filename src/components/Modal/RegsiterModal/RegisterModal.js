import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import './RegisterModal.scss';
import RegisterForm from './RegisterForm/RegisterForm';
import LoginForm from './LoginForm/LoginForm';
import PricingTable from '../../pages/packages/PricingTable';

const TEXT = {
    LOGIN: {
        LEVEL2: "",
        LEVEL3: "התחברות לחשבון קיים"
    },
    REGISTER: {
        LEVEL2: "עוד שלב אחד ומתחילים",
        LEVEL3: "יצירת חשבון חדש"
    }
}

class RegisterModal extends Component {

    constructor() {
        super();
        this.state = {
            isLogin: false,
            level2Text: TEXT.REGISTER.LEVEL2,
            level3Text: TEXT.REGISTER.LEVEL3
        }
    }

    changeToRegister() {
        this.setState({
            isLogin: false,
            level2Text: TEXT.REGISTER.LEVEL2,
            level3Text: TEXT.REGISTER.LEVEL3
        })
    }

    changeToLogin() {
        this.setState({
            isLogin: true,
            level2Text: TEXT.LOGIN.LEVEL2,
            level3Text: TEXT.LOGIN.LEVEL3
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
                    {!this.state.showPackages && this.state.isLogin &&
                        <LoginForm changeToRegister={() => this.changeToRegister()} />
                    }
                    {!this.state.showPackages && !this.state.isLogin &&
                        <RegisterForm
                            onPackageChoosen={() => this.onPackageChoosen()}
                            changeToLogin={() => this.changeToLogin()}
                        />
                    }
                </Modal.Body>
            </Modal>
        );
    }
}


export default RegisterModal;
