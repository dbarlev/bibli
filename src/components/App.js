import React, { Component } from 'react';
import Footer from './footer/Footer.js';
import Header from './header/Header.js';
import SubOptions from './subscription/SubOptions';
import ApaTabs from './bib/tabs';
import BibRecordsList from './bib/records/BibRecordsList';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header headline="1ברוכים הבאים לביבלי"/>
        <SubOptions />
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

export default App;
