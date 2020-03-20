import React, { Component } from 'react';
import ApaTabControl from '../apaTabControl.js';
import BiblistHeading from './BiblistHeading';

class AddRecord extends Component {

  render() {
    return (
      <div className="App">
        <br />
        <div className="row mainArea main-area">
          <div>
            <BiblistHeading addRecordBtn="false" />
            <ApaTabControl />
          </div>
        </div>
      </div>
    );
  }
}

export default AddRecord;

