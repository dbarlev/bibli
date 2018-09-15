import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom'
// import {connect} from 'react-redux';
import {
    Button,
    Form,
    FormGroup,
    FormControl,
    Col,
    Checkbox,
    ControlLabel,
    HelpBlock
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
            <div id="LoginForm">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <Form horizontal>
                            <FormGroup  controlId="formHorizontalusername">
                                <Col sm={8}>
                                <FormControl ref="username" name="username" type="text" onChange={this.onChange} placeholder="הקלד דואר אלקטרוני"/>
                                
                                </Col>
                                <Col componentClass={ControlLabel}>
                                דואר אלקטרוני:
                                </Col>
                            </FormGroup>
                            <FormGroup  controlId="formHorizontalPassword">
                                <Col sm={8}>
                                <FormControl ref="password" name="password" type="password" onChange={this.onChange} placeholder="הקלד סיסמא"/>
                                
                                </Col>
                                <Col componentClass={ControlLabel}>
                                סיסמא:
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col >
                                    {this.redirectUser()}
                                    <Button onClick={this.onSubmitLogin} type="submit" id="loginSubmit">התחבר</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

const UserState = (state) =>{
    console.log("state ", state)
    return
}
export default LoginForm;