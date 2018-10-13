import React, { Component } from 'react';
import Footer from './footer/Footer.js';
import HeaderLogin from './header/HeaderLogin.js';
import BibRecordsList from './bib/records/BibRecordsList';
import ListsContainer from './bib/listOfRecords/ListsContainer';



import './App.css';


class adminPanel extends Component {
  render() {
    return (
      <div className="App">
        <HeaderLogin />
        <br />
          <div className="row">
              <div className="col-md-5 col-md-offset-3">               
                  <BibRecordsList />
              </div>
              <div className="col-md-2">    
                  <ListsContainer />           
              </div>
          </div>
      </div>
    );
  }
}



export default adminPanel;
