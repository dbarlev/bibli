import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InsertRecordToDB, EditRecord } from '../../../../actions/ajax';
import { GetFormatDate } from '../../services/GetFormatDate';
import { FormatWriters } from '../../services/FormatWriters';
import { VerifyLang } from '../../services/VerifyLang';
import ApaForm from '../ApaForm/ApaForm';
import { withRouter } from 'react-router-dom';
import { FULL_BOOK, CHAPTER } from './consts';

class ApaBooks extends Component {

  constructor() {
    super();
    this.state = {
      names: [],
      combobox: {
        id: "sourceType",
        type: "select",
        options: [
          FULL_BOOK,
          CHAPTER
        ],
        label: "סוג מקור",
        chapterFeilds: [
          { id: "chapter_name", label: "שם הפרק" },
          { id: "chapter_pages", label: "עמודים" }
        ]
      },
      formFeilds: [
        { id: "name", label: "שם הספר" },
        { id: "publishname", label: "שם ההוצאה לאור" },
        { id: "publishcity", label: "מיקום ההוצאה לאור" },
        { id: "year", label: "שנת ההוצאה" }
      ],
      selectedSourceOption: FULL_BOOK,
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
    let chapterName = formElements.namedItem("chapter_name");
    let chapterPages = formElements.namedItem("chapter_pages");

    var details = {
      userid: this.props.userid || null,
      recordType: 1,
      name,
      publishname: formElements.namedItem("publishname").value,
      publishcity: formElements.namedItem("publishcity").value,
      year: formElements.namedItem("year").value,
      writers: this.state.writersHandler.formatWriters(this.state.names),
      retrived: new GetFormatDate().populateText(lang),
      activeBiblist: activeBiblist.id || null,
      chapter: chapterName && chapterName.value || null,
      pages: chapterPages && chapterPages.value || null
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

  onComboboxChange(value) {

    let fields = this.state.formFeilds;
    let selectedSourceOption = FULL_BOOK;
    if (value === "chapter") {
      if (!fields[fields.length - 1].id.startsWith("chapter")) {
        fields = fields.concat(this.state.combobox.chapterFeilds);
        selectedSourceOption = CHAPTER;
      }
    }
    else {
      if (fields[fields.length - 1].id.startsWith("chapter")) {
        fields.pop();
        fields.pop();
      }
    }

    this.setState({
      formFeilds: fields,
      selectedSourceOption
    })
  }

  getWritersNames(newName) {
    this.setState({ names: newName });
  }

  render() {
    return (
      <div id="bookForm" className="apaForm" role="tabpanel">
        <div className="row">
          <ApaForm
            defaultValue={this.state.selectedSourceOption}
            combobox={this.state.combobox}
            formFeilds={this.state.formFeilds}
            onSubmitForm={(e) => this.onSubmitApa(e)}
            handleComboboxChange={(value) => this.onComboboxChange(value)}
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

