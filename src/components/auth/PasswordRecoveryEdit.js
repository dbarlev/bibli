import React, { Component } from 'react';
import {Form, Alert, FormGroup, Col, Button, FormControl, Grid} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Header from '../header/Header';
import { PassRecoveryEdit } from '../../actions/ajax';

class PasswordRecoveryEdit extends Component {
    constructor(props){
        super(props);
        this.state ={
            password: '',
            confirmPassword: '',
        } 
    }

    componentDidUpdate(){
       // console.log('passRecoveryEditSuccess', this.props.passRecoveryEditSuccess);
    }

    onChange = (e) => {
       this.setState({
            [e.target.name]: e.target.value
        })  
    }


    formValidation = () => {
        let isError = false;
        const errors = {};

        if(this.state.password.length < 6){
            isError =  true;
            errors.passwordLengthError = "על הסיסמה להיות ארוכה מ 6 תווים"
          }else{
            isError =  false;
            errors.passwordLengthError = ""
          }
      
          if( this.state.confirmPassword !==  this.state.password){
            isError =  true;
            errors.passwordMatchError = "הסיסמאות לא תואמות"
      
          }else{
            isError =  false;
            errors.passwordMatchError = ""
          }

        this.setState({
            ...this.state,
            ...errors
        });
        return isError
    }

    onSubmit = (e) => {
        e.preventDefault();
        //console.log('onSubmit');
        //console.log('this.state', this.state);

        let obj = {
            password: this.state.password,
            token: this.props.match.params.token
        }
    let err = this.formValidation();
        if(!err){
            this.props.PassRecoveryEdit(obj);
        // console.log('success');
        }

    }

    massage = () => {
        console.log('massage function');
        let msg = '';
        if(this.props.passRecoveryEditSuccess.password_changed == 1){
            msg = 'aaaa';
        }else{
            msg = 'bbbb';
        }
        return msg;
    }


    render() {
        return (
            <div>
                <Header headline="הזינו סיסמה חדשה"/>
                <Grid>
                    <Form horizontal onSubmit={this.onSubmit.bind(this)}>  
                        <FormGroup>
                            <FormControl 
                                ref="password"
                                name="password"
                                id="password"
                                type="password"
                                placeholder="הקלידו את הסיסמה"
                                aria-label="הקלידו את הסיסמה"
                                onChange={this.onChange.bind(this)}
                            />    
                        </FormGroup>
                        {this.state.passwordLengthError  &&
                            <Alert variant="danger" className="text-right">
                                {this.state.passwordLengthError}
                            </Alert>    
                        }

                        <FormGroup>
                            <FormControl 
                                ref="confirmPassword"
                                name="confirmPassword"
                                id="confirmPassword"
                                type="password"
                                placeholder="הקלידו הסיסמה שנית"
                                aria-label="הקלידו הסיסמה שנית"
                                onChange={this.onChange.bind(this)}
                            />    
                        </FormGroup>
                        {this.state.passwordMatchError  &&
                            <Alert variant="danger" className="text-right">
                                {this.state.passwordMatchError}
                            </Alert>    
                        }
                        <FormGroup>
                        <Col xs={12}>
                          <Button className="full-width-btn" type="submit">שינוי סיסמה</Button>
                        </Col>
                      </FormGroup>
                    </Form>

                    {this.props.passRecoveryEditSuccess && 
                   
                        this.massage()
                    }
                    {this.props.passRecoveryEditSuccess && 
                   
                        (this.props.passRecoveryEditSuccess.password_changed == 1 ? 'a': 'b')
                    }
                    dav
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
            passRecoveryEditSuccess: state.userReducer.passRecoveryedit
    }
}


export default connect(mapStateToProps, {PassRecoveryEdit})(PasswordRecoveryEdit)
