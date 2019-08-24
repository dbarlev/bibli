import React, {Component} from 'react';
import {connect} from 'react-redux';
import {InsertRecordToDB} from '../../../actions/ajax';
import Writers from '../writers/Writers';
import {
    Button,
    Form,
    FormGroup,
    Col,
} from 'react-bootstrap';
import ApaFormField from './ApaFormField';
import Select from 'react-select';

class ApaForm extends Component {

  constructor()
  {
    super();
    this.state = {

    }
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
  
  renderComobox() {

    let { combobox } = this.props;
    if(combobox && combobox.type == "select")
    {
        return (
            <div class="selectDropdown">
                <Col>
                    <Select
                        aria-label={combobox.label}
                        className="sourceTypeCombobox"
                        options={combobox.options}
                        onChange={changedState => this.props.handleComboboxChange(changedState)}
                        value={this.state.selectedSourceOption}     
                    />
                </Col>
                <br />
            </div>
        )
    }   
  }


  render() {
    return (
      <div id="apaPaperForm" className="apaForm">
        <div className="row">
            <Form horizontal>
              {
                  this.renderComobox()
              }

              {
                this.props.formFeilds.map((field,index) => {
                    return (
                        <FormGroup key={index} controlId={field.id}>     
                            <ApaFormField field={field} />  
                        </FormGroup>
                    );
                })
              }

              <Writers editMode={this.props.editRecord} editValues={this.props.getEditRecord} onWriterChange={(name) => this.props.onWriterNameChanged(name)} />

              <FormGroup className="pull-right">
                <Col >
                    <Button className="left-10"  onClick={(event) => this.props.onSubmitForm(event)} type="submit">צור רשומה</Button>
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
      activeBiblist: state.activeBiblist,
      userid: state.authReducer.userid,
      getEditRecord: state.getEditRecord
  }
}


export default connect(mapStateToProps, {InsertRecordToDB})(ApaForm);

