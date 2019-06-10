import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getBibListNamesFromDB, getRecordsFromDB} from '../../../actions/ajax';
import {activeBiblist} from '../../../actions';
import { LinkContainer} from "react-router-bootstrap";
import { Redirect } from 'react-router-dom'


class ListOfBiblist extends Component {


  constructor(){
    super();
    this.state = {
      redirect: false,
      redirectTo: "/"
    }
  }

  componentDidMount() 
  {
      console.log("listOfBiblist component is called!")
      this.props.getBibListNamesFromDB(this.props.userid);
  }

  onListClicked(item){
    this.props.activeBiblist(item);
    //this.props.getRecordsFromDB(this.state.userid, item.id, item.Name);
    this.setState({
      ...this.state,
      redirect: true,
      redirectTo: "/biblist"
    })
  }

 showList()
 {

     let {allBiblist} = this.props;
     let uniqueListId = [];

     if(allBiblist && allBiblist.length > 0)
     {
       return(
          <div>
            <div className="row">
              <div className="col-sm-6">
                  <strong className="biblistHeading" aria-level="2" role="heading">הרשימות שלי</strong>
              </div>
              <div className="col-sm-2">
                <LinkContainer className="pointer sideMenuLinks"  to="/addNewList" >
                    <span aria-label="הוסף רשימה"><i className="fas fa-plus"></i></span>
                </LinkContainer>
              </div>
               <div className="col-sm-2">
               <LinkContainer className="pointer sideMenuLinks"  to="/addNewList" >
                    <span><i className="fas fa-pen"></i></span>
                </LinkContainer>
              </div>
            </div>
            <ul className="list-no-style align-right padding-0">
              {
                this.props.allBiblist.map((item,index) => {
                    if(uniqueListId.indexOf(item.Name) == -1)
                    {
                      uniqueListId.push(item.Name);
                      return(
                        <li key={index}>
                          <div className="pointer sideMenuLinks" onClick={this.onListClicked.bind(this,item)}>
                            <span className="black">{item.Name}</span>
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
          <div>
            <div className="row">
              <div className="col-sm-7">
                  <strong className="biblistHeading" aria-level="2" role="heading">הרשימות שלי</strong>
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

  redirectTo(){
      let {redirect, redirectTo} = this.state;
      if(redirect)
        return <Redirect to={redirectTo} />
  }

  render() {
    return (
        <div class="well" id="recordsListContainer">
          {
            this.showList()
          }
          {
            this.redirectTo()
          }
       </div>
    );
  }
}


const mapStateToProps = (state) => {
    return {
        allBiblist: state.getBiblistNamesFromDB,
        userid: state.authReducer.userid
    }
}

export default connect(mapStateToProps, {getBibListNamesFromDB, getRecordsFromDB, activeBiblist})(ListOfBiblist);

