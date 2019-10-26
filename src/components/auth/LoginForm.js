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
        console.log(' this.props.auth ',  this.props.auth);
       
    }

    render() {
        this.isLoggedIn();
        return (
            
                        <Form>
                            
                            <FormGroup  controlId="formHorizontalusername">
                                <Col xs={4} sm={5} style={ColPadd}>
                                <Row>
                                דואר אלקטרוני
                                </Row>
                                <Row style={marginBottomZero}>
                                    <FormControl ref="email" name="email" type="email" onChange={this.onChange} placeholder="הקלד דואר אלקטרוני"/>
                                </Row>
                                </Col>
                                <Col xs={4} sm={4} style={ColPadd}>
                                <Row>
                              סיסמה
                                </Row>
                                <Row style={marginBottomZero}>
                                    <FormControl ref="password" name="password" type="password" onChange={this.onChange} placeholder="הקלד סיסמה"/>
                                    </Row>
                                </Col>
                                
                                <Col  xs={4} sm={3} style={TopMarginLoginBtn} >
                                    
                                    <Button onClick={this.onSubmitLogin} type="submit" className="full-width-btn" id="loginSubmit">התחבר</Button>
                                    {this.redirectUser()}
                                    </Col>
                                    <Col xsOffset={4} xs={4} smOffset={5} sm={7}>
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
                                this.props.auth == false ? 
                                <Alert bsStyle="danger"> לא קיים משתמש </Alert> :
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
    marginTop: "31px",
    padding: "5px"
  };

const ColPadd = {
    padding: "5px"
};

const marginBottomZero = {
    marginBottom: "0px"
};