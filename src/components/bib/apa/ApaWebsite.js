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
import {CreateWebsiteApaStandart} from '../../../actions';
import Writers from '../writers/Writers';

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
      ]
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
    let linkToPage = this.getElement(this.refs.linkToPage);
    let articleHeadline = this.getElement(this.refs.articleHeadline);
    let publishYear = this.getElement(this.refs.publishYear);

    var details = {
        linkToPage,
        articleHeadline,
        publishYear,
        editor: this.state.names
    }

    this.props.CreateWebsiteApaStandart(details); // call to redux action that created the apa query
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

  render() {


    return (
      <div id="apaWebsiteForm" className="apaForm">
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



const mapStateToProps = (state) => {
  if(state.createApa.length > 0)
    console.log(state.createApa);
  return {createApa: state.createApa}
}

export default connect(mapStateToProps, {CreateWebsiteApaStandart})(ApaWebsite);

