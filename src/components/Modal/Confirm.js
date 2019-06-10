import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Button,
    Modal
} from 'react-bootstrap';

class Confirm extends Component  {

    constructor() 
    {
      super();
      this.state = {
        show: false
      }
    }

    componentWillReceiveProps(newProps){
        this.setState({
          show: newProps.show
        })
    }

    closeModal(){
      this.setState({
        show: false
      });
    }
  
    render() {
      return (
        <Modal className="confirmModal" size="sm" show={this.props.show}>
            <Modal.Header closeButton>
                <Modal.Title className="text-center"> {this.props.msg}</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
              <div className="text-center">
                <Button className="confirmBtn" size="lg" variant="primary" onClick={this.props.onConfirm}>
                    OK
                </Button>
                <Button className="confirmCancel" size="lg" variant="secondary" onClick={this.props.onHide}>
                    Cancel
                </Button>
              </div>
            </Modal.Footer>
        </Modal>        
      );
    }
}

export default connect(null, {})(Confirm);
