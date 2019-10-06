import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link  } from 'react-router-dom';
import {
    Button,
    Form,
    FormGroup,
    FormControl,
    Col,
    Alert,
    Grid,
    Row
} from 'react-bootstrap';

import { userLogedIn } from '../../actions'; 
import { userLogin } from '../../actions/ajax'; 


class LoginForm extends Component {
    constructor() {
        super();
        this.state={
            email: '',
            username: '',
            password: '',
            data: [],
            auth: false,
            usernameError: '',
            passwordError: '',
            EmptyUsernameError: '',
            EmptyPasswordError: '',
            userid: ''
        }
        this.onSubmitLogin = this.onSubmitLogin.bind(this);
        this.onChange = this.onChange.bind(this);
       
    }

    componentWillMount(){
        //console.log('mount', this.props);
    }
    componentDidUpdate(){
        //console.log('Update', this.props);
//        console.log('Update username',  this.props.userid);

        
    }

    clientValidate = () => {
        let isError = false;
        
        if(this.state.email === ''){
            isError = true;
            this.setState({EmptyUsernameError: 'לא הזנתם דואר אלקטרוני'});
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
            let userData ={
                email: this.state.email,
                password: this.state.password
            }
            this.props.userLogin(userData);
    }

    }

    redirectUser = () => {

        //console.log('state', this.state);
        if(this.props.auth === true){
            // localStorage.setItem('userid', this.props.userid);
            // localStorage.setItem('auth', this.state.auth);
            // localStorage.setItem('username', this.props.username);

            const timestamp = new Date().getTime(); // current time
            const exp = timestamp + (60 * 60 * 24 * 1000 * 7)                // add one week

            let auth = `auth=${this.props.auth};expires=${exp}`;
            let userid = `userid=${this.props.userid};expires=${exp}`;
           
            document.cookie = auth;
            document.cookie = userid;
            
            return <Redirect to='/records/biblist' />
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

    isLoggedIn = () =>{
        console.log(' this.props.auth ',  this.props);
       
    }

    render() {
        this.isLoggedIn();
        return (
            <Grid fluid id="LoginForm" className="yellow-bg">
               
                <Row className="show-grid">
                    <Col xsOffset={2} xs={8} mdOffset={3} md={6}>
                        <h2 className="text-center">
                            <span style={bold}>
                                כבר רשומים? 
                            </span> 
                            התחברו!
                            </h2>
                        <Form horizontal>
                            <FormGroup  controlId="formHorizontalusername">
                                <Col xs={12} sm={4}>
                                    <FormControl ref="email" name="email" type="email" onChange={this.onChange} placeholder="הקלד דואר אלקטרוני"/>
                                  
                                </Col>
                                <Col xs={12} sm={4}>
                                    <FormControl ref="password" name="password" type="password" onChange={this.onChange} placeholder="הקלד סיסמה"/>
                                  
                                </Col>
                                
                                <Col  xs={12} sm={4} >
                                    
                                    <Button onClick={this.onSubmitLogin} type="submit" className="full-width-btn" id="loginSubmit">התחבר</Button>
                                    {this.redirectUser()}
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
                        </Form>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xsOffset={2} xs={8} mdOffset={3} md={6}>
                        <Link to="/passwordrecovery">שכחתי את הסיסמה</Link>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
const bold={
    fontWeight: 'bolder'
}
const mapDispatchToProps = dispatch => {
    return {
        userLogedIn: (params) => dispatch(userLogedIn(params))
    };
};


const mapStateToProps = state => {
    return {
        userid: state.authReducer.userid,
        auth: state.authReducer.auth,
        email: state.authReducer.email
    }
}

export default connect(mapStateToProps, {userLogedIn, userLogin})(LoginForm);