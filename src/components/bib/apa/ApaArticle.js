import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  Col,
  Checkbox,
  ControlLabel,
  HelpBlock
} from 'react-bootstrap';
import Select from 'react-select';

import {InsertRecordToDB} from '../../../actions/ajax';
import Writers from '../writers/Writers';
import {GetFormatDate} from '../services/GetFormatDate';
import {FormatWriters} from '../services/FormatWriters';
import {VerifyLang} from '../services/VerifyLang';

class ApaArticle extends Component {

  constructor()
  {
    super();
    this.state = {
      names: [],
      formFeilds:[
        {
            id: "sourceType",
            type: "select", 
            options: [
              { value: "print", label: 'בדפוס' },
              { value: "online", label: 'מקוון' }
            ],
            label: "סוג מקור"
        },
        {id: "noteName", label: "שם כתב העת"},
        {id: "articleName", label: "שם המאמר"},
        {id: "episode", label: "כרך"},
        {id: "pages", label: "עמודים"},
        {id: "publishYear", label: "שנת פרסום"},
        {id: "paperLink", label: "קישור לכתבה"}
      ],
      hiddenFeilds: ["paperLink"],
      selectedSourceOption: { value: 1, label: 'בדפוס' },
      writersHandler: new FormatWriters()
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
    let selectedSourceOption = this.state.selectedSourceOption;
    let name = this.getElement(this.refs.noteName);
    let lang = new VerifyLang(name).checkLanguage();
    let retrived = new GetFormatDate().populateText(lang);
    let title = this.getElement(this.refs.articleName);
    let kereh = this.getElement(this.refs.episode);
    let pages = this.getElement(this.refs.pages);
    let year = this.getElement(this.refs.publishYear);
    let url = this.refs.paperLink != null ? this.getElement(this.refs.paperLink) : null;
    let recordType = 2;
    let userid = 19;
    let writers = this.state.writersHandler.formatWriters(this.state.names);
    
    var details = {
        userid,
        recordType,
        retrived,
        selectedSourceOption,
        name,
        title,
        kereh,
        pages,
        year,
        url,
        writers
    }

    this.props.InsertRecordToDB(details); // call to redux action that created the apa query
  }

  getWritersNames(name)
  {   
      var names = this.state.writersHandler.getTypedName(name, this.state.names)
      this.setState({names});
  }

  handleSourceChange(value)
  {
    var hiddenFeilds = this.state.hiddenFeilds;
    if(value.value == "online")
    {
        var index = hiddenFeilds.indexOf("paperLink");
        hiddenFeilds.splice(index,1);
    }
    else
    {
        hiddenFeilds.push("paperLink");      
    }
    this.setState({
      selectedSourceOption: value,
      hiddenFeilds: hiddenFeilds
    });
  }

  validateFeildType(feild, className)
  {
      if(this.state.hiddenFeilds.indexOf(feild.id) > -1)
        return;

      if(feild.type == "select")
      {
        return (
          <div>
              <Col sm={8}>
                  <Select
                      className={className}
                      options={feild.options}
                      onChange={this.handleSourceChange.bind(this)}
                      value={this.state.selectedSourceOption}
                    />
              </Col>
              <Col componentClass={ControlLabel}>
                    {feild.label}
            </Col>
          </div>
        )  
      }
      else
      {
          return (
                <div>
                    <Col sm={8}>
                      <FormControl ref={feild.id} type="text" />
                      <HelpBlock role="status" aria-live="polite"></HelpBlock>
                    </Col>
                    <Col componentClass={ControlLabel}>
                      {feild.label}
                    </Col>
                </div>
          );
      }
  }

  render() {

    return (
      <div id="apaPaperForm" className="apaForm">
        <div className="row">
          <div className="col-md-8">
            <Form horizontal>   
              {
                this.state.formFeilds.map((feild,index) => {
                    return (
                      <FormGroup key={index} controlId={feild.id}>
                          {this.validateFeildType(feild, "sourceTypeCombobox")}
                      </FormGroup>
                    );
                })
              }

              <Writers onWriterChange={this.getWritersNames.bind(this)} />

              <FormGroup>
                <Col >
                  <Button onClick={(event) => this.onSubmitApa(event)} type="submit">צור רשומה</Button>
                </Col>
              </FormGroup>
            </Form>
          </div>
        </div>

      </div>

    );
  }
}


export default connect(null, {InsertRecordToDB})(ApaArticle);

