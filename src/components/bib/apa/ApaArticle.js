import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  Col,
  HelpBlock
} from 'react-bootstrap';
import Select from 'react-select';
import {InsertRecordToDB} from '../../../actions/ajax';
import Writers from '../writers/Writers';
import {GetFormatDate} from '../services/GetFormatDate';
import {FormatWriters} from '../services/FormatWriters';
import {VerifyLang} from '../services/VerifyLang';
import  RedirectTo from '../../RedirectTo';

class ApaArticle extends Component {

  constructor()
  {
    super();
    this.state = {
      names: [],
      type: "article",
      formFeilds:[
        {
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
        {id: "name", label: "שם כתב העת"},
        {id: "articleName", label: "שם המאמר"},
        {id: "episode", label: "כרך"},
        {id: "pages", label: "עמודים"},
        {id: "year", label: "שנת פרסום"},
        {id: "paperLink", label: "קישור לכתבה"}
      ],
      nameValue: "",
      articleNameValue:"",
      episodeValue: "",
      pagesValue: "",
      yearValue: "",
      paperLinkValue: "",
      nameEdited: false,
      articleNameEdited: false,
      episodeEdited: false,
      pagesEdited: false,
      yearEdited: false,
      paperLinkEdited: false,
      hiddenFeilds: ["paperLink"],
      selectedSourceOption: { value: 1, label: 'בדפוס' },
      writersHandler: new FormatWriters(),
      formSubmited: false,
      inputValue: ""
    }
  }

  getElementValue(fieldName)
  {
    return this.state[fieldName];
  }

  onSubmitApa(event, redirectUserToList)
  {
    event.preventDefault();
    let activeBiblist = this.props.activeBiblist;
    let selectedSourceOption = this.state.selectedSourceOption;
    let name = this.getElementValue("nameValue");
    let lang = new VerifyLang(name).checkLanguage();
    let retrived = new GetFormatDate().populateText(lang);
    let title = this.getElementValue("articleNameValue");
    let kereh = this.getElementValue("episodeValue");
    let pages = this.getElementValue("pagesValue");
    let year = this.getElementValue("yearValue");
    let url = this.getElementValue("paperLinkValue");
    let recordType = 2;
    let userid = this.props.userid;
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

    if(activeBiblist && activeBiblist.length == 0)
    {
      alert("Please choose a list first")
    }
    else
    {
      details["activeBiblist"] = activeBiblist.id;
      this.props.InsertRecordToDB(details); // call to redux action that created the apa query
    }

    if(redirectUserToList)
    {
        this.setState({
          formSubmited: true
        })    
    }
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

  onChangeValue(id, event){
    let newValue = event.target.value;
    this.setState({
      [id]: newValue
    });
  }

  editMode(feild) {
    let value = "";
    let { type } = this.state;
    let {editRecord, getEditRecord} = this.props;

    if(getEditRecord.length > 0 && type === getEditRecord[0].type)
    {
      if(editRecord && !this.state[feild.id + "Edited"]){
        value = getEditRecord[0][feild.id];
        this.setState({
          [feild.id + "Value"]: value,
          [feild.id + "Edited"]: true
        });
      } 
    }
  }
  
  validateFeildType(feild, className)
  {
      if(this.state.hiddenFeilds.indexOf(feild.id) > -1)
        return;

      if(feild.type == "select")
      {
        return (
          <div class="selectDropdown">
              <Col>
                  <Select
                      aria-label={feild.label}
                      className={className}
                      options={feild.options}
                      onChange={this.handleSourceChange.bind(this)}
                      value={this.state.selectedSourceOption}
                    />
              </Col>
          </div>
        )  
      }
      else
      {
          this.editMode(feild);
          return (
            <div>
                <Col>
                  <FormControl className="apa" onChange={this.onChangeValue.bind(this, feild.id + "Value")} value={this.state[feild.id + "Value"]} aria-label="feild.label" id={'apa-' + feild.id} placeholder={feild.label} ref={feild.id} type="text" />
                  <HelpBlock role="status" aria-live="polite"></HelpBlock>
                </Col>
            </div>
          );
      }
  }

  render() {
    return (
      <div id="apaPaperForm" className="apaForm">
        <div className="row">
            <Form horizontal>   
              {
                this.state.formFeilds.map((feild,index) => {
                  console.log("index", index);
                    return (
                      <FormGroup key={index} controlId={feild.id}>
                          {this.validateFeildType(feild, "sourceTypeCombobox")}
                      </FormGroup>
                    );
                })
              }

              <Writers editMode={this.props.editRecord} editValues={this.props.getEditRecord} onWriterChange={this.getWritersNames.bind(this)} />
              <RedirectTo to="/biblist" redirect={this.state.formSubmited}/>

              <FormGroup className="pull-right">
                <Col >
                  <Button  className="left-10" onClick={(event) => this.onSubmitApa(event, true)} type="submit">צור רשומה</Button>
                  <Button onClick={(event) => this.onSubmitApa(event)} type="submit">אישור והוספת פריט נוסף</Button>
                </Col>
              </FormGroup>
            </Form>
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


export default connect(mapStateToProps, {InsertRecordToDB})(ApaArticle);

