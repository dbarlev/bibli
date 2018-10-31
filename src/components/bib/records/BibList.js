import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {getRecordsFromDB} from '../../../actions/ajax';
import Writers from '../writers/Writers';
import BibListItem from './BibListItem'
import { LinkContainer } from "react-router-bootstrap";


import listImg from '../../img/list.png';

class BibList extends Component {

  constructor()
  {
    super();
    this.state = {
        records: [],
        allRecords: [],
        deleteID: []
    }
  }

  componentWillMount() 
  {
      this.props.getRecordsFromDB(19);
  }

  componentWillReceiveProps(nextProps) {
    
      let records = this.state.allRecords;
      let recordsToDelete = this.state.deleteID;

      records.push(nextProps.allRecords);
      recordsToDelete.push(nextProps.deleteID);

      this.setState({
        allRecords: records,
        deleteID: recordsToDelete
      })
  }

  renderRecords()
  {
    const {deleteID} = this.state;
    let allRecords = this.state.allRecords;
    if(allRecords.length > 0)
    {
      return (
          allRecords[allRecords.length-1].map( (record,index) => {
            if(record.recordID == undefined || deleteID.indexOf(record.recordID) == -1)
              return <BibListItem record={record} type={record.type} recordID={record.recordID} key={"bib_record" + index} />
        })
      );
    }
    else
    {
      return (
          <div>
            <img alt="" src={listImg} />
            <h2>היי, אין לך עדיין רשימות...</h2>
            <br />
            <LinkContainer className="topNavMenuItems white" to="/addRecord" >
                <button className="btn btn-primary">ליצירת רשימה חדשה</button>
            </LinkContainer> 
          </div>
      ) 
    }

  }

  renderAddRecordBtn()
  {
    let allRecords = this.state.allRecords;
    if(allRecords.length > 0)
    {
      return (
        <LinkContainer to="/addRecord" >
                <button className="btn pull-right" id="addRecordBtn"><i className="fas fa-plus"></i> הוספת פריט </button>
        </LinkContainer>        
      )
    }
  }

  render() {
    return (
      <div id="bibRecords"> 
        <div className="row">
          {
            this.renderAddRecordBtn()
          }
        </div>
        {
        this.renderRecords()  
        }       
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        allRecords: state.getRecordsFromDB,
        deleteID: state.deleteRecordFromUser.value
    }
}

export default connect(mapStateToProps, {getRecordsFromDB})(BibList);

