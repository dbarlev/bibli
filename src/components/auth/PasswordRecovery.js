import React, { Component } from 'react'
import { Form, Row, FormGroup, Col, Button, FormControl, Grid, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { PassRecoveryAction } from '../../actions/ajax';

class PasswordRecovery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailIsEmpty: ''
        }
    }

    componentDidUpdate() {
        console.log('passRecoveryData z', this.props.passRecoveryData);

    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });

        this.setState({ emailIsEmpty: '' });

    }

    onSubmitPassRec = (e) => {
        e.preventDefault();
        if (this.clientValidate()) {
            this.clientValidate();
        } else {
            this.props.PassRecoveryAction(this.state.email);
        }
    }

    clientValidate = () => {
        let isError = false;

        if (this.state.email === '') {
            isError = true;
            this.setState({ emailIsEmpty: 'לא הזנתם דואר אלקטרוני' });
        }
        return isError;
    }


    render() {
        return (
            <div>
            <Grid fluid className="page-wrap">
                <Header/>
               
                    <Row>
                        <Col md={6} mdOffset={3}>   
                            <h1>שכחתי סיסמה</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} mdOffset={3}>   
                            <p>יש להזין את כתובת המייל איתה נרשמתם לאתר</p>
                        </Col>
                    </Row>
                    <Row>
                        <div className="col-xs-12 col-md-4 col-md-offset-4">
                            <Form horizontal onSubmit={this.onSubmitPassRec.bind(this)}>
                                <FormGroup controlId="formHorizontalusername">
                                  
                                    
                                        <FormControl ref="email" name="email" type="email" onChange={this.onChange} placeholder="הקלד דואר אלקטרוני" />

                                        {
                                            this.state.emailIsEmpty ?
                                            <div className="red-alert" bsStyle="danger">לא הוזנה כתובת דואר אלקטרוני</div>
                                             :
                                                ''
                                        }

                                        <Button type="submit" className="full-width-btn btn send" id="loginSubmit">שחזר סיסמה</Button>

                                   

                                </FormGroup>
                            </Form>
                         

                            {this.props.passRecoveryData &&
                                <div  className="text-right">
                                    {this.props.passRecoveryData.mailexists == 1 ?
                                        <div className="green-alert" bsStyle="danger">הודעה נשלחה לתיבת הדואר שלך</div> :
                                        <div className="red-alert" bsStyle="danger">תיבת הדואר שהוזנה לא קיימת במערכת</div>
                                    }                               
                                </div>

                                
                            }
                            </div>
                            </Row>
                            
               
                   
                </Grid>
                 
                <Footer bottom/>
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
