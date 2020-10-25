import React, { Component } from 'react';
import { connect } from 'react-redux';
import { apiClient } from '../../../common/apiClient';
import './Zcredit.scss';

class Zcredit extends Component {
    constructor(props) {
        super();
        
        this.state = {
            iframe: 'not valid',
            //email: 'davseveloff@gmail.com',
            price: '80',
        }
    }
    componentDidMount() {
        this.onComponentLoad();
    }


    onComponentLoad = async () => {
        console.log('in onComponentLoad', this.state)
        console.log('in props', this.props)
        const { iframe, userid } = this.state;

        let serverResponse = await apiClient("/users/Credit.php", "POST", this.state);

        if (serverResponse) {
            this.setState({ iframe: serverResponse });
            console.log('serverResponse', serverResponse);
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


const mapStateToProps = (state) => {
    return {
        user: state.userReducer
    }
}

export default connect(mapStateToProps)(Zcredit);
