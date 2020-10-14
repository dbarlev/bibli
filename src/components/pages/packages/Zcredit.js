import React, { Component } from 'react';
import { apiClient } from '../../../common/apiClient';
import { apiGetClient } from '../../../common/apiClient';
import { getCookie } from '../../Services/GetCookies';
import './Zcredit.scss';

class Zcredit extends Component {
    constructor() {
        super();
        this.state = {
            iframe: 'not valid',
            userid: getCookie("userid")
        }
    }
    componentDidMount() {
        this.onComponentLoad();
    }


    onComponentLoad = async () => {
        console.log('in onComponentLoad', this.state)
        const { iframe, userid } = this.state;

        let serverResponse = await apiClient("/users/Credit.php", "POST", { userid });

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
                {
                    this.state.iframe !== "not valid" &&
                    <iframe frameBorder="0" src={this.state.iframe} />
                }
            </div>
        );
    }
}


export default Zcredit;
