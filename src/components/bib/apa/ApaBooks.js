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
import {InsertRecordToDB} from '../../../actions/ajax';
import Writers from '../writers/Writers';
import {GetFormatDate} from '../services/GetFormatDate';
import {FormatWriters} from '../services/FormatWriters';
import {VerifyLang} from '../services/VerifyLang';
import  RedirectTo from '../../RedirectTo';


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

  onSubmitApa(event, redirectUserToList)
  {
    event.preventDefault();

    let activeBiblist = this.props.activeBiblist;

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

  render() {
    return (
      <div id="apaBooksForm" className="apaForm">
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
               <RedirectTo to="/biblist" redirect={this.state.formSubmited}/>
              <FormGroup className="pull-right">
                <Col >
                  <Button className="left-10" onClick={(event) => this.onSubmitApa(event, true)} type="submit">צור רשומה</Button>
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
      activeBiblist: state.activeBiblist
  }
}

export default connect(mapStateToProps, {InsertRecordToDB})(ApaBooks);


