import React, {Component} from 'react';
import ApaTabControl from '../apaTabControl.js';
import HeaderLogin from '../../header/HeaderLogin.js';
import ListOfBiblist from '../listOfRecords/ListOfBiblist';
import BiblistHeading from './BiblistHeading';
import Footer from '../../footer/Footer.js';
import {connect} from 'react-redux';
import {getSingleRecord} from '../../../actions/ajax';

class EditRecord extends Component {

  componentWillMount(){
    this.props.getSingleRecord(this.props.match.params.id); 
  }  

  showLoading(){
    
  }

  render() {
    return (
       <div className="editRecord">
        <br />
          <div className="row mainArea main-area">  
              <div className="col-md-7">  
                  <BiblistHeading addRecordBtn="false"/>       
                  <ApaTabControl editRecord="true"/>
              </div>
          </div>
      </div>
    );
  }
}

export default connect(null, {getSingleRecord})(EditRecord);

