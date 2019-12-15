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
import { withRouter } from "react-router-dom";
import { InsertUserToDB } from "../../actions/ajax";
import { apiClient } from '../../common/apiClient';
import { TogglePass } from '../../common/Util.js';
import './FrontRegister.scss';
class FrontRegister extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    email: "",
    password: "",
    package: 1,
    registerSuccess: false,
    mailExists: "כתובת דואר זו כבר קיימת במערכת",
    mailSuccess: "ההרשמה בוצעה בהצלחה",
    error: ''
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });

    this.setState({
      noEmail:'',
      passwordLengthError:'',
      registerSuccess: false
    })
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

    if (this.state.error.length < 6) {
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

  onSubmitRegister = async e => {
    e.preventDefault();
    const { history } = this.props;
    let obj = {
      email: this.state.email,
      password: this.state.password,
      package: this.state.package
    };
    //let err = this.formsValidation();
    //if (!err) {
      let serverResponse = await apiClient("/users/User.php", "post", obj);
      console.log('serverResponse', serverResponse);
      if (serverResponse.userRegistered === "1") {
        this.props.InsertUserToDB(serverResponse)
       
        history.push("/registersuccess");
      }
      /*else if (serverResponse.userRegistered === "exists") {
        this.setState({ registerSuccess: true });
      }*/
      else{
        switch(serverResponse.error){
          case 0:
              this.setState({ error: 'הסיסמה קטנה מ 6 תווים' });
          break;
          case 1:
              this.setState({ error: 'שדה כתובת מייל ריק' });
          break;
          case 2:
              this.setState({ error: 'כתובת המייל שהוזנה אינה תקינה' });
          break;
          case 3:
              this.setState({ error: 'כתובת המייל קיימת במערכת' });
          break;
        }
      
      }
  //  }
  };

  render() {
    return (
      <Row id="FrontRegisterRow">
        <Col lg={7} md={7} sm={12} xs={12} id="formSectioCont">
          <Row id="formSection">
            <Col lgOffset={4} lg={8} mdOffset={0} md={12} sm={12} xs={12}>
            <Form inline id="frontregister">
     <Row>           <h2 className="bold ">
              רוצים להצטרף אלינו?
              <span>
              הרשמו עכשיו
              </span>
            </h2>
            </Row>
 
            <Row>
            <Col lg={4} md={4} sm={4} xs={4} style={ColPadd}>
            <FormGroup className="" controlId="formHorizontalRegister">
          
                  <FormControl
                    aria-label="דואר אלקטרוני"
                    ref="email"
                    name="email"
                    type="email"
                    onChange={this.onChange}
                    placeholder="הקלד דואר אלקטרוני"
                  />
                
                  </FormGroup>
              </Col>
              <Col lg={4} md={4} sm={4} xs={4} style={ColPadd}>
              <FormGroup className="" controlId="formHorizontalRegister1">
                    <FormControl
                      aria-label="סיסמה"
                      ref="password"
                      name="password"
                      type="password"
                      id="password"
                      onChange={this.onChange}
                      placeholder="הקלד סיסמה"
                    />
                    <button
                      onClick={TogglePass}
                      id="toggleBtn"
                      className="glyphicon glyphicon-eye-open"
                      type="button"
                    >
                      &nbsp;
                    </button>
              </FormGroup>
              </Col>
              <Col lg={4} md={4} sm={4} xs={4} style={ColPadd}>
              <FormGroup className="">
                
                  <Button
                    onClick={this.onSubmitRegister}
                    type="submit"
                    className="full-width-btn submit"
                    style={SCbutton}
                    id="registerSubmit"
                  >
                    הצטרפו אלינו >
                  </Button>
             
            
            </FormGroup>
            </Col>
            </Row>
            <Row>
              <Col>
              {this.state.noEmail && (
                <div className="text-right red-alert">{this.state.noEmail}</div>
              )}
              {this.state.error && (
                <div className="text-right red-alert">{this.state.error}</div>
              )}
      
              {this.state.passwordLengthError && (
                <div className="text-right red-alert">
                  {this.state.passwordLengthError}
                </div>
              )}
      
              {this.state.registerSuccess && (
                <div className="text-right red-alert">{this.state.mailExists}</div>
              )}
              </Col>
      
            </Row>
 
          </Form>
            </Col>
          </Row>
        </Col>
      </Row>
     

      
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer,
  };
};

export default connect(mapStateToProps, { InsertUserToDB })(
  withRouter(FrontRegister)
);

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
