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
        <div>
          <FormGroup controlId="formHorizontalPackage">
            <Col sm={3}>
              <ControlLabel>בחר חבילה:</ControlLabel>
            </Col>
            <Col sm={9}>
              <FormControl defaultValue="2" name="ששש" componentClass="select">
                <option value="1">חבילת חינם</option>
                <option value="2">חבילת פרימיום</option>
                <option value="3">חבילת סופר פרימיום</option>
              </FormControl>
              <ButtonToolbar>
                <ToggleButtonGroup type="radio" name="package" defaultValue={1}>
                  <ToggleButton value="1">חבילת חינם</ToggleButton>
                  <ToggleButton value="2">חבילת פרימיום</ToggleButton>
                  <ToggleButton value="3">חבילת סופר פרימיום</ToggleButton>
                </ToggleButtonGroup>
              </ButtonToolbar>
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
      <Grid id="registerForm">
        <Row>
          <Col className="yellow-bg" xsOffset={2} xs={8} mdOffset={4} md={4}>
            <Form horizontal onSubmit={this.onSubmitRegister.bind(this)}>
              <FormGroup  controlId="formHorizontalEmail" validationState={_Validation.email.display}>
                 <Col sm={3} componentClass={ControlLabel}>
                    דואר אלקטרוני:
                 </Col>  
                 <Col sm={9}>
                  <FormControl ref="email" name="email" id="email" type="email" placeholder="הקלד דואר אלקטרוני"/>
                  <HelpBlock role="status" aria-live="polite">{ _Validation.email.display === "error"
                      ? _Error.email
                      : null}</HelpBlock>
                </Col>

              </FormGroup>

              <FormGroup controlId="formHorizontalUserName" validationState={_Validation.username.display}>
               
                <Col sm={3} componentClass={ControlLabel}>
                  שם משתמש:
                </Col>
                <Col sm={9}>
                <FormControl ref="username" name="username" type="text" placeholder="הקלד שם משתמש"/>
                <HelpBlock role="status" aria-live="polite">{_Validation.username.display === "error"
                    ? _Error.username
                    : null}</HelpBlock>
              </Col>

              </FormGroup>

              <FormGroup  controlId="formHorizontalPassword" validationState={_Validation.password.display}>
                <Col sm={3} componentClass={ControlLabel}>
                   סיסמה:
                </Col>  
                <Col sm={9}>
                  <FormControl ref="password"  name="password"  type="password" placeholder="הקלד סיסמה"/>
                  <HelpBlock role="status" aria-live="polite">{_Validation.password.display === "error"
                      ? _Error.password
                      : null}</HelpBlock>
                </Col>
               

              </FormGroup>

              <FormGroup controlId="formConfirmPassword" validationState={_Validation.confirmPassword.display}>
                <Col sm={3} componentClass={ControlLabel}>
                  וודא סיסמה:
                </Col>
                <Col sm={9}>
                  <FormControl ref="confirmPassword"   name="confirmPassword" type="password" placeholder="הקלד סיסמה שנית"/>
                  <HelpBlock role="status" aria-live="polite">{_Validation.confirmPassword.display === "error"
                      ? _Error.confirmPassword
                      : null}</HelpBlock>
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
                  <Button className="full-width-btn" type="submit">הירשם</Button>
                </Col>
              </FormGroup>

            </Form>
          </Col>
          <Col className="grey-bg" xs={8} md={4}>
asdasasdגדשג
          </Col>
        </Row>

      </Grid>

    );
  }
}


export default RegisterForm;

