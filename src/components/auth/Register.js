import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  Col,
  Checkbox,
  ControlLabel
} from 'react-bootstrap';
import Header from '../header/Header.js'

class Register extends Component {

  constructor()
  {
    super();
  }

  populatePackagesCombobox() {
    let value = this.props.chooseSubscription.value;
    let feild;
    if (this.props.chooseSubscription.value != false) {
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
              <FormControl componentClass="select">
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

  render() {

    return (
      <div className="App" id="register">
        <Header headline="הרשמה"/>
        <span>חבילה מסוג:
        </span>
        <span>{this.props.chooseSubscription.name}</span>
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <Form horizontal>
              <FormGroup controlId="formHorizontalEmail">
                <Col sm={8}>
                  <FormControl type="email" placeholder="הקלד דואר אלקטרוני"/>
                </Col>
                <Col componentClass={ControlLabel}>
                  דואר אלקטרוני:
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalUserName">
                <Col sm={8}>
                  <FormControl type="text" placeholder="הקלד שם משתמש"/>
                </Col>
                <Col componentClass={ControlLabel}>
                  שם משתמש:
                </Col>

              </FormGroup>

              <FormGroup controlId="formHorizontalPassword">
                <Col sm={8}>
                  <FormControl type="password" placeholder="הקלד סיסמה"/>
                </Col>
                <Col componentClass={ControlLabel}>
                  סיסמה:
                </Col>
              </FormGroup>

              <FormGroup controlId="formConfirmPassword">
                <Col sm={8}>
                  <FormControl type="password" placeholder="הקלד סיסמה שנית"/>
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

const mapStateToProps = (state) => {
  console.log("state", state)
  return {chooseSubscription: state.chooseSubscription}
}

export default connect(mapStateToProps, {})(Register);
