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
import { Animated } from "react-animated-css";
import { setCookie } from "../Services/LoginServerValidation";
import { InsertUserToStore, SelectedPackage } from "../../../actions";
import { apiClient } from '../../../common/apiClient';
import { TogglePass } from '../../../common/Util.js';
import './FrontRegister.scss';
import { PackagesModal } from "../../pages/packages/PackagesModal";


const ColPadd = {
  padding: "5px"
};

class FrontRegister extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      package: 1,
      registerSuccess: false,
      error: '',
      showPacakgesModal: false
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });

    this.setState({
      noEmail: '',
      passwordLengthError: '',
      registerSuccess: false,
      error: ''
    })
  };

  onSubmitRegister = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    if (email.trim() === "" || password.trim() === "") {
      this.setState({ error: 'חובה למלא אימייל וסיסמה' });
      return;
    }

    let obj = {
      email,
      password,
      package: 0
    };

    let serverResponse = await apiClient("/users/User.php", "post", obj);
    if (serverResponse.userRegistered === "1") {
      this.props.InsertUserToStore(serverResponse);
      this.setState({ showPacakgesModal: true });
    }
    else {
      this.handleErrors(serverResponse);
    }
  };

  handleErrors = (serverResponse) => {
    let error = null;
    switch (serverResponse.error) {
      case 0:
        error = 'הסיסמה קטנה מ 6 תווים';
        break;
      case 1:
        error = 'שדה כתובת מייל ריק';
        break;
      case 2:
        error = 'כתובת המייל שהוזנה אינה תקינה';
        break;
      case 3:
        error = 'כתובת המייל קיימת במערכת';
        break;
      default:
        break;
    }

    this.setState({ error });
  }

  onPackageChoosen = async (packageData) => {
    const { history, SelectedPackage, user } = this.props;

    if (packageData && packageData.name !== "free") {
      SelectedPackage(packageData);
      history.push("/checkout");
      return;
    }

    setCookie(true, user.userid);
    history.push("/records/biblist");
    this.setState({ showPacakgesModal: false });
  }

  render() {
    return (
      <Row id="FrontRegisterRow">
        <Col lg={7} md={7} sm={12} xs={12} id="formSectioCont">
          <Row id="formSection">
            <Col lgOffset={4} lg={8} mdOffset={0} md={12} sm={12} xs={12}>
              <Form inline id="frontregister" onSubmit={this.onSubmitRegister.bind(this)}>
                <Row>           <h2 className="bold ">
                  רוצים להצטרף אלינו?
                    <span>
                    הרשמו עכשיו
                    </span>
                </h2>
                </Row>
                <Row>
                  <Col>

                    {this.state.error && (
                      <Animated animationIn="zoomIn" animationOut="zoomOut" isVisible={this.state.error} >

                        <div role="alert" className="text-right red-alert">{this.state.error}</div>
                      </Animated>
                    )}
                  </Col>

                </Row>
                <Row>
                  <Col lg={4} md={4} sm={4} xs={12} style={ColPadd}>
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
                  <Col lg={4} md={4} sm={4} xs={12} style={ColPadd}>
                    <FormGroup controlId="formHorizontalRegister1">
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
                        aria-label="הצג סיסמה"
                        id="toggleBtn"
                        className="glyphicon glyphicon-eye-open"
                        type="button"
                      >
                        &nbsp;
                    </button>
                    </FormGroup>
                  </Col>
                  <Col lg={4} md={4} sm={4} xs={12} style={ColPadd}>
                    <FormGroup>
                      <Button
                        type="submit"
                        className="full-width-btn submit"
                        id="registerSubmit"
                      >
                        הצטרפו אלינו >
                      </Button>


                    </FormGroup>
                  </Col>
                </Row>


              </Form>
            </Col>
          </Row>
        </Col>
        {this.state.showPacakgesModal &&
          <PackagesModal
            onClose={() => this.setState({ showPacakgesModal: false })}
            onPackageChoosen={async (packageData) => await this.onPackageChoosen(packageData)}
          />
        }
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer,
  };
};

export default connect(mapStateToProps, { InsertUserToStore, SelectedPackage })(
  withRouter(FrontRegister)
);


