import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {getBibListNamesFromDB, getRecordsFromDB} from '../../../actions/ajax';
import {activeBiblist} from '../../../actions';
import { LinkContainer, IndexLinkContainer  } from "react-router-bootstrap";
import {Nav, Navbar, NavItem, MenuItem, NavDropdown, Button, FormGroup, FormControl } from 'react-bootstrap';


class ListOfBiblist extends Component {

 constructor()
 {
    super();
    this.state = {
      allBiblist: []
    }
    
 }
  
  componentDidMount() 
  {
      this.props.getBibListNamesFromDB(19);
  }


  componentWillReceiveProps(nextProps) 
  {
    let allBiblist = this.state.allBiblist;
    allBiblist = nextProps.allBiblist;

    this.setState({
      allBiblist: allBiblist
    })
  }

  onListClicked(item){
    let userid = 19;
    this.props.activeBiblist(item);
    this.props.getRecordsFromDB(userid, item.id, item.Name);
  }

 showList()
 {

     let {allBiblist} = this.state;
     let uniqueListId = [];

     if(allBiblist && allBiblist.length > 0)
     {
       return(
          <div className="well">
            <div className="row">
              <div className="col-sm-7">
                  <strong aria-level="2" role="heading">הרשימות שלי</strong>
              </div>
              <div className="col-sm-2">
                <LinkContainer className="pointer sideMenuLinks black"  to="/addNewList" >
                    <span aria-label="הוסף רשימה"><i className="fas fa-plus"></i></span>
                </LinkContainer>
              </div>
               <div className="col-sm-2">
               <LinkContainer className="pointer sideMenuLinks black"  to="/addNewList" >
                    <span><i className="fas fa-search"></i></span>
                </LinkContainer>
              </div>
            </div>
            <ul>
              {
                allBiblist.map((item,index) => {
                    if(uniqueListId.indexOf(item.Name) == -1)
                    {
                      uniqueListId.push(item.Name);
                      return(
                        <li key={index}>
                          {/* <LinkContainer className="pointer sideMenuLinks black" to={{ pathname: `/biblist/${item.id}`, id: item.id }}>
                            <span>{item.Name}</span>
                          </LinkContainer> */}
                          <div className="pointer sideMenuLinks black" onClick={this.onListClicked.bind(this,item)}>
                            <span>{item.Name}</span>
                          </div>
                        </li>
                      )
                    }
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
        allBiblist: state.getBiblistNamesFromDB,
    }
}

export default connect(mapStateToProps, {getBibListNamesFromDB, getRecordsFromDB, activeBiblist})(ListOfBiblist);

