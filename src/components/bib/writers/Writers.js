import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  Col,
  Checkbox,
  ControlLabel,
  HelpBlock
} from 'react-bootstrap';
import WritersForm from "./WritersForm";



class Writers extends Component {

  constructor()
  {
    super();
    this.state = {
      writers: ["field"]
    }
  }

  createWriterFeilds(name,index)
  {
        return <WritersForm key={index} name={name} onRemoveWriter={this.removeWriter.bind(this)} onWriterChange={this.getWritersNames.bind(this)}/>      
  }

  addWriter()
  {
    var writers = this.state.writers;
    let name = "field" + (writers.length + 1);
    writers.push(name);
    this.setState({ writers: writers });
  }

  getWritersNames(name)
  {
    this.props.onWriterChange({key: name.key, elementID: name.elementID, "data": name.data});  
  }

  // not finished, currently it's remove the writer, should be given a name to delete.
  removeWriter()
  {
      var writers = this.state.writers;
      writers.pop()
      this.setState({ writers: writers });
  }

  render() {
    return (
      <div id="writersFeilds" className="well">    
          {
            this.state.writers.map((name,index) => this.createWriterFeilds(name,index))   
          }
          <FormGroup>
            <Col >
              <Button onClick={this.addWriter.bind(this)} >הוסף מחבר</Button>
            </Col>
          </FormGroup>
      </div>

    );
  }
}



export default Writers;

