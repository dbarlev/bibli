import React, {Component} from 'react';
import ApaTabControl from '../apaTabControl.js';
import HeaderLogin from '../../header/HeaderLogin.js';
import ListOfBiblist from '../listOfRecords/ListOfBiblist';
import BiblistHeading from './BiblistHeading';
import Footer from '../../footer/Footer.js';

class AddRecord extends Component {

  render() {
    return (
       <div className="App">
        <br />
          <div className="row mainArea main-area">  
              <div className="col-md-7">  
                  <BiblistHeading addRecordBtn="false"/>       
                  <ApaTabControl />
              </div>
          </div>
      </div>
    );
  }
}

export default AddRecord;

