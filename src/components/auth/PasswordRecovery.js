import React, { Component } from 'react'
import {Form, FormGroup, Col, Button, FormControl, Grid} from 'react-bootstrap';
import {connect} from 'react-redux';
import Header from '../header/Header';
import { PassRecoveryAction } from '../../actions/ajax';

class PasswordRecovery extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: ''
        }
      }

    componentDidUpdate(){
        console.log('passRecoveryData', this.props.passRecoveryData);

    }
    onChange = e => {
        this.setState({[e.target.name]: e.target.value});

    }

    onSubmitPassRec = (e) =>{
        e.preventDefault();
        this.props.PassRecoveryAction(this.state.email);
    }



    render() {
        return (
            <div>
                <Header headline="שכחתי סיסמא"/>
                <Grid>    
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
                    
                    {this.props.passRecoveryData && 
                        <div variant="danger" className="text-right">
                          {this.props.passRecoveryData.mailexists == 1 ? 'הודעה נשלחה לתיבת הדואר שלך' : 'תיבת הדואר שהוזנה לא קיימת במערכת'}
                        </div>
                      }
                </Grid>
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
