import React, { Component } from 'react'
import {connect} from 'react-redux';
import {MailVerAction} from '../../actions/ajax';




class MailVerification extends Component {
    constructor(props){
        super(props);
console.log(props);
        // this.props.MailVerAction(this.state.MailVer)
    }

    MailVerAction(){
        this.props.MailVerAction(this.props.match.params.mailVer)
        {console.log(this.props.MailVerAction)}
    }


    render() {
        return (
        <div onLoad={() => this.MailVerAction()}>
           
            MailVerification
        </div>
        )
    }
}


// export default MailVerification

const mapStateToProps = (state) => {
    // console.log("state", state)
    return {
    chooseSubscription: state.chooseSubscription,
    user: state.userReducer,
    mailVer: state.mailver
    }
  }
  
  export default connect(mapStateToProps, { MailVerAction })(MailVerification);
  