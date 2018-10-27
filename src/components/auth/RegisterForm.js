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
  HelpBlock
} from 'react-bootstrap';


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
      }
    },
    errorMessage: {
      email: "אימייל הוא שדה חובה",
      username: "שם משתמש הוא שדה חובה",
      password: "סיסמה היא שדה חובה",
      confirmPassword: "ווידוא סיסמה היא שדה חובה"
    }
  }

  populatePackagesCombobox() {
    let value = 1;
    let feild;
    if (1 != false) {
      switch (value) {
        case 1:
          feild = <FormControl disabled="true" value="חבילת חינם"/>
          break;
        case 2:
          feild = <FormControl disabled="true" value="חבילת פרימיום"/>
          break;
        case 3:
          feild = <FormControl disabled="true" value="חבילת סופר פרימיום"/>
          break;
      }

      return (
        <div>
          <FormGroup controlId="formHorizontalPackage">
            <ControlLabel>בחר חבילה:</ControlLabel>
            <Col sm={8}>
              {feild}
            </Col>
          </FormGroup>
        </div>
      )
    } else {
      return (
        <div>
          <FormGroup controlId="formHorizontalPackage">
            <ControlLabel>בחר חבילה:</ControlLabel>
            <Col sm={8}>
              <FormControl defaultValue="2" componentClass="select">
                <option value="1">חבילת חינם</option>
                <option value="2">חבילת פרימיום</option>
                <option value="3">חבילת סופר פרימיום</option>
              </FormControl>
            </Col>
          </FormGroup>
        </div>
      )
    }
  }

  onSubmitRegister(e)
  {
    e.preventDefault();
  
    let emailVal = e.target.elements.email.value;
    let userNameVal = e.target.elements.username.value;
    let passwordVal = e.target.elements.password.value;
    let confirmPassVal = e.target.elements.confirmPassword.value;

    let obj = {
      name: 'dav',
      email: emailVal,
      username: userNameVal,
      password: passwordVal,
      academicInstitution: 'aaa',
      subscription: 'asdaa'
    }
    // console.log('this end onSubmitRegister ',this);
    // console.log('this end onSubmitRegister.props ',this.props);
    this.props.onSubmitForm(obj)
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
      <div id="registerForm">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <Form horizontal onSubmit={this.onSubmitRegister.bind(this)}>
              <FormGroup  controlId="formHorizontalEmail" validationState={_Validation.email.display}>
                <Col sm={8}>
                  <FormControl ref="email" name="email" id="email" type="email" placeholder="הקלד דואר אלקטרוני"/>
                  <HelpBlock role="status" aria-live="polite">{ _Validation.email.display === "error"
                      ? _Error.email
                      : null}</HelpBlock>
                </Col>
                <Col componentClass={ControlLabel}>
                  דואר אלקטרוני:
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalUserName" validationState={_Validation.username.display}>
                <Col sm={8}>
                  <FormControl ref="username" name="username" type="text" placeholder="הקלד שם משתמש"/>
                  <HelpBlock role="status" aria-live="polite">{_Validation.username.display === "error"
                      ? _Error.username
                      : null}</HelpBlock>
                </Col>
                <Col componentClass={ControlLabel}>
                  שם משתמש:
                </Col>

              </FormGroup>

              <FormGroup  controlId="formHorizontalPassword" validationState={_Validation.password.display}>
                <Col sm={8}>
                  <FormControl ref="password"  name="password"  type="password" placeholder="הקלד סיסמה"/>
                  <HelpBlock role="status" aria-live="polite">{_Validation.password.display === "error"
                      ? _Error.password
                      : null}</HelpBlock>
                </Col>
                <Col componentClass={ControlLabel}>
                  סיסמה:
                </Col>

              </FormGroup>

              <FormGroup controlId="formConfirmPassword" validationState={_Validation.confirmPassword.display}>
                <Col sm={8}>
                  <FormControl ref="confirmPassword"   name="confirmPassword" type="password" placeholder="הקלד סיסמה שנית"/>
                  <HelpBlock role="status" aria-live="polite">{_Validation.confirmPassword.display === "error"
                      ? _Error.confirmPassword
                      : null}</HelpBlock>
                </Col>
                <Col componentClass={ControlLabel}>
                  וודא סיסמה:
                </Col>
              </FormGroup>

              {this.populatePackagesCombobox()}

              <FormGroup>
                <Col sm={12}>
                  <Checkbox>
                    אני מסכים לקבל עדכונים במייל
                  </Checkbox>
                </Col>
              </FormGroup>

              <FormGroup>
                <Col >
                  <Button type="submit">הירשם</Button>
                </Col>
              </FormGroup>

            </Form>
          </div>
        </div>

      </div>

    );
  }
}



export default RegisterForm;

