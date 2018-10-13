import React, { Component } from 'react';
import Footer from './footer/Footer.js';
import HeaderLogin from './header/HeaderLogin.js';
import SubOptions from './subscription/SubOptions';
import ApaTabs from './bib/tabs';
import Search from './bib/search/Search';
import BibRecordsList from './bib/records/BibRecordsList';

import './App.css';

class adminPanel extends Component {
  render() {
    return (
      <div className="App">
        <HeaderLogin />
        <br />
          <div className="row">
              <div className="col-md-5">
                  <BibRecordsList />
              </div>
              <div className="col-md-7">
                  <ApaTabs />
              </div>
          </div>
      </div>
    );
  }
}

export default adminPanel;
