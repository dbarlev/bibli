import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import Header from '../header/Header.js';
import RegisterForm from './RegisterForm.js';
import { addUser } from '../../actions/index';


class Register extends Component {
  constructor(){
    super()
  }

  onSubmitFormChild(obj)
  {
    this.props.addUser(obj);
    
  }

  render(){
    return (
      <div className="App" id="register">
        <Header headline="הרשמה"/>
        <span>חבילה מסוג:
        </span>
        <span>
        {/* {this.props.chooseSubscription.name} */}
        </span>
        <RegisterForm 
          onSubmitForm={(this.onSubmitFormChild.bind(this))}

        />

      </div>

    );
  }
}

const mapStateToProps = (state) => {
  console.log("state", state)
  return {
  chooseSubscription: state.chooseSubscription,
  user: state.userReducer
  }
}

export default connect(mapStateToProps, {addUser})(Register);
