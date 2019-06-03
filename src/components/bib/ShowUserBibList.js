import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderLogin from '../header/HeaderLogin.js';
import BibList from './records/BibList';
import ListOfBiblist from './listOfRecords/ListOfBiblist';
import { userLogedIn } from '../../actions';
import Footer from '../footer/Footer.js';
import { getCookie } from '../Services/GetCookies';
import '../App.css';

class ShowUserBibList extends Component {

  constructor()
  {
     super();
     this.state = {
       biblistID: -1,
       userid: getCookie("userid"),
       auth: getCookie("auth"),
       username: getCookie("username")
     } 
  }

  componentWillMount(){
    let userid = this.state.userid;
    let auth = this.state.auth;

   
    if(auth){
      const json = {
        userid,
        auth
      }
      this.props.userLogedIn(json); 
    }else{
      // debugger;
      this.props.history.push('/');
    }
  }


  render() {
    return (
      <div className="App">

        <HeaderLogin />
        <br />
       
          <div className="mainArea userBiblist">
            <div className="row">
              <div className="col-md-2 col-md-offset-2">    
                    <ListOfBiblist userid={Number(this.state.userid)}/>  
                          
                </div>
                <div className="col-md-7">               
                    <BibList userid={Number(this.state.userid)}/>
                </div>   
            </div>
          </div>
          <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
      userLogedIn: (params) => dispatch(userLogedIn(params))
  };
};


const mapStateToProps = state => {
  return{
      userid: state.authReducer.userid,
      auth: state.authReducer.auth
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowUserBibList);

