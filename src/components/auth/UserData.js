import React, { Component } from "react";
import {
  Grid,
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import UserMenu from "../header/UserMenu";
import { getCookie } from "../Services/GetCookies";
import StickyContact from "../sticky/stickyContact/StickyContact";
import "./UserData.scss";
class UserData extends Component {
  constructor(){
      super();
    this.state = {
    fname: "",
    userid: getCookie("userid"),
    auth: getCookie("auth"),
    username: getCookie("username"),
  };
  this.onChange = this.onChange.bind(this);
}

  componentWillMount() {
    let userid = this.state.userid;
    let auth = this.state.auth;
    let username = this.state.username;

    if (auth) {
      const json = {
        userid,
        auth,
        username,
      };
      //this.props.userLogedIn(json);
    }
  }

  onChange(event) {
      console.log('event', event);
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <Grid fluid id="userdata">
        {console.log("state", this.state)}
        <Header />
        <div className="row user-menu">
          <div className="col-md-12 col-lg-12">
            <UserMenu loginState={this.state.auth} />
          </div>
        </div>
        <main id="userdata-main">
          <Row className="col-md-12 col-lg-10">
            <Col md={3} mdOffset={2} className="well">
              <div className="card-body">
                <div className="text-center">
               
                  <img
                    src="https://www.wrappixel.com/demos/free-admin-templates/xtreme-admin-lite/assets/images/users/5.jpg"
                    className="round-circle"
                    width="150"
                  />
                  <h4 className="card-title m-t-10">אבי ביטר</h4>
                  <h6 className="card-subtitle">סטודנט במכללה</h6>
                  <div className="row text-center justify-content-md-center">
                    <Col md={6}>
                      <a href="javascript:void(0)" className="link">
                        <i className="icon-people">רשימות</i>{" "}
                        <font className="font-medium">254</font>
                      </a>
                    </Col>
                    <Col md={6}>
                      <a href="javascript:void(0)" className="link">
                        <i className="icon-picture">פריטים</i>{" "}
                        <font className="font-medium">54</font>
                      </a>
                    </Col>
                  </div>
                </div>
              </div>
              <hr />
              <div className="card-body">
                <h6>דואר אלקטרוני </h6>
                <h4>hannagover@gmail.com</h4>
                <h6>מוסד לימודי </h6>
                <h4>המכללה האקדמית אחוה</h4>
                <h6>מסלול לימודים </h6>
                <h4>חינוך לגיל הרך</h4>
              </div>
            </Col>
            <Col md={6} mdOffset={0}>
              <Form id="userdataform">
                <FormGroup controlId="formHorizontalusername">
                  <Row>
                    <Col sm={6}>
                      <label htmlFor="">שם פרטי</label>
                      <FormControl
                        ref="fname"
                        name="fname"
                        type="text"
                        onChange={this.onChange}
                        placeholder="שם פרטי"
                        aria-label="שם פרטי"
                      />
                    </Col>
                    <Col sm={6}>
                      <label htmlFor="">שם משפחה</label>
                      <FormControl
                      ref="lname"
                      name="lname"
                      type="text"
                        onChange={this.onChange}
                        placeholder="שם משפחה"
                        aria-label="שם משפחה"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12}>
                      <label htmlFor="">דואר אלקטרוני</label>
                      <FormControl
                        ref="email"
                        name="email"
                        type="email"
                        onChange={this.onChange}
                        placeholder="דואר אלקטרוני"
                        aria-label="דואר אלקטרוני"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12}>
                      <label htmlFor="">מוסד לימודים</label>
                      <FormControl
                        ref="mosad"
                        name="mosad"
                        type="text"
                        onChange={this.onChange}
                        placeholder="בחר מרשימה"
                        aria-label="בחר מרשימה"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12}>
                      <label htmlFor="">מסלול לימודים</label>
                      <FormControl
                        ref="toar"
                        name="toar"
                        type="text"
                        onChange={this.onChange}
                        placeholder="מסלול לימודים"
                        aria-label="מסלול לימודים"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12}>
                  <Button
                    onClick={this.handleSubmit}
                    type="submit"
                    className="btn"
                    id="loginSubmit"
                  >
                    עדכן מידע
                  </Button>
                  </Col>
                  </Row>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </main>
        <StickyContact />
        <Footer bottom />
      </Grid>
    );
  }
}

export default UserData;
