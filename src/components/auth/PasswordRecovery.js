import React, { Component } from 'react'
import {Form, FormGroup, Col, Button, FormControl, Grid, Alert} from 'react-bootstrap';
import {connect} from 'react-redux';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { PassRecoveryAction } from '../../actions/ajax';

class PasswordRecovery extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            emailIsEmpty: ''
        }
      }

    componentDidUpdate(){
        console.log('passRecoveryData z', this.props.passRecoveryData);

    }
    onChange = e => {
        this.setState({[e.target.name]: e.target.value});

        this.setState({emailIsEmpty: ''});

    }

    onSubmitPassRec = (e) =>{
        e.preventDefault();
        if(this.clientValidate()){
            this.clientValidate();
        }else{
            this.props.PassRecoveryAction(this.state.email);
        }
    }

    clientValidate = () => {
        let isError = false;
        
        if(this.state.email === ''){
            isError = true;
            this.setState({emailIsEmpty: 'לא הזנתם דואר אלקטרוני'});
        }      
        return isError;
    }


    render() {
        return (
            <div>
                <Header headline="שכחתי סיסמא"/>
                <Grid className="page-wrap">    
                    <Form horizontal onSubmit={this.onSubmitPassRec.bind(this)}>
                    <FormGroup  controlId="formHorizontalusername">
                        <Col xs={12} sm={8}>
                            <FormControl ref="email" name="email" type="email" onChange={this.onChange} placeholder="הקלד דואר אלקטרוני"/>
                        
                        </Col>
                        
                        <Col  xs={12} sm={4} >
                            
                            <Button type="submit" className="full-width-btn" id="loginSubmit">שחזר סיסמא</Button>
                            
                            </Col>

                    </FormGroup>
                    </Form>
                    {
                        this.state.emailIsEmpty ? 
                        <Alert variant="danger"> {this.state.emailIsEmpty} </Alert> :
                        ''
                    }

                    {this.props.passRecoveryData && 
                        <div variant="danger" className="text-right">
                          {this.props.passRecoveryData.mailexists == 1 ? 'הודעה נשלחה לתיבת הדואר שלך' : 'תיבת הדואר שהוזנה לא קיימת במערכת'}
                        </div>
                      }
                </Grid>
                <Footer className="site-footer"/>
            </div>
        )
    }
}



const mapStateToProps = state => {
    
    return{
        passRecoveryData: state.userReducer.passRecoveryData
    }
}

export default connect(mapStateToProps, {PassRecoveryAction})(PasswordRecovery)
