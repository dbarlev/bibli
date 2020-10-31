import React, { Component } from 'react';
import { connect } from 'react-redux';

import { apiClient } from '../../../../common/apiClient';
import { userLogedIn } from '../../../../actions';
import { getCookie } from '../../../Services/GetCookies';
import './Zcredit.scss';

class Zcredit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      iframe: 'not valid',
      //email: 'davseveloff@gmail.com',
      price: '80',
      userid: getCookie("userid"),
      auth: getCookie("auth"),
      username: getCookie("username")
    }
  }
  componentDidMount() {

    this.onComponentLoad();
  }

  componentWillMount() {
    let userid = this.state.userid;
    let auth = this.state.auth;
    let username = this.state.username;

    if (auth) {
      const json = {
        userid,
        auth,
        username
      }
      this.props.userLogedIn(json);
    }
  }

  onComponentLoad = async () => {
    const { iframe, userid } = this.state;

    let serverResponse = await apiClient("/users/Credit.php", "POST", this.state);

    if (serverResponse) {
      this.setState({ iframe: serverResponse });
    }
    else {
      console.log('error2', serverResponse.error);
    }
  }

  render() {
    return (

      <div id="zcredit">
        {console.log('props', this.props)}
        {
          this.state.iframe !== "not valid" &&
          <iframe frameBorder="0" src={this.state.iframe} />
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  }
}

export default connect(mapStateToProps, {userLogedIn})(Zcredit);