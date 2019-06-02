import React, {Component} from 'react';
import {connect} from 'react-redux';
import RedirectTo from '../../RedirectTo';
import {EditBiblistName} from '../../../actions/ajax';
import ListOfBiblist from './ListOfBiblist';
import HeaderLogin from '../../header/HeaderLogin';
import {
  Form,
  FormGroup,
  FormControl,
  Col
} from 'react-bootstrap';


class EditBiblist extends Component {

  constructor(){
    super();
    this.state = {
      userid: localStorage.userid,
      redirect: false,
      redirectTo: "/biblist",
      inputValue: ""
    }
  }

  onEditBiblist(event){
    event.preventDefault();

    let name = event.target.form.elements.editListName.value;
    let userID = this.state.userid;
    let biblistID = this.props.activeBiblistData.id;
    if(name.trim() == "")
    {
      alert("שם של רשימה לא יכול להיות ריק");
    }
    else
    {
      this.props.EditBiblistName(userID, biblistID, name);
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
              <h2>עריכת רשימה</h2>
              <br />
               <Form horizontal>               
                   <FormGroup>
                        <Col>
                          <FormControl defaultValue={this.props.activeBiblistData.Name} className="editListName" name="editListName" refs="editListName" aria-label="עריכת רשימה" type="text" />
                        </Col>
                  </FormGroup>
                      <button className="btn pull-right" onClick={this.onEditBiblist.bind(this)} >צור רשימה</button>
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


export default connect(mapStateToProps, {EditBiblistName})(EditBiblist);

