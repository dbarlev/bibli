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
import  RedirectTo from '../../RedirectTo';
import {InsertRecordToDB} from '../../../actions/ajax';
import Writers from '../writers/Writers';
import {GetFormatDate} from '../services/GetFormatDate';
import {FormatWriters} from '../services/FormatWriters';
import {VerifyLang} from '../services/VerifyLang';

class ApaPaper extends Component {

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
        {id: "paperName", label: "שם העיתון"},
        {id: "papertHeadline", label: "כותרת הכתבה"},
        {id: "pagesNumber", label: "עמודים"},
        {id: "dateOfPublish", label: "תאריך פרסום"},
        {id: "paperLink", label: "קישור לכתבה"}
      ],
      hiddenFeilds: ["paperLink"],
      selectedSourceOption: { value: 1, label: 'בדפוס' },
      writersHandler: new FormatWriters(),
      formSubmited: false
    }
  }

  getElement(refs)
  {
    let element = ReactDOM.findDOMNode(refs);
    return element.value;
  }

  onSubmitApa(event, redirectUserToList)
  {
    event.preventDefault();
    let { activeBiblist } = this.props;
    let selectedSourceOption = this.state.selectedSourceOption;
    let name = this.getElement(this.refs.paperName);
    let lang = new VerifyLang(name).checkLanguage();
    let retrived = new GetFormatDate().populateText(lang);
    let title = this.getElement(this.refs.papertHeadline);
    let pages = this.getElement(this.refs.pagesNumber);
    let year = this.getElement(this.refs.dateOfPublish);
    let recordType = 3;
    let userid = this.props.userid;
    let url = this.refs.paperLink != null ? this.getElement(this.refs.paperLink) : null;
    let writers = this.state.writersHandler.formatWriters(this.state.names);

    var details = {
        selectedSourceOption,
        userid,
        recordType,
        name,
        title,
        retrived,
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
          return (
                <div>
                    <Col>
                      <FormControl className="apa" placeholder={feild.label} ref={feild.id} type="text" />
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
                    return (
                      <FormGroup key={index} controlId={feild.id}>
                          {this.validateFeildType(feild, "sourceTypeCombobox")}
                      </FormGroup>
                    );
                })
              }

              <Writers onWriterChange={this.getWritersNames.bind(this)} />
              <RedirectTo to="/biblist" redirect={this.state.formSubmited}/>
              <FormGroup className="pull-right">
                <Col >
                  <Button className="left-10" onClick={(event) => this.onSubmitApa(event,true)} type="submit">צור רשומה</Button>
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
      userid: state.authReducer.userid
  }
}

export default connect(mapStateToProps, {InsertRecordToDB})(ApaPaper);

