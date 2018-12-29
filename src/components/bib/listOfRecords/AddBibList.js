import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {InsertBibListToDB} from '../../../actions/ajax';
import ListOfBiblist from './ListOfBiblist';
import HeaderLogin from '../../header/HeaderLogin';
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
import { LinkContainer } from "react-router-bootstrap";

class AddBibList extends Component {

  constructor()
  {
    super();
  }

  addNewList(event)
  {
    let name = event.target.form.elements.newListFeild.value;
    let userid = 19;
    if(name.trim() == "")
    {
      alert("הכנס שם לרשימה")
    }
    else
    {
        this.props.InsertBibListToDB({userid, name})
    }
  }
 
  render() {
    return (
       <div className="App">
            <HeaderLogin />
            <br />
            <div className="row">
             <div className="col-md-2 col-md-offset-2">    
                  <ListOfBiblist showBibList="false" />           
              </div>
              <div className="col-md-6"> 
               <Form horizontal>               
                   <FormGroup>
                        <Col>
                          <FormControl className="addNewList" name="newListFeild" refs="newListFeild" placeholder="הוסף רשימה" type="text" />
                          <HelpBlock role="status" aria-live="polite"></HelpBlock>
                        </Col>
                  </FormGroup>
                  <LinkContainer to="/biblist" >
                      <button onClick={this.addNewList.bind(this)} >צור רשימה</button>
                  </LinkContainer> 
                </Form>
              </div>   
          </div>
      </div>
    );
  }
}


export default connect(null, {InsertBibListToDB})(AddBibList);

