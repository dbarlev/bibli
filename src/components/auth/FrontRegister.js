import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  Col,
  Alert,
  Grid,
  Row,
  ControlLabel
} from "react-bootstrap";
import { connect } from "react-redux";

import { InsertUserToDB } from "../../actions/ajax";

class FrontRegister extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    email: "",
    password: "",
    package: 1,
    mailExists: "כתובת דואר זו כבר קיימת במערכת"
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  formsValidation() {
    let isError = false;
    const errors = {};

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let mail = re.test(String(this.state.email).toLowerCase());

    if (!mail) {
      isError = true;
      errors.noEmail = "כתובת הדואר שהוזנה אינה תקינה";
    } else if (this.props.user.registerSuccess == "exists") {
      //debugger;
      isError = true;
      errors.noEmail = "כתובת דואר זו כבר קיימת במערכת";
      console.log("state ", this.state);
    } else {
      isError = false;
      errors.noEmail = "";
    }

    if (this.state.password.length < 6) {
      isError = true;
      errors.passwordLengthError = "על הסיסמה להיות ארוכה מ 6 תווים";
    } else {
      isError = false;
      errors.passwordLengthError = "";
    }

    this.setState({
      ...this.state,
      ...errors
    });

    return isError;
  }
  onSubmitRegister = e => {
    e.preventDefault();

    let obj = {
      email: this.state.email,
      password: this.state.password,
      package: this.state.package
    };
    let err = this.formsValidation();
      if (!err) {
        this.props.InsertUserToDB(obj);
      }
  };

  render() {
    return (
      <Form>
        <h2 className="text-center bold">רוצים להצטרף אלינו?
          <br />
          הצטרפו עכשיו        </h2>
          
          <FormGroup className="" controlId="formHorizontalRegister">
          
          
            <div  style={ColPadd}>
              <div style={marginBottomZero}>
                <FormControl
                  aria-label="דואר אלקטרוני"
                  ref="email"
                  name="email"
                  type="email"
                  onChange={this.onChange}
                  placeholder="הקלד דואר אלקטרוני"
                />
              </div>
            </div>
        
          <Row>
            <Col xs={12} style={ColPadd}>
              <Row style={marginBottomZero}>
                <FormControl
                  aria-label="סיסמה"
                  ref="password"
                  name="password"
                  type="password"
                  onChange={this.onChange}
                  placeholder="הקלד סיסמה"
                />
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={12} style={TopMarginLoginBtn}>
              <Button
                onClick={this.onSubmitRegister}
                type="submit"
                className="full-width-btn" 
                style={SCbutton}
                id="registerSubmit"
              >
                רישום
              </Button>
            </Col>
          </Row>
          
          </FormGroup>
            
          {this.state.noEmail && (
            <div className="text-right danger">
            {this.state.noEmail}
            </div>
          )}

          {this.state.passwordLengthError && (
            <div className="text-right danger">
              {this.state.passwordLengthError}
            </div>
          )}

          {this.props.user.registerSuccess && (
            <div className="text-right danger">
                {this.state.mailExists}
            </div>
          )}
       
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer
  };
};

export default connect(
  mapStateToProps,
  { InsertUserToDB }
)(FrontRegister);

const TopMarginLoginBtn = {
  marginTop: "0px",
  padding: "5px"
};

const ColPadd = {
  padding: "5px"
};

const marginBottomZero = {
  marginBottom: "0px"
};

const YellowBg = {
  backgroundColor: "#f2b500"
};

const SCbutton = {
  backgroundColor: "#f2b500"
};
