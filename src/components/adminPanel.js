import React, { Component } from 'react';
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
             <div className="col-md-2 col-md-pull-1">    
                  <ListsContainer />           
              </div>
              <div className="col-md-6 col-md-pull-2">               
                  <BibRecordsList />
              </div>   
          </div>
      </div>
    );
  }
}



export default adminPanel;
