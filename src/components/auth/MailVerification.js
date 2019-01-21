import React, { Component } from 'react'
import {connect} from 'react-redux';
import {MailVerAction} from '../../actions/ajax';

class MailVerification extends Component {
    constructor(props){
        super(props);
        console.log('props ', props);
    }

    // MailVerAction(data){
    //     this.props.MailVerAction(data)
    //     {console.log('all MailVerAction props ', data)}
    // }

    componentDidMount() {
        this.props.MailVerAction(this.props.match.params.mailVer);
        // {console.log('all MailVerAction props ', this.props.match.params.mailVer)}
    }

    render() {
        return (
        <div>
            <h1>Mial Verfication</h1>
            {(this.props.user.mailVer == 1 ? 'sucssess' : 'already registered' )}
        
            
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
