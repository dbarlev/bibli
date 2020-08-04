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
import { apiClient } from "../../common/apiClient"
import "./UserData.scss";


const mosadOpts = ['אחוה',
'ספיר',
'אשקלון',
'תל אביב'];


class UserData extends Component {
  constructor(){
      super();

    this.state = {
    fname: "",
    lname: "",
    email: "",
    mosadOptions: [],
    mosad: "",
    maslul: "",
    page: "userdata", //used in user.php file to destinct the function
    userid: getCookie("userid"),
    auth: getCookie("auth"),
    username: getCookie("username"),
  };


  this.onChange = this.onChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);


}


  componentDidMount() {
    const userid = this.state.userid;
    let auth = this.state.auth;
    let username = this.state.username;
    const page = this.state.page;
  
      // this.props.GetUserData(userid);
    this.getUserDataAPI( userid, page);

    }
    
    async getUserDataAPI (userid, page){
      let userDataKey = { userid, page }
      console.log( ' userDataKey value is on userdata.js ', userDataKey);
      let response = await apiClient('/users/User.php', 'get', userDataKey)
      console.log('apiclient response is ', response);

      this.setState({
        fname: response.fname,
        lname: response.lname,
        email: response.email,
        mosad: response.mosad,
        maslul: response.maslul,
        numOfBibs: response.numOfBibs,
        numOfLists: response.numOfLists,

      })

      console.log('new state ', this.state)
    }

     

  clientValidate() {
    return true;
  }


  handleSubmit = (event) => {
    event.preventDefault();
    this.props.EditUserData(this.state);
  };


  onChange(event) {
 
      console.log('event', event);
    this.setState({
      [event.target.name]: event.target.value.toString()
    });
    
  }

  render() {

    return (
      <Grid fluid id="userdata">
        {console.log("props", this.state.email)}
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
                        <font className="font-medium">{this.state.numOfLists}</font>
                      </a>
                    </Col>
                    <Col md={6}>
                      <a href="javascript:void(0)" className="link">
                        <i className="icon-picture">פריטים</i>{" "}
                        <font className="font-medium">{this.state.numOfBibs}</font>
                      </a>
                    </Col>
                  </div>
                </div>
              </div>
              <hr />
              <div className="card-body">

                <h6>דואר אלקטרוני </h6>
                <h4>{this.state.email}</h4>

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
                        value={this.state.fname}
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
                      value={this.state.lname}
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
                        value={this.state.email}
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
                        placeholder={this.state.mosad}
                        aria-label="בחר מרשימה"
                        options={mosadOpts}
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
                      placeholder="בחר מרשימה"
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

export default connect(mapStateToProps, {EditUserData})(UserData);

// export default UserData;