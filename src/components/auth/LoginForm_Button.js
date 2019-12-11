import React, { Component } from 'react'
import {Animated} from "react-animated-css";


export class LoginForm_Button extends Component {
    constructor(){
        super();
        this.state = {
            isLoginButtonVisible: true
        }

        this.toggleLogin = this.toggleLogin.bind(this);
    }
    toggleLogin = () => {
        this.setState({isLoginButtonVisible : !this.state.isLoginButtonVisible});
    }

    render() {
        return (
           
            <button className="btn" onClick={this.toggleLogin}>התחבר</button> 
           
        )
    }
}

export default LoginForm_Button
