import React, { Component } from 'react';
import HeaderLogin from '../header/HeaderLogin.js';
import BibList from './records/BibList';
import ListOfBiblist from './listOfRecords/ListOfBiblist';
import Footer from '../footer/Footer.js';

import '../App.css';


class ShowUserBibList extends Component {

  constructor()
  {
     super();
     this.state = {
       biblistID: -1
     } 
  }


  render() {
    return (
      <div className="App">
        <HeaderLogin />
        <br />
          <div className="row">
             <div className="col-md-2 col-md-offset-2">    
                  <ListOfBiblist />           
              </div>
              <div className="col-md-6">               
                  <BibList />
              </div>   
          </div>
      </div>
    );
  }
}



export default ShowUserBibList;
