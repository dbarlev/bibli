import React, {Component} from 'react';
import {connect} from 'react-redux';
import RedirectTo from '../../RedirectTo';
import {InsertBibListToDB} from '../../../actions/ajax';
import {activeBiblist} from '../../../actions';
import ListOfBiblist from './ListOfBiblist';
import HeaderLogin from '../../header/HeaderLogin';
import {
  Form,
  FormGroup,
  FormControl,
  Col
} from 'react-bootstrap';


class AddBibList extends Component {

  constructor(){
    super();
    this.state = {
      userid: localStorage.userid,
      redirect: false,
      redirectTo: "/biblist"
    }
  }

  addNewList(event)
  {
    event.preventDefault();
    let name = event.target.form.elements.newListFeild.value;
    let userid = this.state.userid;
    if(name.trim() == "")
    {
      alert("הכנס שם לרשימה")
    }
    else
    {
        this.props.InsertBibListToDB({userid, name});
        this.setState({
          ...this.state,
          redirect: true
        });
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
              <div className="col-md-3 col-sm-6"> 
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
                <RedirectTo redirect={this.state.redirect} to={this.state.redirectTo} />
              </div>   
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      activeBiblistData: state.activeBiblist
  }
}


export default connect(mapStateToProps, {InsertBibListToDB, activeBiblist})(AddBibList);

