import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {getRecordsFromDB} from '../../../actions/ajax';
import Writers from '../writers/Writers';
import BibRecord from './BibRecord'

class BibRecordsList extends Component {

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
              return <BibRecord record={record} type={record.type} recordID={record.recordID} key={"bib_record" + index} />
        })
      );
    }
    else
    {
      return <div />
    }

  }

  render() {
    return (
      <div id="bibRecords">
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

export default connect(mapStateToProps, {getRecordsFromDB})(BibRecordsList);

