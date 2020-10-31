import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Grid, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Animated } from "react-animated-css";
import { withRouter } from 'react-router-dom';
import { MailVerAction } from '../../actions/authActions';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import LoginForm from './LoginForm/LoginForm';


class MailVerification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showLogin: false
        }
    }

    componentDidMount() {
        this.props.MailVerAction(this.props.match.params.mailVer);
    }

    isVerified = (mailVer) => {

        let ans = '';
        switch (Number(mailVer)) {
            case 0:
                ans = <div><p>לא נרשמת לאתר זה בעבר</p> <Link to="/" className="btn btn-warning"> הרשמו! <i class="fas fa-chevron-left "></i></Link></div>;
                break;

            case 1:
                ans = <div> <p>החשבון אושר בהצלחה</p> <Button onClick={this.displayLogin} className="btn btn-warning"> התחברו <i class="fas fa-chevron-left "></i></Button></div>;
                break;

            case 2:
                ans = <div><p>החשבון אושר בעבר</p><Button onClick={this.displayLogin} className="btn btn-warning"> התחברו <i class="fas fa-chevron-left "></i></Button></div>;
                break;

            default:
                ans = <div></div>;
                break;
        }
        return ans;
    }

    displayLogin = () => {
        this.props.history.push("/login")
    }

    render() {
        return (
            <Grid fluid className="jumbotron-main">
                <Row>
                    <Header headline="אישור רישום" />

                    <Grid style={footer}>
                        {this.isVerified(this.props.user.mailver)}
                    </Grid>
                    <Footer bottom />
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
    return {
        chooseSubscription: state.chooseSubscription,
        user: state.userReducer,
        mailVer: state.mailver
    }
}

export default connect(mapStateToProps, { MailVerAction })(withRouter(MailVerification));
