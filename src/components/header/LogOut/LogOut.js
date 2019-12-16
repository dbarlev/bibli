import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { MenuItem, Button, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from "react-router-bootstrap";
import { connect } from 'react-redux';
import { userLogedIn } from '../../../actions';


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
            <div>
                <LinkContainer className="btn-warning black topnav-login-logout-btn" style={TopMargin} to="/records/biblist" >
                    <div>חזרה לאזור האישי</div>
                </LinkContainer>
                <LinkContainer className="btn-warning black topnav-login-logout-btn" style={TopMargin} to="/" >
                    <Button onClick={() => this.logOut()}> התנתק/י</Button>
                </LinkContainer>
            </div>
        )
    }
}


export default connect(null, { userLogedIn })(LogOut);


const TopMargin = {
    marginTop: "27px"
};
