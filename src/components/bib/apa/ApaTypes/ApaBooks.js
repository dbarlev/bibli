import React, {Component} from 'react';
import {connect} from 'react-redux';
import {InsertRecordToDB} from '../../../../actions/ajax';
import {GetFormatDate} from '../../services/GetFormatDate';
import {FormatWriters} from '../../services/FormatWriters';
import {VerifyLang} from '../../services/VerifyLang';
import  ApaForm from '../ApaForm/ApaForm';
import { withRouter } from 'react-router-dom';


class ApaBooks extends Component {

  constructor()
  {
    super();
    this.state = {
      names: [],
      formFeilds:[
        {id: "bookName", label: "שם הספר"},
        {id: "publisherName", label: "שם ההוצאה לאור"},
        {id: "publisherLocation", label: "מיקום ההוצאה לאור"},
        {id: "publishyear", label: "שנת ההוצאה"}
      ],
      formSubmited: false,
      writersHandler: new FormatWriters()
    }
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

    let name = formElements.namedItem("bookName").value;
    let lang = new VerifyLang(name).checkLanguage();
    var details = {
        userid: this.props.userid,
        recordType: 1,
        name,
        publishname: formElements.namedItem("publisherName").value,
        publishcity: formElements.namedItem("publisherLocation").value,
        year: formElements.namedItem("publishyear").value,
        writers: this.state.writersHandler.formatWriters(this.state.names),
        retrived: new GetFormatDate().populateText(lang),
        activeBiblist: activeBiblist.id
    }
      this.props.InsertRecordToDB(details);
      this.props.history.push("/records/biblist");
  }


  
  getWritersNames(name)
  {   
      var names = this.state.writersHandler.getTypedName(name, this.state.names)
      this.setState({names});
  }

  render() {
    return (
      <div id="apaBooksForm" className="apaForm">
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
      activeBiblist: state.activeBiblist,
      userid: state.authReducer.userid,
      getEditRecord: state.getEditRecord
  }
}

export default connect(mapStateToProps, {InsertRecordToDB})(withRouter(ApaBooks));


