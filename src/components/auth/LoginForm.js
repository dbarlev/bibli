import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
            username: 'david',
            password: '954472'
        }
        this.onSubmitLogin = this.onSubmitLogin.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmitLogin(event){

        let data = this.state;
        event.preventDefault();
        fetch('http://127.0.0.1/bibli/rest/api/post/read_user_data.php?username=' + this.state.username + '&password='+ this.state.password )
        .then(response => response.json())
        .then(parsedJSON => console.log(parsedJSON.results))
        .then(data => this.setState({ data }))
        .catch(error => console.log('parsing faild', error))
    }

    onChange(event){
        // this.setState({
        //     //משום מה לא הצלחתי לעבוד עם ref הבנתי ששאפשר רק בתוך lifecyclemethod...
        //     [event.target.name]: event.target.value
        // })

        // console.log(this.state);
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

export default LoginForm;