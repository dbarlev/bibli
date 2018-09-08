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

import {CreatePaperApaStandart} from '../../../actions';
import Writers from '../writers/Writers';

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
      selectedSourceOption: { value: 1, label: 'בדפוס' }
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
    let paperName = this.getElement(this.refs.paperName);
    let papertHeadline = this.getElement(this.refs.papertHeadline);
    let pagesNumber = this.getElement(this.refs.pagesNumber);
    let dateOfPublish = this.getElement(this.refs.dateOfPublish);
    let paperLink = this.refs.paperLink != null ? this.getElement(this.refs.paperLink) : null;

    var details = {
        selectedSourceOption,
        paperName,
        papertHeadline,
        pagesNumber,
        dateOfPublish,
        paperLink,
        editor: this.state.names
    }

    this.props.CreatePaperApaStandart(details); // call to redux action that created the apa query
  }

  getWritersNames(name)
  {  
     let names = this.state.names;
     var flag = false;
     names.forEach(function(item){
      var keys = Object.keys(item);
      if(keys.indexOf(name.elementID) > -1)
      {
        flag = true;
        item[name.elementID] = name.data;
      }
    })
    if(!flag)
    {
      names.push({
        [name.elementID]: 
        {
          data: name.data
        }
      });
    }
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
          <div className="col-md-4 col-md-offset-4">
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



const mapStateToProps = (state) => {
  if(state.createApa.length > 0)
    alert(state.createApa);
  return {createApa: state.createApa}
}

export default connect(mapStateToProps, {CreatePaperApaStandart})(ApaPaper);

