import React, { Component } from 'react';

import Header from './header/Header.js';
import SubOptions from './subscription/SubOptions';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header headline="1ברוכים הבאים לביבלי"/>
        <SubOptions />
      </div>
    );
  }
}

export default App;
