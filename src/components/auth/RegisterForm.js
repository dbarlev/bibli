import React, {Component} from 'react';
import ReactDOM from 'react-dom';

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
      emailExists: {
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
      emailExists: 'כתובת המייל הזו כבר קיימת במערכת',
      username: "שם משתמש הוא שדה חובה",
      password: "סיסמה היא שדה חובה",
      confirmPassword: "הסיסמאות אינן זהות"
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

            <Col md={12}>
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

  formsValidation(emailVal, userNameVal, passwordVal, confirmPassVal){
    let isError = false;
    
console.log('dav123 ', this.props);
    
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let mail =  re.test(String(emailVal).toLowerCase());

    if(!mail){
      this.state.validation.email.display = "error";
    }else if(this.props.mailExists == 0){ //this value comes from register component
      console.log('mailExists  xxx');
      this.state.validation.email.display = "exists";
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
    
    if(passwordVal.length < 6){
      isError =  true;
      this.state.validation.password.display = "error";
    }else{
      isError =  false;
      this.state.validation.password.display = "null";
    }

    if( passwordVal !== confirmPassVal){
      isError =  true;
      this.state.validation.confirmPassword.display = "error";
    }else{
      isError =  false;
      this.state.validation.confirmPassword.display = "null";
    }

    this.setState({
      ...this.state,
      ...this.state.validation
    });
    // console.log('val state', this.state);
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
    
    const err = this.formsValidation(emailVal, userNameVal, passwordVal, confirmPassVal);
   
      if(!err){
        this.props.onSubmitForm(obj)
      } 
  }


  onClick=()=>{
    
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
          
            <Form horizontal className="no-border " onSubmit={this.onSubmitRegister.bind(this)}>
              <h3 className="text-right">תרשמו אותי לביבלי!</h3>
              <FormGroup  validationState={_Validation.email.display}>
                
                 <Col xs={12}>
                  <FormControl ref="email" name="email" id="email" type="email" placeholder="הקלד דואר אלקטרוני"  aria-label="דואר אלקטרוני"/>
                    <HelpBlock role="status" aria-live="polite">
                      { _Validation.email.display === "error"
                      ? _Error.email
                      : null}
                      { _Validation.email.display === "exists"
                      ? _Error.emailExists
                      : null}
                      </HelpBlock>
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
            <h3 className="text-right">התוכניות שלנו</h3>
            <Row>
              <Col className="" xs={4}>
                <img src={guest} className="subscripsion-icon" alt="אורח" />
              </Col>
              <Col className="text-right" xs={8} >
                <h4>ללא עלות</h4>    
                <ul>
                  <li>רשימות ביבליוגרפיות : 1</li>
                  <li>מספר פריטים ברשימה: 7</li>
                </ul>
              </Col>
            </Row>
            <Row>
              <Col className="" xs={4}>
                <img src={student} className="subscripsion-icon" alt="סטודנט" />
              </Col>
              <Col className="text-right" xs={8} >
                <h4>8 ש"ח בחודש</h4>    
                <ul>
                  <li>רשימות ביבליוגרפיות : 10</li>
                  <li>מספר פריטים ברשימה: 20</li>
                </ul>
              </Col>
            </Row>
            <Row>
              <Col className="" xs={4}>
                <img src={researcher} className="subscripsion-icon" alt="חוקר" />
              </Col>
            
              <Col className="text-right" xs={8} >
                <h4>45 ש"ח בחודש</h4>    
                <ul>
                  <li><b>רשימות ביבליוגרפיות : </b>ללא הגבלה</li>
                  <li>מספר פריטים ברשימה: ללא הגבלה</li>
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>

      </Grid>

    );
  }
}


export default RegisterForm;

