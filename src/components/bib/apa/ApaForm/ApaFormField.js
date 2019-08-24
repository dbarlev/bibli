import React, {Component} from 'react';
import {connect} from 'react-redux';
import {InsertRecordToDB} from '../../../../actions/ajax';
import Writers from '../../writers/Writers';
import {
    Button,
    Form,
    FormGroup,
    FormControl,
    Col,
    HelpBlock
} from 'react-bootstrap';

class ApaFormField extends Component {

  constructor()
  {
    super();
    this.state = {
        value: ""
    }
  }

  getElementValue(fieldName)
  {
    return this.state[fieldName];
  }

  onChangeValue(event){
    let newValue = event.target.value;
    this.setState({
      value: newValue
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
  

  render() {

    let { field } = this.props;
    return (
      <div className="apaFormFeild"> 
            <Col>
                <FormControl 
                    className="apa" 
                    onChange={this.onChangeValue.bind(this)}
                    value={this.state.value}
                    aria-label="field.label"
                    id={'apa-' + field.id}
                    placeholder={field.label}
                    ref={field.id}
                    type="text"
                    name={field.id}
                />
                <HelpBlock role="status" aria-live="polite"></HelpBlock>
            </Col>
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


export default connect(mapStateToProps, {InsertRecordToDB})(ApaFormField);

