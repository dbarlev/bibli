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

  getElement(refs)
  {
    let element = ReactDOM.findDOMNode(refs);
    return element.value;
  }

  onSubmitApa(event)
  {
    event.preventDefault();

    let name = this.getElement(this.refs.bookName);
    let lang = new VerifyLang(name).checkLanguage();
    let retrived = new GetFormatDate().populateText(lang);
    let publishname = this.getElement(this.refs.publisherName);
    let publishcity = this.getElement(this.refs.publisherLocation);
    let year = this.getElement(this.refs.publishyear);
    let recordType = 1;
    let userid = 19;
    let writers = this.state.writersHandler.formatWriters(this.state.names);

    var details = {
        userid,
        recordType,
        name,
        publishname,
        publishcity,
        year,
        writers,
        retrived
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
      <div id="apaBooksForm" className="apaForm">
        <div className="row">
          <div className="col-md-8">
            <Form horizontal>
              {
                this.state.formFeilds.map((feild,index) => {
                    return (
                      <FormGroup key={index} controlId={feild.id}>
                        <Col sm={8}>
                          <FormControl ref={feild.id} type="text" />
                          <HelpBlock role="status" aria-live="polite"></HelpBlock>
                        </Col>
                        <Col componentClass={ControlLabel}>
                          {feild.label}
                        </Col>
                      </FormGroup>
                    );
                })
              }

              <Writers onWriterChange={this.getWritersNames.bind(this)} />
              
              <FormGroup>
                <Col >
                  <Button onClick={(event) => this.onSubmitApa(event)} type="submit">הירשם</Button>
                </Col>
              </FormGroup>
            </Form>
          </div>
        </div>

      </div>

    );
  }
}

export default connect(null, {InsertRecordToDB})(ApaBooks);


