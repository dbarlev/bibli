import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import {
  Button,
  Form,
  FormGroup,
  FormControl,
  Col,
  Checkbox,
  ControlLabel,
  HelpBlock
} from 'react-bootstrap';


class ListOfBiblist extends Component {

 constructor()
 {
    super();
    
 }
  
 showList()
 {
    let {allRecords, showEmpty} = this.props;
    if(showEmpty || allRecords.length > 0)
    {
       return(
          <div className="well">
              <ul>
                <li><a to="/">asdasdasdasd</a></li>
              </ul>
          </div>
       )
    }
   

 }

  render() {
    

    return (
        <div id="recordsListContainer">
          {
            this.showList()
          }
           
       </div>
    );
  }
}


const mapStateToProps = (state) => {
    return {
        allRecords: state.getRecordsFromDB,
    }
}

export default connect(mapStateToProps, {})(ListOfBiblist);

