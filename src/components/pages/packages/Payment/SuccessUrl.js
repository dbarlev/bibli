import React, { Component } from 'react';


class Zcredit extends Component {
    constructor() {
        super();
        this.state = {

        }
    }


    componentDidMount() {
        window.parent.location.href = "http://stage.bibli.co.il";
    }


    render() {
        return (
            <div id="zcredit">
                Success!!!
            </div>
        );
    }
}

export default Zcredit;
