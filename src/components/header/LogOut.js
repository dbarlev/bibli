import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { MenuItem, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from "react-router-bootstrap";
import { connect } from 'react-redux';
import { userLogedIn } from '../../actions';
import './LogOut.scss';

function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}



export class LogOut extends Component {
    logOut() {
        eraseCookie('auth')
        eraseCookie('userid')
        this.props.userLogedIn();
        return <Redirect to='/' />
    }


    render() {


        return (
            <Row>
                <Col md={5} lg={5}>
                    <LinkContainer className="backToBiblist" style={TopMargin} to="/records/biblist" >
                        <div className="btn btn-warning">חזרה לאזור האישי</div>
                    </LinkContainer>
                </Col>
                <Col md={5} lg={4}>
                    <LinkContainer className="btn-warning black topnav-login-logout-btn" style={TopMargin} to="/" >
                        <Button onClick={() => this.logOut()}> התנתק/י</Button>
                    </LinkContainer>
                </Col>
            </Row >
        )
    }
}


export default connect(null, { userLogedIn })(LogOut);


const TopMargin = {
    marginTop: "27px"
};