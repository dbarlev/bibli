import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Modal
} from 'react-bootstrap';

class Confirm extends Component {

  constructor() {
    super();
    this.state = {
      show: false
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      show: newProps.show
    })
  }

  closeModal() {
    this.setState({
      show: false
    });
  }

  render() {
    return (
      <Modal keyboard="true" className="confirmModal" onHide={this.props.onHide} size="sm" show={this.props.show}>
        <Modal.Header>
          <h2 className="text-center"> {this.props.msg}</h2>
        </Modal.Header>
        <Modal.Footer>
          <div className="text-center">
            <Button className="confirmCancel" size="lg" variant="secondary" onClick={this.props.onHide}>
              ביטול
            </Button>
            <Button className="confirmBtn" size="lg" variant="primary" onClick={this.props.onConfirm}>
              אישור
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(null, {})(Confirm);
