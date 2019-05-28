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

import { userLogedIn } from '../../actions'; 

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

    componentWillMount(){
        console.log('mount', this.props);
    }
    componentDidUpdate(){
        console.log('Update', this.props);
        console.log('Update username',  this.props.userid);
        
    }

    clientValidate = () => {
        let isError = false;
        
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

    validate = () => {
        let isError = false;

        if(this.state.auth === false){
            isError = true;
            this.setState({usernameError: 'אחד הפרטים שהזנתם שגוי'});
        }
      
        return isError;
    }



    onSubmitLogin(event){
        event.preventDefault();
    
        if(this.clientValidate()){
            this.clientValidate();
        }else{
        fetch('http://127.0.0.1/bibli/api/user_switch/' + this.state.username + 
        '/'+ this.state.password )
        .then(response => response.json())
        .then(json => {
            if(json.count > 0)
            {
                this.setState({auth: true});
                this.props.userLogedIn(json);
                this.redirectUser(json);
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

    }

    redirectUser = (json) => {
        console.log('json', json);
        console.log('state', this.state);
        if(this.state.auth == true){
            localStorage.setItem('userid', json.userid);
            localStorage.setItem('auth', this.state.auth);
            console.log('xxx');
            return <Redirect to='/biblist' />
            console.log('yyy');
            debugger;

        }
    }


    onChange(event){
        this.setState({
            //משום מה לא הצלחתי לעבוד עם ref הבנתי ששאפשר רק בתוך lifecyclemethod...
            [event.target.name]: event.target.value,
            auth: false,
            usernameError: '',
            EmptyPasswordError: '',
            EmptyUsernameError: ''
        })

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
                            <small><Link to="/register">אינך רשום? הרשם!</Link></small>
                        </Form>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userLogedIn: (params) => dispatch(userLogedIn(params))
    };
};


const mapStateToProps = state => {
    return {
        userid: state.authReducer.userid,
        auth: state.authReducer.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);