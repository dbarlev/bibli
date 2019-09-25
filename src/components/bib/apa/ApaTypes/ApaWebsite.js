import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {InsertRecordToDB} from '../../../../actions/ajax';
import {GetFormatDate} from '../../services/GetFormatDate';
import {FormatWriters} from '../../services/FormatWriters';
import  ApaForm from '../ApaForm/ApaForm';
import { withRouter } from 'react-router-dom';
import {VerifyLang} from '../../services/VerifyLang';

class ApaWebsite extends Component {

  constructor()
  {
    super();
    this.state = {
      names: [],
      formFeilds:[
        {id: "url", label: "קישור לכתבה"},
        {id: "title", label: "כותרת הכתבה"},
        {id: "year", label: "תאריך פרסום"}
      ],
      writersHandler: new FormatWriters(),
      formSubmited: false
    }
  }

  getElement(refs)
  {
    let element = ReactDOM.findDOMNode(refs);
    return element.value;
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
      activeBiblist: state.activeBiblist,
      userid: state.authReducer.userid
  }
}

export default connect(mapStateToProps, {InsertRecordToDB})(withRouter(ApaWebsite));

