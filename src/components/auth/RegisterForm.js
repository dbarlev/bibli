import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { addUser } from '../../actions/index';

import {connect} from 'react-redux';
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  Col,
  Checkbox,
  ControlLabel,
  HelpBlock,
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton,
  Grid,
  Row
} from 'react-bootstrap';
import researcher from '../img/researcher.png';
import student from '../img/student.png';
import guest from '../img/guest.png';
 
class RegisterForm extends Component {

  constructor(props)
  {
    super(props);
  }

  state = {
    validation: {
      email: {
        display: null
      },
      username: {
        display: null
      },
      password: {
        display: null
      },
      confirmPassword: {
        display: null
      },
      usernameErr: null
    },
    errorMessage: {
      email: "אימייל הוא שדה חובה",
      username: "שם משתמש הוא שדה חובה",
      password: "סיסמה היא שדה חובה",
      confirmPassword: "ווידוא סיסמה היא שדה חובה"
    }
  }

  populatePackagesCombobox(e) {
    let value = this.props.chooseSubscription.value;
    let feild;
    if (value != false) {
      switch (value) {
        case 1:
          feild = <FormControl value="חבילת חינם"/>
          break;
        case 2:
          feild = <FormControl value="חבילת פרימיום"/>
          break;
        case 3:
          feild = <FormControl value="חבילת סופר פרימיום"/>
          break;
      }

      return (
        <div>
          <FormGroup controlId="formHorizontalPackage">
          <Col sm={3}>
            <ControlLabel>בחר חבילה:</ControlLabel>
          </Col>
          <Col sm={9}>
              {feild}
            </Col>
          </FormGroup>
        </div>
      )
    } else {
      return (
        
          <FormGroup controlId="formHorizontalPackage">

            <Col sm={12}>
              <ButtonToolbar>
                <ToggleButtonGroup type="radio" name="package" defaultValue={1} aria-label="בחר חבילה">
                  <ToggleButton className="third transparent no-border" value="1"><img src={guest} className="subscripsion-icon" alt="אורח" /></ToggleButton>
                  <ToggleButton className="third transparent no-border" value="2"><img src={student} className="subscripsion-icon" alt="סטודנט" /></ToggleButton>
                  <ToggleButton className="third transparent no-border" value="3"><img src={researcher} className="subscripsion-icon" alt="חוקר" /></ToggleButton>
                </ToggleButtonGroup>
              </ButtonToolbar>
            </Col>
          </FormGroup>
        
      )
    }
  }

  formsValidation(emailVal, userNameVal){
    let isError = false;
    

    
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let mail =  re.test(String(emailVal).toLowerCase());

      if(!mail){
        this.state.validation.email.display = "error";
      }else{
        this.state.validation.email.display = "null";
      } 
   
    if(userNameVal.length < 5){  
      isError =  true;
      this.state.validation.username.display = "error";
    }else{
      isError =  false;
      this.state.validation.username.display = "null";
    }
    

    this.setState({
      ...this.state,
      ...this.state.validation
    });
    console.log('val state', this.state);
    return isError
  }


  onSubmitRegister(e)
  {
    e.preventDefault();
      

    let emailVal = e.target.elements.email.value;
    let userNameVal = e.target.elements.username.value;
    let passwordVal = e.target.elements.password.value;
    let confirmPassVal = e.target.elements.confirmPassword.value;
    let packageVal = e.target.elements.package.value;

    
    let obj = {
      name: 'dav',
      email: emailVal,
      username: userNameVal,
      password: passwordVal,
      subscription: packageVal
    }
    // console.log('this end onSubmitRegister ',this);
    // console.log('this end onSubmitRegister.props ',this.props);
    
    const err = this.formsValidation(emailVal, userNameVal);
   
      if(!err){
        this.props.onSubmitForm(obj)
      } 
  }

  updateState(obj) {
    this.setState(obj);
  }

  getElement(refs)
  {
    let element = ReactDOM.findDOMNode(refs);
    return element.value;
  }


  render() {

    const _Validation = this.state.validation;
    const _Error = this.state.errorMessage;

    return (
      <Grid id="registerForm">
        <Row>
         
          <Col className="yellow-bg"  xs={12}  sm={6} mdOffset={4} md={4}  >
            <Form horizontal className="no-border" onSubmit={this.onSubmitRegister.bind(this)}>
              <h2>תרשמו אותי לביבלי!</h2>
              <FormGroup  controlId="formHorizontalEmail" validationState={_Validation.email.display}>
                
                 <Col xs={12}>
                  <FormControl ref="email" name="email" id="email" type="email" placeholder="הקלד דואר אלקטרוני"  aria-label="דואר אלקטרוני"/>
                    <HelpBlock role="status" aria-live="polite">{ _Validation.email.display === "error"
                      ? _Error.email
                      : null}</HelpBlock>
                </Col>

              </FormGroup>

              <FormGroup controlId="formHorizontalUserName" validationState={this.state.validation.username.display}>
                <Col xs={12}>
                <FormControl 
                  ref="username" 
                  name="username" 
                  type="text" 
                  placeholder="הקלד שם משתמש" 
                  aria-label="שם משתמש"
                />
                <HelpBlock role="status" aria-live="polite">
                  { this.state.validation.username.display === "error"
                    ? _Error.username
                    : null
                  }
                </HelpBlock>
                
                </Col>

              </FormGroup>

              <FormGroup  controlId="formHorizontalPassword" validationState={_Validation.password.display}>
                <Col xs={12}>
                  <FormControl ref="password"  name="password"  type="password" placeholder="הקלד סיסמה"  aria-label="סיסמה"/>
                  <HelpBlock role="status" aria-live="polite">{_Validation.password.display === "error"
                      ? _Error.password
                      : null}</HelpBlock>
                </Col>
               

              </FormGroup>

              <FormGroup controlId="formConfirmPassword" validationState={_Validation.confirmPassword.display}>
                <Col xs={12}>
                  <FormControl ref="confirmPassword"   name="confirmPassword" type="password" placeholder="הקלד סיסמה שנית" aria-label="הקלד סיסמה שנית"/>
                  <HelpBlock role="status" aria-live="polite">{_Validation.confirmPassword.display === "error"
                      ? _Error.confirmPassword
                      : null}</HelpBlock>
                </Col>

              </FormGroup>

              {this.populatePackagesCombobox()}

              <FormGroup>
                <Col xs={12}>
                  <Checkbox>
                    אני מסכים לקבל עדכונים במייל
                  </Checkbox>
                </Col>
              </FormGroup>

              <FormGroup>
                <Col xs={12}>
                  <Button className="full-width-btn" type="submit">הירשם</Button>
                </Col>
              </FormGroup>

            </Form>
          </Col>
          <Col className="grey-bg" xs={12} sm={6} md={4}>
asdasasdגדשג
          </Col>
        </Row>

      </Grid>

    );
  }
}


export default RegisterForm;

