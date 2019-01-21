import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Link } from 'react-router-dom'

// import {connect} from 'react-redux';
import {
    Button,
    Form,
    FormGroup,
    FormControl,
    Col,
    Checkbox,
    ControlLabel,
    HelpBlock,
    Grid,
    Row
} from 'react-bootstrap';

class LoginForm extends Component {
    constructor() {
        super();
        this.state={
            username: '',
            password: '',
            data: [],
            auth: false
        }
        this.onSubmitLogin = this.onSubmitLogin.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmitLogin(event){
        let auth = this.state.auth;
        event.preventDefault();
        fetch('http://127.0.0.1/bibli/api/user_switch/' + this.state.username + 
        '/'+ this.state.password )
        .then(response => response.json())
        .then(json => {
            console.log(json)
            if(json.count > 0)
            {
                this.setState({
                    auth: true,
                    data: json
                });
            }
        })
        .catch(error => console.log('parsing faild', error))

    }

    onChange(event){
        this.setState({
            //משום מה לא הצלחתי לעבוד עם ref הבנתי ששאפשר רק בתוך lifecyclemethod...
            [event.target.name]: event.target.value
        })

        console.log(this.state);
    }

    redirectUser()
    {
        if(this.state.auth)
        {
            return <Redirect to='/' />
        }
    }

    render() {
        
        return (
            <Grid fluid id="LoginForm" className="yellow-bg">
                <Row className="show-grid">
                    <Col xsOffset={2} xs={8} mdOffset={3} md={6}>
                        <h2 className="text-center">כבר רשומים? התחברו!</h2>
                        <Form horizontal>
                            <FormGroup  controlId="formHorizontalusername">
                                <Col xs={12} sm={4}>
                                    <FormControl ref="username" name="username" type="text" onChange={this.onChange} placeholder="הקלד דואר אלקטרוני"/>
                                </Col>
                                <Col xs={12} sm={4}>
                                    <FormControl ref="password" name="password" type="password" onChange={this.onChange} placeholder="הקלד סיסמא"/>
                                </Col>
                                <Col  xs={12} sm={4} >
                                    {this.redirectUser()}
                                    <Button onClick={this.onSubmitLogin} type="submit" className="full-width-btn" id="loginSubmit">התחבר</Button>
                                </Col>
                            </FormGroup>
                            <Link to="/register">אינך רשום? התחבר</Link>
                        </Form>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

const UserState = (state) =>{
    console.log("state ", state)
    return
}
export default LoginForm;