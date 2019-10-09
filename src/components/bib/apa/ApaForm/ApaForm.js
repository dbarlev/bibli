import React, {Component} from 'react';
import {connect} from 'react-redux';
import {InsertRecordToDB} from '../../../../actions/ajax';
import Writers from '../../writers/Writers';
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
      mode: "add",
      buttonText: "צור רשומה",
      fieldValue: "",
      modeChange: false,
      bookid: false
    }
  }

  checkFormMode()
  {
    if(this.state.modeChange)
        return;

      let { getEditRecord} = this.props;

      if(getEditRecord.length > 0 && window.location.href.indexOf("editRecord") > -1)
      {
        this.setState({
          mode: "edit",
          buttonText: "ערוך רשומה",
          modeChange: true
        });
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

              <Writers onWriterChange={(name) => this.props.onWriterNameChanged(name)} />

              <FormGroup className="pull-right">
                <Col >
                    <Button className="left-10" onClick={(event) => this.props.onSubmitForm(event)} type="submit">
                      {this.state.buttonText}
                    </Button>
                </Col>
              </FormGroup>
            </Form>
        </div>
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


export default connect(mapStateToProps, {InsertRecordToDB})(ApaForm);

