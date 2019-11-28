import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getBibListNamesFromDB, getRecordsFromDB} from '../../../actions/ajax';
import {activeBiblist} from '../../../actions';
import { LinkContainer} from "react-router-bootstrap";
import { Redirect, withRouter } from 'react-router-dom';


class ListOfBiblist extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() 
  {
      this.props.getBibListNamesFromDB(this.props.userid);
  }

  onListClicked(item){
    this.props.activeBiblist(item);
    this.props.history.push("/records/biblist");
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
              <div className="col-sm-8">
                  <strong className="biblistHeading" aria-level="2" role="heading">הרשימות שלי</strong>
              </div>
              <div className="col-sm-2">
              <LinkContainer className="sideMenuLinks black"  to="/records/addNewList" >
                    <a aria-label="הוסף רשימה"><i className="fas fa-plus"></i></a>
                </LinkContainer>
              </div>
            </div>
            <ul className="list-no-style align-right padding-0" id="list-of-biblist">
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
                <LinkContainer className="sideMenuLinks black"  to="/records/addNewList" >
                    <a aria-label="הוסף רשימה"><i className="fas fa-plus"></i></a>
                </LinkContainer>
              </div>
            </div>
          </div>
       )
    } 

 }

  render() {
    return (
        <div class="well" id="recordsListContainer">
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
        userid: state.authReducer.userid
    }
}

export default 
  connect(mapStateToProps, 
          {
            getBibListNamesFromDB,
            getRecordsFromDB,
            activeBiblist
          })(withRouter(ListOfBiblist));

