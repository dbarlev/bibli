import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  Col,
  Row
} from "react-bootstrap";
import { Animated } from "react-animated-css";
import { userLogedIn } from "../../../actions";
import { userLogin } from "../../../actions/ajax";
import { withRouter } from 'react-router-dom';
import { LoginServerValidation } from '../LoginPage/LoginServerValidation';
import "./LoginForm.scss";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      username: "",
      password: "",
      errorMsg: "",
      errorState: false,
      isFormVisible: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
  }

  clientValidate() {

    if (this.state.email.trim() === "" || this.state.password.trim() === "") {
      this.setState({
        errorState: true,
        errorMsg: "כל השדות חובה"
      });
      return false;
    }
    return true;
  }

  handleSubmit = async event => {
    event.preventDefault();
    if (this.clientValidate()) {

      let response = await LoginServerValidation(this.state.email, this.state.password);

      if (response && !response.success) {
        this.setState({
          errorMsg: response.data,
          errorState: true
        });
      }
      else if (response) {
        this.props.history.push("/records/biblist");
      }
    }
  };

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }


  toggleLogin = () => {
    this.setState({ isFormVisible: !this.state.isFormVisible });
  }

  render() {
    return (
      <div>

        {this.state.isFormVisible ?
          <Animated animationIn="fadeInDown" animationOut="fadeInUp" isVisible={this.state.isFormVisible} >
            <Form id="toggleLoginForm">
              <FormGroup controlId="formHorizontalusername">
                <Col xs={12} sm={5} style={TopMarginLoginBtn}>
                  <Row style={marginBottomZero}>
                    <FormControl
                      ref="email"
                      name="email"
                      type="email"
                      onChange={this.onChange}
                      placeholder="דואר אלקטרוני"
                      aria-label="דואר אלקטרוני"
                    />
                  </Row>
                </Col>
                <Col xs={12} sm={4} style={TopMarginLoginBtn}>
                  <Row style={marginBottomZero}>
                    <FormControl
                      ref="password"
                      name="password"
                      type="password"
                      onChange={this.onChange}
                      placeholder="הקלד סיסמה"
                      aria-label="סיסמה"
                    />
                  </Row>
                </Col>

                <Col xs={12} sm={3} style={TopMarginLoginBtn}>
                  <Button
                    onClick={this.handleSubmit}
                    type="submit"
                    className="full-width-btn"
                    id="loginSubmit"
                  >
                    התחבר
              </Button>
                </Col>
                <Col xs={8} className="text-right">
                  <Link to="/passwordrecovery">שכחתי את הסיסמה</Link>
                </Col>
                <Col xs={4} className="text-left">
                  <Link to="/#" onClick={this.toggleLogin}>סגור</Link>
                </Col>
              </FormGroup>
              {this.state.errorState &&
                <div className="red-alert" role="alert" bsStyle="danger">
                  {this.state.errorMsg}
                </div>
              }
              <Row className="show-grid"></Row>
            </Form>
          </Animated>
          :

          <button className="btn" id="openLoginForm" onClick={this.toggleLogin} style={ShowLoginButton}>התחבר</button>

        }
      </div>
    );
  }
}
const bold = {
  fontWeight: "bolder"
};

const mapStateToProps = state => {
  return {
    userid: state.authReducer.userid,
    auth: state.authReducer.auth,
    email: state.authReducer.email
  };
};

export default connect(mapStateToProps, { userLogedIn, userLogin })(withRouter(LoginForm));

const TopMarginLoginBtn = {
  padding: "5px"
};

const marginBottomZero = {
  marginBottom: "0px"
};

const ShowLoginButton = {

  top: "36px",
  padding: "5px 35px"
};


