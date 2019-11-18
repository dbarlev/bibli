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
            notActiveUserError: '',
            UserDoesNotExist: '',
            userid: ''
        }
        this.onSubmitLogin = this.onSubmitLogin.bind(this);
        this.onChange = this.onChange.bind(this);
       
    }

    componentWillMount(){
        //console.log('mount', this.props);
    }

/*
    checkUserVal(){
        if(this.props.auth === false && this.props.userid !== undefined){
            console.log('this.props 1', this.props);
            this.setState({notActiveUserError: 'חשבון לא s מאומת'});
        }
        if(this.props.auth === false && this.props.userid === undefined){
            console.log('this.props 2', this.props);
            this.setState({UserDoesNotExist: 'משתשמ לא קיים'});
        }
    }
*/

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth == false && nextProps.userid !== undefined) {
            console.log('nextProps 1', nextProps);
        this.setState({ notActiveUserError: 'חשבון לא מאומת' });
        }
        if (nextProps.auth == false && nextProps.userid == undefined) {
            console.log('nextProps 2', nextProps);
        this.setState({ UserDoesNotExist: 'משתשמש לא קיים' });
        }


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
       
console.log('login_active_test', this.props )
        //console.log('state', this.state);
        if(this.props.auth === true && this.props.userid != null){
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
            EmptyUsernameError: '',
            notActiveUserError: '',
            UserDoesNotExist: ''
        })

    }

    isLoggedIn = () =>{
        console.log(' this.props.auth ',  this.props.auth);
       
    }

    render() {
        this.isLoggedIn();
        return (
            
                        <Form>
                            
                            <FormGroup  controlId="formHorizontalusername">
                                <Col xs={12} sm={5} style={TopMarginLoginBtn}>
                                <Row style={marginBottomZero}>
                                    <FormControl ref="email" name="email" type="email" onChange={this.onChange} placeholder="דואר אלקטרוני" aria-label="דואר אלקטרוני"/>
                                </Row>
                                </Col>
                                <Col xs={12} sm={4} style={TopMarginLoginBtn}>
                                <Row style={marginBottomZero}>
                                    <FormControl ref="password" name="password" type="password" onChange={this.onChange} placeholder="הקלד סיסמה" aria-label="סיסמה"/>
                                    </Row>
                                </Col>
                                
                                <Col  xs={12} sm={3} style={TopMarginLoginBtn} >
                                    
                                    <Button onClick={this.onSubmitLogin} type="submit" className="full-width-btn" id="loginSubmit">התחבר</Button>
                                    {this.redirectUser()}
                                    </Col>
                                    <Col xs={12}>
                                    <Link to="/passwordrecovery">שכחתי את הסיסמה</Link>
                                </Col>
                            </FormGroup>
                            {
                                this.state.EmptyUsernameError ? 
                                <Alert bsStyle="danger"> {this.state.EmptyUsernameError} </Alert> :
                                ''
                            }
                            {
                                this.state.EmptyPasswordError ? 
                                <Alert bsStyle="danger"> {this.state.EmptyPasswordError} </Alert> :
                                ''
                            }

                            {
                                this.state.usernameError ? 
                                <Alert bsStyle="danger"> {this.state.usernameError} </Alert> :
                                ''
                            }
                             {
                                 //PROBLEM!! state updates before props
                                 this.state.notActiveUserError ? 
                                <Alert bsStyle="danger">{this.state.notActiveUserError}</Alert> :
                                ''
                            }
                            {
                                //PROBLEM!! state updates before props
                                this.state.UserDoesNotExist ? 
                                <Alert bsStyle="danger">{this.state.UserDoesNotExist} </Alert> :
                                ''
                            }
                           
                            <Row className="show-grid">
                          
                        </Row>
                        </Form>
                  

           
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


const TopMarginLoginBtn = {
    marginTop: "16px",
    padding: "5px"
  };


const marginBottomZero = {
    marginBottom: "0px"
};