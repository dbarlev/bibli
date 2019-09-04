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

  componentDidMount(){

    let { getEditRecord, field} = this.props;

    if(getEditRecord.length > 0)
    {
      this.setState({
        value: getEditRecord[0][field.id]
      })
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
      getEditRecord: state.getEditRecord
  }
}


export default connect(mapStateToProps, {InsertRecordToDB})(ApaFormField);

