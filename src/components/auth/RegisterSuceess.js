import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Grid, Row, Button} from 'react-bootstrap'; 

import {Animated} from "react-animated-css";


import Header from '../header/Header';
import Footer from '../footer/Footer';


class RegisterSuceess extends Component {
    render() {
        return (
            <Grid fluid className="jumbotron-main">
            <Row>
            <Header headline="אישור רישום"/>

            <Grid>
              <p>
            הרישום בוצע בהצלחה
            </p>
            <p>
            דואר אלקטרוני עם אישור הרשמה ישלח לכתובת הדואר {this.props.user.email} 
            </p>
            <p>
            בהצלחה!
            </p>
            
            </Grid>

            
            </Row>
            <Row style={footerX}>
            <Footer />
            </Row>
        </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        chooseSubscription: state.chooseSubscription,
        user: state.userReducer,
        mailVer: state.mailver
        }
}


export default connect(mapStateToProps, null)(RegisterSuceess);

const footerX = {
    position: 'absolute',
    bottom: '0',
    minWidth: '100%',
    padding: '0',
    margin: '0',
    left: '0',
}