import React, { Component } from 'react';
import Footer from './footer/Footer.js';
import Header from './header/Header.js';
import SubOptions from './subscription/SubOptions';
import ApaTabs from './bib/tabs';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header headline="1ברוכים הבאים לביבלי"/>
        <SubOptions />
        <ApaTabs />
      </div>
    );
  }
}

export default App;
