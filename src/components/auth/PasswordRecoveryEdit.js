import React, { Component } from 'react';
import {Form, FormGroup, Col, Button, FormControl, Grid} from 'react-bootstrap';
import {connect} from 'react-redux';
import Header from '../header/Header';

class PasswordRecoveryEdit extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log('this.props.match.params.mailVer', this.props.match.params.mailVer);
    }
    render() {
        return (
            <div>
                <Header headline="הזן סיסמא חדשה"/>
                <Grid>
                </Grid>
            </div>
        )
    }
}

export default connect(null, {})(PasswordRecoveryEdit)
