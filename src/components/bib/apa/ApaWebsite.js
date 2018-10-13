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
import {InsertRecordToDB} from '../../../actions/ajax';
import Writers from '../writers/Writers';
import {GetFormatDate} from '../services/GetFormatDate';
import {FormatWriters} from '../services/FormatWriters';
import {VerifyLang} from '../services/VerifyLang';

class ApaWebsite extends Component {

  constructor()
  {
    super();
    this.state = {
      names: [],
      formFeilds:[
        {id: "linkToPage", label: "קישור לכתבה"},
        {id: "articleHeadline", label: "כותרת הכתבה"},
        {id: "publishYear", label: "תאריך פרסום"}
      ],
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
    let url = this.getElement(this.refs.linkToPage);
    let title = this.getElement(this.refs.articleHeadline);
    let lang = new VerifyLang(title).checkLanguage();
    let retrived = new GetFormatDate().populateText(lang);
    let year = this.getElement(this.refs.publishYear);
    let recordType = 4;
    let userid = 19;
    let writers = this.state.writersHandler.formatWriters(this.state.names);

    var details = {
        recordType,
        userid,
        url,
        title,
        retrived,
        year,
        writers
    }

    this.props.InsertRecordToDB(details); // call to redux action that created the apa query
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
            <Form horizontal>
              {
                this.state.formFeilds.map((feild,index) => {
                    return (
                      <FormGroup key={index} controlId={feild.id}>
                        <Col>
                          <FormControl className="apa" placeholder={feild.label} ref={feild.id} type="text" />
                          <HelpBlock role="status" aria-live="polite"></HelpBlock>
                        </Col>
                      </FormGroup>
                    );
                })
              }

              <Writers onWriterChange={this.getWritersNames.bind(this)} />

              <FormGroup className="pull-right">
                <Col >
                  <Button className="left-10" onClick={(event) => this.onSubmitApa(event)} type="submit">צור רשומה</Button>
                  <Button onClick={(event) => this.onSubmitApa(event)} type="submit">אישור והוספת פריט נוסף</Button>
                </Col>
              </FormGroup>
            </Form>
        </div>

      </div>

    );
  }
}


export default connect(null, {InsertRecordToDB})(ApaWebsite);

