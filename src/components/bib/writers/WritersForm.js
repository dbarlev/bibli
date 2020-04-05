import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FormGroup,
  FormControl,
  Col,
  HelpBlock,
  Row,
  Tooltip,
  OverlayTrigger
} from 'react-bootstrap';
import './WritersForm.scss';


class WritersForm extends Component {

  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      writerID: "",
      modeChanged: false
    }
  }

  checkFormMode() {
    let name = this.props.name;

    if (name.firstName === "" || name.lastName === "" || name.writerID === "")
      return;

    if (this.state.modeChanged)
      return;



    if (window.location.href.indexOf("editRecord") > -1) {
      this.setState({
        modeChanged: true
      });
      this.firstNameChange(name.firstName);
      this.lastNameChange(name.lastName);
    }
  }

  firstNameChange(value) {
    this.setState({
      firstName: value,
      writerID: "writerName" + this.props.index
    }, () => {
      this.props.onWriterChange(this.state);
    });
  }

  lastNameChange(value) {
    this.setState({
      lastName: value,
      writerID: "writerName" + this.props.index
    }, () => {
      this.props.onWriterChange(this.state);
    });
  }

  removeWriter(event) {
    this.props.onRemoveWriter();
  }

  render() {
    return (
      <div id="writersForm">
        <Row>
          <Col md={5} lg={5} xs={4} className="col">
            <FormGroup controlId={"firstName" + this.props.index}>
              <FormControl aria-label="שם פרטי" placeholder="שם פרטי" value={this.state.firstName} onChange={(event) => this.firstNameChange(event.target.value)} ref="editorPrivateName" type="text" />
              <HelpBlock role="status" aria-live="polite"></HelpBlock>
            </FormGroup>
          </Col>
          <Col md={5} lg={5} xs={5}>
            <FormGroup controlId={"lastName" + this.props.index}>
              <FormControl aria-label="שם משפחה" placeholder="שם משפחה" onChange={(event) => this.lastNameChange(event.target.value)} value={this.state.lastName} ref="editorLastName" type="text" />
              <HelpBlock role="status" aria-live="polite"></HelpBlock>
            </FormGroup>
          </Col>
          {
            this.props.writerLength > 1 &&
            <Col md={1} lg={1} xs={1} className="btnCol">
              <OverlayTrigger placement="top" overlay={<Tooltip>מחק מחבר</Tooltip>}>
                <span tabindex="0"
                  onKeyDown={(e) => { if ((e.keyCode || e.which) === 13) this.props.onRemoveWriter() }}
                  onClick={() => this.props.onRemoveWriter()}
                  aria-label="מחק מחבר"
                  role="button"
                >
                  <i class="far fa-trash-alt"></i></span>
              </OverlayTrigger>
            </Col>
          }
          {
            this.props.addMoreButton && (
              <Col md={1} lg={1} xs={1} className="btnCol">
                <OverlayTrigger placement="top" overlay={<Tooltip>הוסף מחבר</Tooltip>}>
                  <span tabindex="0"
                    onKeyDown={(e) => { if ((e.keyCode || e.which) === 13) this.props.onAddMoreWriter() }}
                    onClick={() => this.props.onAddMoreWriter()}
                    aria-label="הוסף מחבר"
                    role="button"
                  >
                    <i class="fas fa-plus"></i></span>
                </OverlayTrigger>
              </Col>
            )
          }


        </Row>
        {
          this.checkFormMode()
        }
      </div >

    );
  }
}

const mapStateToProps = (state) => {
  return {
    getEditRecord: state.getEditRecord
  }
}

export default connect(mapStateToProps)(WritersForm);
