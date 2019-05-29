import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getRecordsFromDB} from '../../../actions/ajax';
import BibListItem from './BibListItem';
import BiblistHeading from './BiblistHeading';

import { LinkContainer } from "react-router-bootstrap";

import listImg from '../../img/list.png';
import { userLogedIn } from '../../../actions'; 

class BibList extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
        records: [],
        allRecords: [],
        deleteID: [],
        getBiblistFromDB: [],
        bibListName: "",
        id: null,
        activeBiblist: {}
    }
  }

  componentDidMount() 
  {
    console.log('userLogedIn', this.props.userid);
    this.props.getRecordsFromDB(this.props.userid, 0);
  }

  componentWillReceiveProps(nextProps) {
      
      let records = this.state.allRecords;
      let recordsToDelete = this.state.deleteID;
      let bibListName = this.state.bibListName;
      let getBiblistFromDB = nextProps.getBiblistFromDB;

      if(getBiblistFromDB.length > 0)
      {
        bibListName = nextProps.getBiblistFromDB[0].bibListName;
      }

      
      records.push(nextProps.allRecords);
      recordsToDelete.push(nextProps.deleteID);

      this.setState({
        allRecords: records,
        deleteID: recordsToDelete,
        getBiblistFromDB: getBiblistFromDB,
        bibListName: bibListName,
        activeBiblist: nextProps.activeBiblist
      })
  }

  renderRecords()
  {
    const {deleteID, getBiblistFromDB, bibListName} = this.state;
    
    if(getBiblistFromDB.length > 0)
    {
          return (
            getBiblistFromDB.map( (record,index) => {
              if(record.bibListName == bibListName &&
                   (record.recordID == undefined || deleteID.indexOf(record.recordID) == -1))
                return <BibListItem record={record} type={record.type} recordID={record.recordID} key={"bib_record" + index} />
            })
          );
    }
    else
    {
      return (
          <div>
            <img alt="" src={listImg} />
            <h2>היי, אין לך עדיין רשומות...</h2>
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

  renderBibListName()
  {
    let bibListName = this.state.activeBiblist && this.state.activeBiblist.Name;
    if(bibListName && bibListName.length > 0)
    {
      return (
        <BiblistHeading bibListName={bibListName} />     
      )
    }
  }

  render() {
    return (
      <div id="bibRecords"> 
        {
          this.renderBibListName()
        }
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
        deleteID: state.deleteRecordFromUser.value,
        getBiblistFromDB: state.getBiblistFromDB,
        activeBiblist: state.activeBiblist,
        userid: state.authReducer.userid
    }
}

export default connect(mapStateToProps, {getRecordsFromDB})(BibList);

