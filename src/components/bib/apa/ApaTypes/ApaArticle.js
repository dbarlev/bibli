import React, {Component} from 'react';
import {connect} from 'react-redux';
import {InsertRecordToDB} from '../../../../actions/ajax';
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
        {id: "articleName", label: "שם המאמר"},
        {id: "episode", label: "כרך"},
        {id: "pages", label: "עמודים"},
        {id: "year", label: "שנת פרסום"},
        {id: "paperLink", label: "קישור לכתבה"}
      ],
      hiddenFeilds: ["paperLink"],
      selectedSourceOption: { value: 1, label: 'בדפוס' },
      writersHandler: new FormatWriters(),
      formSubmited: false,
      inputValue: ""
    }
  }

  getWritersNames(name)
  {   
      var names = this.state.writersHandler.getTypedName(name, this.state.names)
      this.setState({names});
  }

  onSubmitApa(event)
  {
    event.preventDefault();
    let formElements = event.target.form.elements;
    let activeBiblist = this.props.activeBiblist;
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
        title: formElements.namedItem("articleName").value,
        kereh: formElements.namedItem("episode").value,
        pages: formElements.namedItem("pages").value,
        year: formElements.namedItem("year").value,
        url: formElements.namedItem("paperLink").value,
        writers: this.state.writersHandler.formatWriters(this.state.names),
        activeBiblist: activeBiblist.id
    }

    this.props.InsertRecordToDB(details);
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


export default connect(mapStateToProps, {InsertRecordToDB})(withRouter(ApaArticle));

