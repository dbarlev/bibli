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
import { connect } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { GetUserData, EditUserData } from "../../actions/ajax";
import Footer from "../footer/Footer";
import HeaderLogin from '../header/HeaderLogin.js';
import profileImage from '../img/profileImage'
import { getCookie } from "../Services/GetCookies";
import StickyContact from "../sticky/stickyContact/StickyContact";
import "./UserData.scss";
class UserData extends Component {
  constructor(){
      super();

    this.state = {
    fname: "",
    lname: "",
    email: "",
    mosadOptions: [],
    maslul: "",
    page: "userdata", //used in user.php file to destinct the function
    userid: getCookie("userid"),
    auth: getCookie("auth"),
    username: getCookie("username"),
  };

  this.onChange = this.onChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);


}


  componentWillMount() {
    let userid = this.state.userid;
    let auth = this.state.auth;
    let username = this.state.username;
  
      this.props.GetUserData(userid);

    
    

     
  }

  clientValidate() {
    return true;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.EditUserData(this.state);
  };


  // changeImageOnClick(e) {
  //   this.refs.fileUploader.click();
  // }

  onChange(event) {
 
      console.log('event', event);
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSelectChange = (event) => {
    console.log('event onSelectChange', event);
    const value = event.target.value;
    
  }
  
  render() {
    return (
      <Grid fluid id="userdata">
        {console.log("props", this.props.email)}
        <HeaderLogin />

        <main id="userdata-main">
          <Row className="col-md-12 col-lg-10">
            <Col md={3} mdOffset={2} className="well">
              <div className="card-body">
                <div className="text-center">
               
                  <img
                    src={profileImage}
                    alt="userprofile"
                    className="round-circle"
                    width="150"
                  />
        
                  <h4 className="card-title m-t-10">{this.state.lname} {this.state.fname}</h4>
                  <div className="row text-center justify-content-md-center">
                    <Col md={6}>
                      <a href="javascript:void(0)" className="link">
                        <i className="icon-people">רשימות</i>{" "}
                        <font className="font-medium">{this.props.numOfLists}</font>
                      </a>
                    </Col>
                    <Col md={6}>
                      <a href="javascript:void(0)" className="link">
                        <i className="icon-picture">פריטים</i>{" "}
                        <font className="font-medium">{this.props.numOfBibs}</font>
                      </a>
                    </Col>
                  </div>
                </div>
              </div>
              <hr />
              <div className="card-body">

                <h6>דואר אלקטרוני </h6>
                <h4>{this.props.email}</h4>

                {this.props.mosad &&
                  <div>
                  <h6>מוסד לימודי </h6>
                  <h4>{this.props.mosad}</h4>
                  </div>
                }

                {this.props.maslul &&
                  <div>
                  <h6>מסלול לימודי </h6>
                  <h4>{this.props.maslul}</h4>
                  </div>
                }
               
              </div>
            </Col>
            <Col md={6} mdOffset={0}>
            <h1>פרטים אישיים</h1>
              <Form id="userdataform">
                <FormGroup controlId="formHorizontalusername">
                  <Row>
                    <Col sm={6}>
                      <label htmlFor="">שם פרטי</label>
                      <FormControl
                        ref="fname"
                        name="fname"
                        type="text"
                        value={this.props.fname}
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
                        placeholder={this.props.lname}
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
                        value={this.props.email}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12}>
                      <label htmlFor="">מוסד לימודים</label>
                      <Typeahead
                        ref="mosad"
                        name="mosad"
                        id="mosad"
                        type="text"
                       
                        onChange={(mosad) => {
                          this.setState({mosad});
                        }}
                        placeholder={this.props.mosad}
                        aria-label="בחר מרשימה"
                        options={['אחוה',
                        'ספיר',
                        'אשקלון',
                        'תל אביב']}
                        selected={this.state.mosad}
                      />
                    </Col>
                  </Row>
                  <Row>
 
                    <Col sm={12}>
                      <label htmlFor="">מסלול לימודים</label>
                      <Typeahead
                      ref="maslul"
                      id="maslul"
                      name="maslul"
                      type="text"
         
                      onChange={(maslul) => {
                        this.setState({maslul});
                      }}
                      placeholder={this.props.maslul}
                      aria-label="בחר מרשימה"
                      options={[
                        'ספרות כללית והשוואתית',
                        'ספרות עברית',
                       ' עבודה סוציאלית',
                        'פילוסופיה',
                        'פיסיקה',
                        'פסיכולוגיה',
                        'צירוף פסיכולוגיה ומדעי החיים',
                        'קוגניציה',
                        'קרימינולוגיה',
                        'רוקחות',
                        'רוקחות - תכנית מצוינות, מסלול מואץ לתואר שלישי',
                        'רוקחות : תכנית הסבה לאקדמאים -לימודי בוקר',
                        'רוקחות: תכנית הסבה לאקדמאיים- לימודי ערב',
                        'ריפוי בעיסוק',
                        'רפואה' ]}
                        selected={this.state.maslul}
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
        <Footer  />
      </Grid>
    );
  }
}

const mapStateToProps = state => {
     return{
      fname: state.userReducer.fname,
      lname: state.userReducer.lname,
      email: state.userReducer.email,
      maslul: state.userReducer.maslul,
      mosad: state.userReducer.mosad,
      numOfBibs: state.userReducer.numOfBibs,
      numOfLists: state.userReducer.numOfLists,
   }
}

const mapDispatchToProps = dispatch => {
  return {
    EditUserData: (params) => dispatch(EditUserData(params))
  }
}

export default connect(mapStateToProps, {EditUserData, GetUserData})(UserData);