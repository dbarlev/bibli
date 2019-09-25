import React, {Component} from 'react';
import {connect} from 'react-redux';
import RedirectTo from '../../RedirectTo';
import {EditBiblistName} from '../../../actions/ajax';
import Alert from '../../Modal/Alert';
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
      redirect: false,
      redirectTo: "/records/biblist",
      inputValue: "",
      show: false
    }
  }

  onEditBiblist(event){
    event.preventDefault();

    let name = event.target.form.elements.editListName.value;
    let userID = this.props.userid;
    let biblistID = this.props.activeBiblistData.id;
    if(name.trim() == "")
    {
      //alert("שם של רשימה לא יכול להיות ריק");
      this.setState({
        ...this.state,
        show: true
      });
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
    let modalClose = () => this.setState({ ...this.state, show: false });

    return (
       <div className="App">
            <br />
            <div className="row">
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
          <Alert onHide={modalClose} msg="השדה הוא שדה חובה!" title="שגיאה במילוי הטופס" show={this.state.show}/>
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


export default connect(mapStateToProps, {EditBiblistName})(EditBiblist);

