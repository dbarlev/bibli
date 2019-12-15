import React, { Component } from 'react';
import ApaTabControl from '../apaTabControl.js';
import BiblistHeading from './BiblistHeading';

class AddRecord extends Component {

  render() {
    return (
      <div className="App">
        <br />
        <div className="row mainArea main-area">
          <div className="col-md-7 col-xs-11">
            <BiblistHeading addRecordBtn="false" />
            <ApaTabControl />
          </div>
        </div>
      </div>
    );
  }
}

export default AddRecord;

