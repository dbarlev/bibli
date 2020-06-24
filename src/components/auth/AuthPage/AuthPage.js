import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import { withRouter } from 'react-router-dom';
import './AuthPage.scss';
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";

const LOGIN = "login";

class AuthPage extends Component {

    constructor() {
        super()
        this.state = {
            isRegsiterMode: true
        }
    }

    render() {
        return (
            <Grid fluid id="AuthPage">
                <Header />
                <Row className="auth-container">
                    <Col lg={3} />
                    <Col md={6} lg={7}>
                        {
                            this.props.isLogin || this.state.isRegsiterMode
                                ?
                                <RegisterPage changeToLogin={() => this.setState({ isRegsiterMode: false })} />
                                :
                                <LoginPage changeToRegister={() => this.setState({ isRegsiterMode: true })} />
                        }

                    </Col>
                </Row>
                <Footer bottom />
            </Grid>
        );
    }
}

export default withRouter(AuthPage);
