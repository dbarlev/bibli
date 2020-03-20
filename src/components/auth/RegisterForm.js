import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
  Button,
  Form,
  FormGroup,
  FormControl,
  Col,
  Checkbox,
  ControlLabel,
  Alert,
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton,
  Grid,
  Row
} from 'react-bootstrap';
import { connect } from 'react-redux';
import PlansTable from './plansTable';
import researcher from '../img/researcher.png';
import student from '../img/student.png';
import guest from '../img/guest.png';

class RegisterForm extends Component {

  //   constructor(props){
  //     super(props);
  //   }

  //   state = {
  //       email: '',
  //       username: '',
  //       password: '',
  //       confirmPassword: '',
  //       package: '',
  //       mailExists: 'כתובת דואר זו כבר קיימת במערכת'

  //   }

  //   populatePackagesCombobox(e) {
  //     let value = this.props.chooseSubscription.value;
  //     let feild;
  //     if (value != false) {
  //       switch (value) {
  //         case 1:
  //           feild = <FormControl value="חבילת חינם"/>
  //           break;
  //         case 2:
  //           feild = <FormControl value="חבילת פרימיום"/>
  //           break;
  //         case 3:
  //           feild = <FormControl value="חבילת סופר פרימיום"/>
  //           break;
  //       }

  //       return (
  //         <div>
  //           <FormGroup controlId="formHorizontalPackage">
  //           <Col sm={3}>
  //             <ControlLabel>בחר חבילה:</ControlLabel>
  //           </Col>
  //           <Col sm={9}>
  //               {feild}
  //             </Col>
  //           </FormGroup>
  //         </div>
  //       )
  //     } else {
  //       return (

  //           <FormGroup controlId="formHorizontalPackage">

  //             <Col md={12}>
  //               <ButtonToolbar
  //               onChange={this.onChange.bind(this)}
  //               >
  //                 <ToggleButtonGroup type="radio" name="package"  aria-label="בחר חבילה">
  //                   <ToggleButton className="third transparent no-border" value="1"><img src={guest} className="subscripsion-icon" alt="אורח" /></ToggleButton>
  //                   <ToggleButton className="third transparent no-border" value="2"><img src={student} className="subscripsion-icon" alt="סטודנט" /></ToggleButton>
  //                   <ToggleButton className="third transparent no-border" value="3"><img src={researcher} className="subscripsion-icon" alt="חוקר" /></ToggleButton>
  //                 </ToggleButtonGroup>
  //               </ButtonToolbar>
  //             </Col>
  //           </FormGroup>

  //       )
  //     }
  //   }

  //   onChange = e => {
  //     this.setState({
  //       [e.target.name]: e.target.value
  //     })

  //   }

  //   formsValidation(){
  //     let isError = false;
  //     const errors = {};


  //     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //     let mail =  re.test(String(this.state.email).toLowerCase());



  //     if(!mail){
  //       isError = true;
  //       errors.noEmail = "חובה למלא את שדה דואר אלקטרוני";
  //     }else if(this.props.user.registerSuccess == 'exists'){
  //       isError = true;
  //       errors.noEmail = "כתובת דואר זו כבר קיימת במערכת";
  //     }else{
  //       isError = false;
  //       errors.noEmail = "";
  //     }



  //     if(this.state.username.length < 5){  
  //       isError =  true;
  //       errors.usernameError = "על שדה שם משתמש להיות לפחות 5 תווים";

  //     }else{
  //       isError =  false;
  //       errors.usernameError = ""
  //     }

  //     if(this.state.password.length < 6){
  //       isError =  true;
  //       errors.passwordLengthError = "על הסיסמה להיות ארוכה מ 6 תווים"
  //     }else{
  //       isError =  false;
  //       errors.passwordLengthError = ""
  //     }

  //     if( this.state.confirmPassword !==  this.state.password){
  //       isError =  true;
  //       errors.passwordMatchError = "הסיסמאות לא תואמות"

  //     }else{
  //       isError =  false;
  //       errors.passwordMatchError = ""
  //     }


  //     if(this.state.package == ''){
  //       isError =  true;
  //       errors.packageError = "חובה לבחור חבילה";
  //     }else{
  //       isError =  false;
  //       errors.packageError = ""
  //     }
  //     this.setState({
  //       ...this.state,
  //       ...errors
  //     });
  //     return isError
  //   }


  //   onSubmitRegister(e)
  //   {
  //     e.preventDefault();


  //     let emailVal = e.target.elements.email.value;
  //     let userNameVal = e.target.elements.username.value;
  //     let passwordVal = e.target.elements.password.value;
  //     let confirmPassVal = e.target.elements.confirmPassword.value;
  //     let packageVal = e.target.elements.package.value;


  //     let obj = {
  //       name: 'dav',
  //       email: emailVal,
  //       username: userNameVal,
  //       password: passwordVal,
  //       subscription: packageVal, 

  //     }
  //     let err = this.formsValidation();
  //     if (!err){
  //       this.props.onSubmitForm(this.state);
  //     }
  //   }


  //   updateState(obj) {
  //     this.setState(obj);
  //   }


  //   render() {

  //     return (

  //       <Grid id="registerForm">
  //         <Row>
  //           <Col className="yellow-bg"  xs={12}  sm={6} mdOffset={4} md={4}  >
  //             <Form horizontal className="no-border " onSubmit={this.onSubmitRegister.bind(this)}>
  //               <h3 className="text-right">תרשמו אותי לביבלי!</h3>
  //               <FormGroup>
  //                 <Col xs={12}>
  //                   <FormControl 
  //                     ref="email" 
  //                     name="email" 
  //                     id="email" 
  //                     type="email" 
  //                     placeholder="הקלד דואר אלקטרוני"  
  //                     aria-label="דואר אלקטרוני"
  //                     onChange={this.onChange.bind(this)}
  //                   />
  //                 </Col>


  //               </FormGroup>

  //               {this.state.noEmail && 
  //                 <Alert bsStyle="danger" className="text-right">
  //                   {this.state.noEmail}
  //                 </Alert>
  //               }


  //               {this.props.user.registerSuccess && 
  //                 <Alert bsStyle="danger" className="text-right">
  //                   {this.state.mailExists}
  //                 </Alert>
  //               }



  //               <FormGroup controlId="formHorizontalUserName">
  //                 <Col xs={12}>
  //                   <FormControl 
  //                     ref="username" 
  //                     name="username" 
  //                     type="text" 
  //                     placeholder="הקלד שם משתמש" 
  //                     aria-label="שם משתמש"
  //                     onChange={this.onChange.bind(this)}
  //                   /> 
  //                 </Col>

  //               </FormGroup>

  //               {this.state.usernameError && 
  //                 <Alert variant="danger" className="text-right">
  //                   {this.state.usernameError}
  //                 </Alert>
  //               }

  //               <FormGroup  controlId="formHorizontalPassword">
  //                 <Col xs={12}>
  //                   <FormControl 
  //                     ref="password"  
  //                     name="password"  
  //                     type="password" 
  //                     placeholder="הקלד סיסמה"  
  //                     aria-label="סיסמה"
  //                     onChange={this.onChange.bind(this)}
  //                   />
  //                 </Col>

  //               </FormGroup>
  //               {this.state.passwordLengthError && 
  //                 <Alert variant="danger" className="text-right">
  //                   {this.state.passwordLengthError}
  //                 </Alert>
  //               }

  //               <FormGroup controlId="formConfirmPassword">
  //                 <Col xs={12}>
  //                   <FormControl 
  //                     ref="confirmPassword"   
  //                     name="confirmPassword" 
  //                     type="password" 
  //                     placeholder="הקלד סיסמה שנית" 
  //                     aria-label="הקלד סיסמה שנית"
  //                     onChange={this.onChange.bind(this)}
  //                   />
  //                 </Col>

  //               </FormGroup>
  //               {this.state.passwordMatchError && 
  //                 <Alert bsStyle="danger" className="text-right">
  //                   {this.state.passwordMatchError}
  //                 </Alert>
  //               }
  //               {this.populatePackagesCombobox()}
  //               <FormGroup>
  //               {this.state.packageError && 
  //                 <Alert bsStyle="danger" className="text-right">
  //                   {this.state.packageError}
  //                 </Alert>
  //               }
  //                 <Col xs={12}>
  //                   <Checkbox>
  //                     אני מסכים לקבל עדכונים במייל
  //                   </Checkbox>
  //                 </Col>
  //               </FormGroup>
  //               <FormGroup>
  //                 <Col xs={12}>
  //                   <Button className="full-width-btn" type="submit">הירשם</Button>
  //                 </Col>
  //               </FormGroup>
  //             </Form>
  //           </Col>
  //           <PlansTable />

  //         </Row>

  //       </Grid>

  //     );
  //   }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer
  }
}
export default connect(mapStateToProps, null)(RegisterForm);

