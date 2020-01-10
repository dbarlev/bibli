import React, { Component } from "react";
import { connect } from "react-redux";
import { InsertRecordToDB } from "../../../../actions/ajax";
import Writers from "../../writers/Writers";
import { withRouter } from 'react-router-dom';
import { Button, Form, FormGroup, Col, Alert } from "react-bootstrap";
import ApaFormField from "./ApaFormField";
import Select from "react-select";
import { SELECT_PRINT_TYPE } from "../ApaTypes/consts";
import AddOrChooseList from '../../listOfRecords/addOrChooseList';
import './ApaForm.scss';

class ApaForm extends Component {
  constructor() {
    super();
    this.state = {
      mode: "add",
      buttonText: "צור פריט ביבליוגרפי",
      fieldValue: "",
      modeChange: false,
      bookid: false,
      selectValue: "בדפוס",
      selectChanged: false,
      validationError: false,
      validationErrorText: "חובה למלא את כל השדות בטופס",
      showModal: false
    };
  }

  componentDidMount() {
    const { activeBiblist } = this.props;
    if (activeBiblist && activeBiblist.length === 0)
      this.props.history.push("/records/biblist");
  }

  checkFormMode() {
    if (this.state.modeChange) return;

    let { getEditRecord } = this.props;

    if (
      getEditRecord &&
      getEditRecord.length > 0 &&
      window.location.href.indexOf("editRecord") > -1
    ) {
      this.setState({
        mode: "edit",
        buttonText: "ערוך רשומה",
        modeChange: true
      });
    }
  }

  onComboChange(e) {
    this.setState({
      selectValue: e.label,
      selectChanged: true
    });
    this.props.handleComboboxChange(e.id);
  }

  renderComobox() {
    let { combobox } = this.props;
    let defaultValue = this.props.defaultValue
      ? this.props.defaultValue.label
      : SELECT_PRINT_TYPE;
    let selectValue = this.state.selectChanged
      ? this.state.selectValue
      : defaultValue;
    if (combobox && combobox.type == "select") {
      return (
        <div class="selectDropdown">
          <Col>
            <Select
              aria-label={combobox.label}
              className="sourceTypeCombobox"
              options={combobox.options}
              onChange={e => this.onComboChange(e)}
              value={combobox.options.filter(
                option => option.label === selectValue
              )}
            />
          </Col>
          <br />
        </div>
      );
    }
  }

  formValidation(event) {
    event.preventDefault();
    const { activeBiblist } = this.props;
    if (activeBiblist && activeBiblist.length == 0) {
      this.setState({ showModal: true })
      return;
    }

    let inputElements = event.target.form.querySelectorAll(".form-group input");
    let isValid = true;
    inputElements.forEach(el => {
      if (el.value.trim() === "") isValid = false;
    });

    if (!isValid) {
      this.setState({ validationError: true });
      return;
    }

    this.props.onSubmitForm(event);
  }

  render() {
    return (
      <div id="apaPaperForm" className="apaForm">
        <div className="row">
          {this.state.validationError && (
            <Alert className="alert alert-danger">
              {this.state.validationErrorText}
            </Alert>
          )}

          <Form horizontal>
            {this.renderComobox()}

            {this.props.formFeilds.map((field, index) => {
              return (
                <FormGroup key={index} controlId={field.id}>
                  <ApaFormField field={field} />
                </FormGroup>
              );
            })}

            <Writers
              onWriterChange={name => this.props.onWriterNameChanged(name)}
            />

            <FormGroup className="pull-right">
              <Col>
                <button
                  style={{ fontWeight: "700" }}
                  className="left-10 btn"
                  onClick={event => this.formValidation(event)}
                  type="submit"
                >
                  {this.state.buttonText}
                </button>
              </Col>
            </FormGroup>
          </Form>
        </div>
        {this.checkFormMode()}
        {this.state.showModal && <AddOrChooseList onClose={() => this.setState({ showModal: false })} />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    getEditRecord: state.getEditRecord,
    activeBiblist: state.activeBiblist
  };
};

export default connect(mapStateToProps, { InsertRecordToDB })(withRouter(ApaForm));
