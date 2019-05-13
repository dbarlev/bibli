import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';


// import {connect} from 'react-redux';
import {
    Button,
    Form,
    FormGroup,
    FormControl,
    Col,
    Alert,
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
            auth: false,
            usernameError: '',
            passwordError: '',
            EmptyUsernameError: '',
            EmptyPasswordError: ''
        }
        this.onSubmitLogin = this.onSubmitLogin.bind(this);
        this.onChange = this.onChange.bind(this);
    }


    validate = () => {
        let isError = false;
        

        //לא מצליח לייצר ולידציה כשאין שם משתמש
        //משום מה לא מצליח לייצר ולידציה עבור תווים בעברית
        if(this.state.auth === false){
            isError = true;
            this.setState({usernameError: 'אחד הפרטים שהזנתם שגוי'});
        }

        if(this.state.username === ''){
            isError = true;
            this.setState({EmptyUsernameError: 'לא הזנתם שם משתמש'});
        }
        if(this.state.password === ''){
            isError = true;
            this.setState({EmptyPasswordError: 'לא הזנתם סיסמה'});
        }

      
        return isError;
    }

    onSubmitLogin(event){
        this.validate();
        let auth = this.state.auth;
        event.preventDefault();
        fetch('http://127.0.0.1/bibli/api/user_switch/' + this.state.username + 
        '/'+ this.state.password )
        .then(response => response.json())
        .then(json => {
            console.log('json ',json)
            if(json.count > 0)
            {
                this.setState({
                    auth: true,
                    data: json
                });
            }else{
                let isError = true;
                this.validate();
                this.setState({
                    auth: false,
                    data: null
                });
            }
           
        })
        .catch(error => console.log('parsing faild', error))


    }


    onChange(event){
        this.setState({
            //משום מה לא הצלחתי לעבוד עם ref הבנתי ששאפשר רק בתוך lifecyclemethod...
            [event.target.name]: event.target.value,
            auth: false,
            usernameError: '',
            passwordError: '',
            EmptyUsernameError: ''
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
                            {
                                this.state.EmptyUsernameError ? 
                                <Alert variant="danger"> {this.state.EmptyUsernameError} </Alert> :
                                ''
                            }
                            {
                                this.state.EmptyPasswordError ? 
                                <Alert variant="danger"> {this.state.EmptyPasswordError} </Alert> :
                                ''
                            }

                            {
                                this.state.usernameError ? 
                                <Alert variant="danger"> {this.state.usernameError} </Alert> :
                                ''
                            }
                            <Link to="/register">אינך רשום? הרשם!</Link>
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