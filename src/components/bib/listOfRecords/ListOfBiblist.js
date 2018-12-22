import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {getBibListFromDB} from '../../../actions/ajax';
import { LinkContainer, IndexLinkContainer  } from "react-router-bootstrap";
import {Nav, Navbar, NavItem, MenuItem, NavDropdown, Button, FormGroup, FormControl } from 'react-bootstrap';

class ListOfBiblist extends Component {

 constructor()
 {
    super();
    
 }
  
  componentWillMount() 
  {
      this.props.getBibListFromDB(19);
  }

 showList()
 {

     let {allBiblist} = this.props;

     if(allBiblist && allBiblist.length > 0)
     {
       return(
          <div className="well">
            <div className="row">
              <div className="col-sm-7">
                  <strong aria-level="2" role="heading">הרשימות שלי</strong>
              </div>
              <div className="col-sm-2">
                <LinkContainer className="sideMenuLinks black"  to="/addNewList" >
                    <span aria-label="הוסף רשימה"><i className="fas fa-plus"></i></span>
                </LinkContainer>
              </div>
               <div className="col-sm-2">
               <LinkContainer className="sideMenuLinks black"  to="/addNewList" >
                    <span><i className="fas fa-search"></i></span>
                </LinkContainer>
              </div>
            </div>
            <ul>
              {
                allBiblist.map((item,index) => {
                    return(
                        <li key={index}><a to="/">{item.Name}</a></li>
                    )
                })
              }
              </ul>
              
          </div>
       )
    }
    else
    {
      return(
          <div className="well">
            <div className="row">
              <div className="col-sm-7">
                  <strong aria-level="2" role="heading">הרשימות שלי</strong>
              </div>
              <div className="col-sm-2">
                <LinkContainer className="sideMenuLinks black"  to="/addNewList" >
                    <span aria-label="הוסף רשימה"><i className="fas fa-plus"></i></span>
                </LinkContainer>
              </div>
               <div className="col-sm-2">
               <LinkContainer className="sideMenuLinks black"  to="/addNewList" >
                    <span><i className="fas fa-search"></i></span>
                </LinkContainer>
              </div>
            </div>
          </div>
       )
    } 

 }

  render() {
    

    return (
        <div id="recordsListContainer">
          {
            this.showList()
          }
           
       </div>
    );
  }
}


const mapStateToProps = (state) => {
    return {
        allBiblist: state.getBiblistFromDB.value,
    }
}

export default connect(mapStateToProps, {getBibListFromDB})(ListOfBiblist);

