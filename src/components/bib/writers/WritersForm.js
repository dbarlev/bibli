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
      lastName: "",
      writerID: "",
      modeChanged: false
    }
  }

  checkFormMode()
  {
    let name = this.props.name;

    if(name.firstName === "" || name.lastName === "" || name.writerID === "")
      return;

    if(this.state.modeChanged)
      return;

    

    if(window.location.href.indexOf("editRecord") > -1)
    {
       this.setState({
         modeChanged: true
       });
      this.firstNameChange(name.firstName);
      this.lastNameChange(name.lastName);
    }
  }

  firstNameChange(value)
  {    
    this.setState({
      firstName: value,
      writerID: "writerName" + this.props.index
    }); 
    this.props.onWriterChange(this.state);   
  }

  lastNameChange(value)
  {
    this.setState({
      lastName: value,
      writerID: "writerName" + this.props.index
    }); 
    
    this.props.onWriterChange(this.state);   
  }

  removeWriter(event)
  {
      this.props.onRemoveWriter();   
  }

  render() {
    return (
      <div id="writersForm">
            <FormGroup controlId={"firstName" + this.props.index}>
                <Col>
                    <FormControl className="apa" placeholder="שם פרטי"  value={this.state.firstName} onChange={ (event) => this.firstNameChange(event.target.value) } ref="editorPrivateName" type="text" />
                    <HelpBlock role="status" aria-live="polite"></HelpBlock>
                </Col>
            </FormGroup>
            <FormGroup controlId={"lastName" + this.props.index}>
                <Col>
                    <FormControl className="apa" placeholder="שם משפחה" onChange={ (event) => this.lastNameChange(event.target.value)  } value={this.state.lastName} ref="editorLastName" type="text" />
                    <HelpBlock role="status" aria-live="polite"></HelpBlock>
                </Col>
            </FormGroup>
            {
              this.checkFormMode()
            }
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
