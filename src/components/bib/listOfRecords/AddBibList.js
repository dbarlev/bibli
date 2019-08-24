import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {InsertBibListToDB} from '../../../actions/ajax';
import {activeBiblist} from '../../../actions';
import {
  Form,
  FormGroup,
  FormControl,
  Col
} from 'react-bootstrap';


class AddBibList extends Component {

  constructor(){
    super();
  }

  addNewList(event)
  {
    event.preventDefault();
    let name = event.target.form.elements.newListFeild.value;
    let userid = this.props.userid;
    if(name.trim() == "")
    {
      alert("הכנס שם לרשימה")
    }
    else
    {
        this.props.InsertBibListToDB({userid, name});
        this.props.history.push("/records/biblist");
    }
  }


  render() {
    return (
      <div className="addNewList">
          <h2>הוספת רשימה חדשה</h2>
          <br />
            <Form horizontal>               
                <FormGroup>
                    <Col>
                      <FormControl className="addNewList" name="newListFeild" refs="newListFeild" aria-label="שרם הרשימה" placeholder="שם הרשימה" type="text" />
                    </Col>
              </FormGroup>
                  <button className="btn pull-right" onClick={this.addNewList.bind(this)} >צור רשימה</button>
            </Form>
      </div>   
    );
  }
}

const mapStateToProps = (state) => {
  return {
      activeBiblistData: state.activeBiblist,
      userid: state.authReducer.userid
  }
}


export default connect(mapStateToProps, {InsertBibListToDB, activeBiblist})(withRouter(AddBibList));

