import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InsertRecordToDB, EditRecord } from '../../../../actions/ajax';
import { GetFormatDate } from '../../services/GetFormatDate';
import { FormatWriters } from '../../services/FormatWriters';
import { VerifyLang } from '../../services/VerifyLang';
import ApaForm from '../ApaForm/ApaForm';
import { withRouter } from 'react-router-dom';
import { SELECT_PRINT_TYPE, SELECT_ONLINE_ARTICLE_TYPE } from './consts';

class ApaArticle extends Component {

  constructor() {
    super();
    this.state = {
      names: [],
      type: "article",
      combobox: {
        id: "sourceType",
        type: "select",
        options: [
          SELECT_PRINT_TYPE,
          SELECT_ONLINE_ARTICLE_TYPE
        ],
        label: "סוג מקור",
        value: "",
        edited: false
      },
      formFeilds: [
        { id: "name", label: "שם כתב העת" },
        { id: "title", label: "שם המאמר" },
        { id: "kereh", label: "כרך" },
        { id: "pages", label: "עמודים" },
        { id: "year", label: "שנת פרסום" }
      ],
      selectedSourceOption: SELECT_PRINT_TYPE,
      writersHandler: new FormatWriters(),
      formSubmited: false,
      modeChange: false
    }
  }

  checkFormMode() {
    if (this.state.modeChange)
      return;

    let { getEditRecord } = this.props;
    let selectedSourceOption = SELECT_PRINT_TYPE;
    if (getEditRecord && getEditRecord.length > 0 && window.location.href.indexOf("editRecord") > -1) {
      if (getEditRecord[0].url.trim() !== "") {
        selectedSourceOption = SELECT_ONLINE_ARTICLE_TYPE;
      }
      this.setState({
        modeChange: true
      });
      this.onComboboxChange(selectedSourceOption.id);
    }

  }

  getWritersNames(newName) {
    this.setState({ names: newName });
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
      name,
      userid: this.props.userid,
      recordType: 2,
      retrived: new GetFormatDate().populateText(lang),
      selectedSourceOption: this.state.selectedSourceOption,
      title: formElements.namedItem("title").value,
      kereh: formElements.namedItem("kereh").value,
      pages: formElements.namedItem("pages").value,
      year: formElements.namedItem("year").value,
      url: formElements.namedItem("url") ? formElements.namedItem("url").value : "",
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

  onComboboxChange(value) {

    let fields = this.state.formFeilds;
    let selectedSourceOption = SELECT_PRINT_TYPE;
    if (value === "url") {
      if (fields[fields.length - 1].id !== "url") {
        fields.push(SELECT_ONLINE_ARTICLE_TYPE);
        selectedSourceOption = SELECT_ONLINE_ARTICLE_TYPE;
      }
    }
    else {
      if (fields[fields.length - 1].id === "url") {
        fields.pop();
      }
    }

    this.setState({
      formFeilds: fields,
      selectedSourceOption
    })
  }

  render() {
    return (
      <div id="articleForm" className="apaForm" role="tabpanel">
        <div className="row">
          <ApaForm
            formFeilds={this.state.formFeilds}
            defaultValue={this.state.selectedSourceOption}
            onSubmitForm={(e) => this.onSubmitApa(e)}
            combobox={this.state.combobox}
            handleComboboxChange={(value) => this.onComboboxChange(value)}
            onWriterNameChanged={(name) => this.getWritersNames(name)}
            homePage={this.props.homePage}
          />
        </div>
        {
          this.checkFormMode()
        }
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


export default connect(mapStateToProps, { InsertRecordToDB, EditRecord })(withRouter(ApaArticle));
