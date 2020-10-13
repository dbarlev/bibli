import React, { Component } from 'react';
import { apiClient } from '../../../common/apiClient';
import { apiGetClient } from '../../../common/apiClient';
import { getCookie } from '../../Services/GetCookies';
import './Zcredit.scss';

class Zcredit extends Component {
    constructor(){
        super();
        this.state ={
            iframe: 'not valid',
            userid: getCookie("userid")
        }
    }
    componentDidMount(){
            this.onComponentLoad();
        }
                

        onComponentLoad = async () => {
            console.log('in onComponentLoad', this.state)
            const { iframe, userid } = this.state;
           
           let serverResponse = await apiGetClient("/users/Credit.php","get", userid);
           
           if (serverResponse) {
            this.setState({ iframe: serverResponse });
               console.log('serverResponse', serverResponse);
           }
           else {
               console.log('error2', serverResponse.error);
           }
           
        }

    render() {
        console.log('zcredit', this.state.sentData)
     
        return (

            <div id="zcredit">
dav
                <iframe frameBorder="0" src={this.state.iframe} />
            </div>
        );
    }
}

export default Zcredit;
