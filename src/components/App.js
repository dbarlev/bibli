import React, { Component } from 'react';
import Header from './header/Header.js';
import SubOptions from './subscription/SubOptions';
import Search from './bib/search/Search';
import Footer from './footer/Footer'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header headline="1ברוכים הבאים לביבלי"/>
        <SubOptions />
        <br />
        <Footer />
      </div>
    );
  }
}

export default App;
