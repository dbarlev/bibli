import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ApaTabControl from './apaTabControl.js';
import HeaderLogin from '../header/HeaderLogin.js';
import ListsContainer from './listOfRecords/ListsContainer';


class addRecord extends Component {

  render() {
    return (
       <div className="App">
        <HeaderLogin />
        <br />
          <div className="row main-area">
              <div className="col-md-2 col-md-offset-1">    
                  <ListsContainer showEmpty={true} />           
              </div>   
              <div className="col-md-5">  
                  <div className="row">
                      <div className="col-md-3">
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

export default addRecord;

