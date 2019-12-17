import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { MenuItem, Button, Nav, Navbar, NavItem, Col, Row } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from "react-router-bootstrap";
import { connect } from 'react-redux';
import { userLogedIn } from '../../../actions';
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
            <Col lgPush={6} lg={6}>
            <div id="logout" className="text-left">
                        <LinkContainer className="backToBiblist" to="/records/biblist" >
                            <div className="btn">חזרה לאזור האישי</div>
                            
                        </LinkContainer>
                        <LinkContainer className="linkStyle"  to="/" >
                            <Button onClick={() => this.logOut()}> התנתק/י</Button>
                        </LinkContainer>
                   
            </div>

            </Col>
        )
    }
}


export default connect(null, { userLogedIn })(LogOut);


const TopMargin = {
    marginTop: "27px"
};
