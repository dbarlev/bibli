import React, {Component} from 'react';
import {connect} from 'react-redux';
import {InsertRecordToDB, EditRecord} from '../../../../actions/ajax';
import {GetFormatDate} from '../../services/GetFormatDate';
import {FormatWriters} from '../../services/FormatWriters';
import {VerifyLang} from '../../services/VerifyLang';
import  ApaForm from '../ApaForm/ApaForm';
import { withRouter } from 'react-router-dom';

class ApaArticle extends Component {

  constructor()
  {
    super();
    this.state = {
      names: [],
      type: "article",
      combobox: {
        id: "sourceType",
        type: "select", 
        options: [
          { value: "print", label: 'בדפוס' },
          { value: "online", label: 'מקוון' }
        ],
        label: "סוג מקור",
        value: "",
        edited: false
      },
      formFeilds:[
        {id: "name", label: "שם כתב העת"},
        {id: "title", label: "שם המאמר"},
        {id: "kereh", label: "כרך"},
        {id: "pages", label: "עמודים"},
        {id: "year", label: "שנת פרסום"},
        {id: "url", label: "קישור לכתבה"}
      ],
      hiddenFeilds: ["url"],
      selectedSourceOption: { value: 1, label: 'בדפוס' },
      writersHandler: new FormatWriters(),
      formSubmited: false,
      inputValue: ""
    }
  }

  getWritersNames(newName)
  {   
      this.setState({names: newName});
  }

  onSubmitApa(event)
  {
    event.preventDefault();
    const { getEditRecord, activeBiblist} = this.props;
    let editMode = window.location.href.indexOf("editRecord") > -1;
    let formElements = event.target.form.elements;
    if(activeBiblist && activeBiblist.length == 0)
    {
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
        url: formElements.namedItem("url").value,
        writers: this.state.writersHandler.formatWriters(this.state.names),
        activeBiblist: activeBiblist.id
    }

    if(editMode){
      let recordToEdit = getEditRecord[0];
      let bookid = recordToEdit.bookid;
      details["bookid"] = bookid;
      if(details.writers.fname.length === 0)
      {
        let writers = { fname: recordToEdit.wFname, lname: recordToEdit.wLname}
        details.writers = writers;
      }
      this.props.EditRecord(details);
    } 
    else{
      this.props.InsertRecordToDB(details);
    } 
    this.props.history.push("/records/biblist");
  }


  render() {
    return (
      <div id="apaPaperForm" className="apaForm">
        <div className="row">
          <ApaForm 
            formFeilds={this.state.formFeilds}
            onSubmitForm={(e) => this.onSubmitApa(e)}
            combobox={this.state.combobox}
            handleComboboxChange={(changedState) => this.setState({
              selectedSourceOption: changedState.value
            })}
            onWriterNameChanged={(name) => this.getWritersNames(name)}
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


export default connect(mapStateToProps, {InsertRecordToDB, EditRecord})(withRouter(ApaArticle));

