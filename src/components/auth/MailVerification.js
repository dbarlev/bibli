import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Grid, Row} from 'react-bootstrap'; 
import {Link} from 'react-router-dom'; 

import {MailVerAction} from '../../actions/ajax';
import Header from '../header/Header';
import Footer from '../footer/Footer';

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

    isVerified = (mailVer) => {

        let ans = '';
        switch(Number(mailVer)){
            case 0:
            ans = <div><p>לא נרשמת לאתר זה בעבר</p> <Link to="/register" className="btn btn-warning"> הרשמו! <i class="fas fa-chevron-left "></i></Link></div>;
            break;

            case 1:
            ans = <div> <p>החשבון אושר בהצלחה</p> <Link to="/login" className="btn btn-warning"> התחברו! <i class="fas fa-chevron-left "></i></Link></div>;
            break;

            case 2:
            ans =<div><p>החשבון אושר בעבר</p><Link to="/login" className="btn btn-warning"> התחברו <i class="fas fa-chevron-left "></i></Link></div>;
             break;

            default:
            ans = <div></div>;
            break;
        }
        return ans;
    }
    render() {
        return (
        <Grid fluid className="jumbotron-main">
            <Row>
            <Header headline="אישור רישום"/>
            <Grid style={footer}>
               { this.isVerified(this.props.user.mailver)}
            </Grid>
            <Footer />
            </Row>
        </Grid>
        )
    }
}

const footer = {
    minHeight: "60vh",
    bottom: 0
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
