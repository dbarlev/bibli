import React, { Component } from "react";
import { connect } from "react-redux";
import { activeBiblist } from "../../../actions/index";
import BibListItem from "./BibListItem";
import BiblistHeading from "./BiblistHeading";
import { withRouter } from "react-router-dom";
import { He } from './texts';

class BibList extends Component {

  renderRecords() {
    const {
      getBiblistFromDB,
      getBiblistNamesFromDB,
      activeBiblistData
    } = this.props;

    if (activeBiblistData.id) {
      // there is an active list choosen
      return getBiblistFromDB.map((record, index) => {
        if (record.BiblistID == activeBiblistData.id)
          return (
            <BibListItem
              record={record}
              type={record.type}
              recordID={record.recordID}
              key={"bib_record" + index}
            />
          );
      });
    } 
    else if (!activeBiblistData.id && getBiblistNamesFromDB.length > 0) {
      // default situation, show first list result
      let DefaultListId = getBiblistNamesFromDB[0];
      this.props.activeBiblist(DefaultListId);
      return getBiblistFromDB.map((record, index) => {
        if (record.BiblistID == DefaultListId.id)
          return (
            <BibListItem
              record={record}
              type={record.type}
              recordID={record.recordID}
              key={"bib_record" + index}
            />
          );
      });
    }
  }

  render() {
    return (
      <div id="bibRecords">
        <BiblistHeading bibListName={this.props.activeBiblistData.Name} />
        <div className="row"></div>
        {this.renderRecords()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allRecords: state.getRecordsFromDB,
    deleteID: state.deleteRecordFromUser.value,
    getBiblistFromDB: state.getBiblistFromDB,
    activeBiblistData: state.activeBiblist,
    userid: state.authReducer.userid,
    getBiblistNamesFromDB: state.getBiblistNamesFromDB,
    getEditRecord: state.getEditRecord
  };
};

export default connect(mapStateToProps, { activeBiblist})(
  withRouter(BibList)
);
