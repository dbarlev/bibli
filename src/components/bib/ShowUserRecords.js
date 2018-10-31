import React, { Component } from 'react';
import HeaderLogin from '../header/HeaderLogin.js';
import BibList from './records/BibList';
import ListOfBiblist from './listOfRecords/ListOfBiblist';

import '../App.css';


class ShowUserRecords extends Component {
  render() {
    return (
      <div className="App">
        <HeaderLogin />
        <br />
          <div className="row">
             <div className="col-md-2 col-md-pull-1">    
                  <ListOfBiblist />           
              </div>
              <div className="col-md-6 col-md-pull-2">               
                  <BibList />
              </div>   
          </div>
      </div>
    );
  }
}



export default ShowUserRecords;
