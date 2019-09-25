import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  FormGroup,
  FormControl,
  Col,
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

  componentWillReceiveProps(props)
  {

    if(window.location.href.indexOf("editRecord") > -1)
    {
       this.setState({
         firstName: this.props.name.firstName,
         lastName: this.props.name.lastName
       });
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
                <Col>
                    <FormControl className="apa" placeholder="שם פרטי"  value={this.state.firstName} onChange={ this.firstNameChange.bind(this) } ref="editorPrivateName" type="text" />
                    <HelpBlock role="status" aria-live="polite"></HelpBlock>
                </Col>
            </FormGroup>
            <FormGroup  controlId={"lastName" + this.props.name}>
                <Col>
                    <FormControl className="apa" placeholder="שם משפחה" onChange={ this.lastNameChange.bind(this) } value={this.state.lastName} ref="editorLastName" type="text" />
                    <HelpBlock role="status" aria-live="polite"></HelpBlock>
                </Col>
            </FormGroup>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
      getEditRecord: state.getEditRecord
  }
}

export default connect(mapStateToProps)(WritersForm);
