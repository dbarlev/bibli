import React, { Component } from 'react';

import './Spinner.scss';

class Spinner extends Component {
    render() {
        return <div class="loader" style={this.props.style}></div>;
    }
}


export default Spinner;
