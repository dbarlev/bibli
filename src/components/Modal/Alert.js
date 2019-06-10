import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Button,
    Modal
} from 'react-bootstrap';

class Alert extends Component  {

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
        <Modal className="alertModal" size="sm" show={this.props.show}>
            <Modal.Header closeButton closeLabel>
                <Modal.Title className="text-center">{this.props.msg}</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
              <div className="text-center">
                <Button size="lg" variant="primary" onClick={this.props.onHide}>
                    סגור
                </Button>
              </div>
            </Modal.Footer>
        </Modal>        
      );
    }
}

export default connect(null, {})(Alert);
