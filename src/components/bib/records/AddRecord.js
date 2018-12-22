import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ApaTabControl from '../apaTabControl.js';
import HeaderLogin from '../../header/HeaderLogin.js';
import ListOfBiblist from '../listOfRecords/ListOfBiblist';


class AddRecord extends Component {

  render() {
    return (
       <div className="App">
        <HeaderLogin />
        <br />
          <div className="row main-area">
              <div className="col-md-2 col-md-offset-2">    
                  <ListOfBiblist />           
              </div>   
              <div className="col-md-5">  
                  <div className="row">
                      <div className="col-md-2">
                          <h3 className="level3">סוג המקור</h3>
                      </div> 
                  </div>         
                  <ApaTabControl />
              </div>
          </div>
      </div>
    );
  }
}

export default AddRecord;

