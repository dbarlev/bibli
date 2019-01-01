import React, { Component } from 'react'
import {connect} from 'react-redux';
import {MailVerAction} from '../../actions/ajax';


class MailVerification extends Component {
    constructor(props){
        super(props);
console.log(props);
        this.state = {
            MailVer: props.match.params.mailVer
        };        

        this.props.MailVerAction(this.state.MailVer)
    }

    render() {
        return (
        <div>
            {console.log(this.state.MailVer)}
            MailVerification
        </div>
        )
    }
}


// export default MailVerification

// const mapStateToProps = (state) => {
//     // console.log("state", state)
//     return {
//     chooseSubscription: state.chooseSubscription,
//     user: state.userReducer
//     }
//   }
  
  export default connect(null, { MailVerAction })(MailVerification);
  