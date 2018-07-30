import React, { Component } from 'react';

import Footer from './footer/Footer.js';
import Header from './header/Header.js';
import SubOptions from './subscription/SubOptions';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header headline="1ברוכים הבאים לביבלי"/>
        <SubOptions />
        <Footer />
      </div>
    );
  }
}

export default App;
