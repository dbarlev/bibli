import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { InsertRecordToDB, EditRecord } from '../../../../actions/recordsActions';
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

  getElement(refs) {
    let element = ReactDOM.findDOMNode(refs);
    return element.value;
  }

  onSubmitApa(event) {
    event.preventDefault();
    const { getEditRecord, activeBiblist } = this.props;
    let editMode = window.location.href.indexOf("editRecord") > -1;
    let formElements = event.target.form.elements;
    if (activeBiblist && activeBiblist.length == 0 && !this.props.homePage) {
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
      activeBiblist: activeBiblist.id
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
    else if (this.props.homePage) {
      sessionStorage.setItem("apaRecord", JSON.stringify(details));
      this.props.history.push("/lastStep");
    }
    else {
      this.props.InsertRecordToDB(details);
    }
    !this.props.homePage && this.props.history.push("/records/biblist");

  }


  getWritersNames(newName) {
    this.setState({ names: newName });
  }


  render() {
    return (
      <div id="websiteForm" className="apaForm" role="tabpanel">
        <div className="row">
          <ApaForm
            formFeilds={this.state.formFeilds}
            onSubmitForm={(e) => this.onSubmitApa(e)}
            onWriterNameChanged={(name) => this.getWritersNames(name)}
            homePage={this.props.homePage}
          />
        </div>

      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeBiblist: state.activeBiblist,
    userid: state.authReducer.userid,
    getEditRecord: state.getEditRecord
  }
}

export default connect(mapStateToProps, { InsertRecordToDB, EditRecord })(withRouter(ApaWebsite));
