import React, { Component } from 'react'
import { Redirect  } from 'react-router-dom';
import { MenuItem} from 'react-bootstrap';
import { connect } from 'react-redux';
import { userLogedIn } from '../../actions';


function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}



export class LogOut extends Component {
    logOut = () => {
        eraseCookie('auth')
        eraseCookie('userid')
        eraseCookie('username')

       
        return <Redirect to='/' />
    }


    render() {

       
        return (
           
            <MenuItem onClick={this.logOut}> התנתקי</MenuItem>
            
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userLogedIn: (params) => dispatch(userLogedIn(params))
    };
};


export default connect(null, mapDispatchToProps)(LogOut);
