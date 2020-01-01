import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { InsertRecordToDB, EditRecord } from '../../../../actions/ajax';
import { activeBiblist } from '../../../../actions/index';
import { GetFormatDate } from '../../services/GetFormatDate';
import { FormatWriters } from '../../services/FormatWriters';
import ApaForm from '../ApaForm/ApaForm';
import { withRouter } from 'react-router-dom';
import { VerifyLang } from '../../services/VerifyLang';

class ApaWebsite extends Component {

  constructor() {
    super();
    this.state = {
      names: [],
      formFeilds: [
        { id: "url", label: "קישור לכתבה" },
        { id: "title", label: "כותרת הכתבה" },
        { id: "year", label: "תאריך פרסום" }
      ],
      writersHandler: new FormatWriters(),
      formSubmited: false
    }
  }

  componentDidUpdate() {
    let biblistid = this.props.match.params.biblistid
    if (biblistid && this.props.activeBiblistData.length == 0) {
      if (this.props.allBiblist.length > 0) {
        let activeList = this.props.allBiblist.filter((item) => {
          return item.id === biblistid
        })
        activeList.length > 0 && this.props.activeBiblist(activeList[0]);
      }
    }
    else if (!biblistid && this.props.activeBiblistData.length == 0) {
      this.props.history.push("/records/biblist");
    }
  }

  getElement(refs) {
    let element = ReactDOM.findDOMNode(refs);
    return element.value;
  }

  onSubmitApa(event) {
    event.preventDefault();
    const { getEditRecord, activeBiblistData } = this.props;
    let editMode = window.location.href.indexOf("editRecord") > -1;
    let formElements = event.target.form.elements;
    if (activeBiblistData && activeBiblistData.length == 0) {
      alert("Please choose a list first");
      return;
    }

    let title = formElements.namedItem("title").value;
    let lang = new VerifyLang(title).checkLanguage();

    var details = {
      recordType: 4,
      userid: this.props.userid,
      url: formElements.namedItem("url").value,
      title,
      retrived: new GetFormatDate().populateText(lang),
      year: formElements.namedItem("year").value,
      writers: this.state.writersHandler.formatWriters(this.state.names),
      activeBiblist: activeBiblistData.id
    }

    if (editMode) {
      let recordToEdit = getEditRecord[0];
      let bookid = recordToEdit.bookid;
      details["bookid"] = bookid;
      if (details.writers.fname.length === 0) {
        let writers = { fname: recordToEdit.wFname, lname: recordToEdit.wLname }
        details.writers = writers;
      }
      this.props.EditRecord(details);
    }
    else {
      this.props.InsertRecordToDB(details);
    }
    this.props.history.push("/records/biblist");

  }


  getWritersNames(newName) {
    this.setState({ names: newName });
  }


  render() {
    return (
      <div id="apaWebsiteForm" className="apaForm">
        <div className="row">
          <ApaForm
            formFeilds={this.state.formFeilds}
            onSubmitForm={(e) => this.onSubmitApa(e)}
            onWriterNameChanged={(name) => this.getWritersNames(name)}
          />
        </div>

      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    allBiblist: state.getBiblistNamesFromDB,
    activeBiblistData: state.activeBiblist,
    userid: state.authReducer.userid,
    getEditRecord: state.getEditRecord
  }
}

export default connect(mapStateToProps, { InsertRecordToDB, EditRecord, activeBiblist })(withRouter(ApaWebsite));

