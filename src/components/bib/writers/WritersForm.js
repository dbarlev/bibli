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



class WritersForm extends Component {

  constructor()
  {
    super();
    this.state = {
      firstName: "",
      lastName: ""
    }
  }

  firstNameChange(event)
  {
        
        this.setState({
          firstName: event.target.value,
          elementID: event.target.id
        },()=>{
            //console.log("current state: ", this.state.names) 
            this.props.onWriterChange({key: "firstName", elementID: this.state.elementID, "data": this.state.firstName});   
        });       
  }

  lastNameChange(event)
  {
        
        this.setState({
          lastName: event.target.value,
          elementID: event.target.id
        },()=>{
            //console.log("current state: ", this.state.names) 
            this.props.onWriterChange({key: "lastName", elementID: this.state.elementID, "data": this.state.lastName});   
        });       
  }

  removeWriter(event)
  {
      this.props.onRemoveWriter();   
  }

  render() {
    return (
      <div id="writersForm">
            <FormGroup controlId={"firstName" + this.props.name}>
                <Col sm={8}>
                    <FormControl value={this.state.names} onChange={ this.firstNameChange.bind(this) } ref="editorPrivateName" type="text" />
                    <HelpBlock role="status" aria-live="polite"></HelpBlock>
                </Col>
                <Col componentClass={ControlLabel}>
                    שם פרטי:
                </Col>
            </FormGroup>
            <FormGroup  controlId={"lastName" + this.props.name}>
                <Col sm={8}>
                    <FormControl onChange={ this.lastNameChange.bind(this) } ref="editorLastName" type="text" />
                    <HelpBlock role="status" aria-live="polite"></HelpBlock>
                </Col>
                <Col componentClass={ControlLabel}>
                    שם משפחה:
                </Col>
            </FormGroup>
      </div>

    );
  }
}



export default WritersForm;

