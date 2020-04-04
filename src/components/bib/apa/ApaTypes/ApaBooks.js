import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InsertRecordToDB, EditRecord } from '../../../../actions/ajax';
import { GetFormatDate } from '../../services/GetFormatDate';
import { FormatWriters } from '../../services/FormatWriters';
import { VerifyLang } from '../../services/VerifyLang';
import ApaForm from '../ApaForm/ApaForm';
import { withRouter } from 'react-router-dom';
import Spinner from '../../../Spinner/Spinner';


class ApaBooks extends Component {

  constructor() {
    super();
    this.state = {
      names: [],
      formFeilds: [
        { id: "name", label: "שם הספר" },
        { id: "publishname", label: "שם ההוצאה לאור" },
        { id: "publishcity", label: "מיקום ההוצאה לאור" },
        { id: "year", label: "שנת ההוצאה" }
      ],
      formSubmited: false,
      writersHandler: new FormatWriters()
    }
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
    let name = formElements.namedItem("name").value;
    let lang = new VerifyLang(name).checkLanguage();
    var details = {
      userid: this.props.userid || null,
      recordType: 1,
      name,
      publishname: formElements.namedItem("publishname").value,
      publishcity: formElements.namedItem("publishcity").value,
      year: formElements.namedItem("year").value,
      writers: this.state.writersHandler.formatWriters(this.state.names),
      retrived: new GetFormatDate().populateText(lang),
      activeBiblist: activeBiblist.id || null
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
      <div id="bookForm" className="apaForm">
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

export default connect(mapStateToProps, { InsertRecordToDB, EditRecord })(withRouter(ApaBooks));

