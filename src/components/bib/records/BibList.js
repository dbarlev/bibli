import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getRecordsFromDB} from '../../../actions/ajax';
import {activeBiblist} from '../../../actions/index';
import BibListItem from './BibListItem';
import BiblistHeading from './BiblistHeading';
import { LinkContainer } from "react-router-bootstrap";
import listImg from '../../img/list.png';
import { getCookie } from '../../Services/GetCookies';

class BibList extends Component {


  componentDidMount() 
  {
      let userid = getCookie("userid");
      this.props.getRecordsFromDB(userid, 0);
  }

  renderRecords()
  {
    const {getBiblistFromDB, getBiblistNamesFromDB, getRecordsFromDB, activeBiblist, activeBiblistData} = this.props;
    
    if(activeBiblistData.id) // there is an active list choosen
    {
      return (
                getBiblistFromDB.map( (record,index) => {
                    if(record.BiblistID == activeBiblistData.id)
                      return <BibListItem record={record} type={record.type} recordID={record.recordID} key={"bib_record" + index} />
                })
            );
    }
    else if(!activeBiblistData.id && getBiblistNamesFromDB.length > 0) // default situation, show first list result
    {
      let DefaultListId = getBiblistNamesFromDB[0];
      this.props.activeBiblist(DefaultListId);
      return (
          getBiblistFromDB.map( (record,index) => {
              if(record.BiblistID == DefaultListId.id)
                return <BibListItem record={record} type={record.type} recordID={record.recordID} key={"bib_record" + index} />
          })
      );
    }
    if(!getBiblistNamesFromDB.length) //there is no biblist
    {
      return (
              <div>
                <img alt="" src={listImg} />
                  <h2>היי, אין לך עדיין רשימות...</h2>
                <br />
                <LinkContainer className="topNavMenuItems white" to="/addNewList" >
                    <button className="btn btn-primary">ליצירת רשימה חדשה</button>
                </LinkContainer> 
              </div>
      )
    }
  }

  render() {
    return (
       <div id="bibRecords"> 
          <BiblistHeading bibListName={this.props.activeBiblistData.Name} /> 
          <div className="row">  
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
        activeBiblistData: state.activeBiblist,
        userid: state.authReducer.userid,
        getBiblistNamesFromDB: state.getBiblistNamesFromDB
    }
}

export default connect(mapStateToProps, {getRecordsFromDB, activeBiblist})(BibList);

