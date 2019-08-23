import React, {Component} from 'react';
import {connect} from 'react-redux';
import { LinkContainer } from "react-router-bootstrap";
import { DeleteBibList } from '../../../actions/ajax';
import { activeBiblist } from '../../../actions';
import Confirm from '../../Modal/Confirm';

class BiblistHeading extends Component {

  constructor(){
    super();
    this.state = {
        show: false
    }
  }   

  onDeleteList(){
    const {activeBiblistData} = this.props;
    this.props.DeleteBibList(activeBiblistData.Userid, activeBiblistData.id);
    this.setState({...this.state, show: false});
  }

  renderBibListTitle(){
    const {activeBiblistData} = this.props;
    if(activeBiblistData.Name){
        return <h2>ביבליוגרפיה של <strong>{activeBiblistData.Name}</strong></h2>    
    }
  } 

  renderConfigBtns(){
    const {activeBiblistData} = this.props;
    if(activeBiblistData.Name){
        return (
            <ul className="list-no-style list-inline" id="biblist-heading-list">
                <li aria-label="העתקת רשימה" title="העתקת רשימה"><i className="fas fa-copy"></i></li>
                <li aria-label="מחיקת רשימה" title="מחיקת רשימה" className="pointer" onClick={() => this.setState({...this.state, show: true})} >
                    <i className="fas fa-trash-alt"></i>
                </li>
                <li aria-label="עריכת הרשימה" title="עריכת הרשימה">
                    <LinkContainer className="pointer"  to="/records/editlist" >
                        <span><i className="fas fa-edit"></i></span>
                    </LinkContainer>
                </li>
                <li aria-label="ייצוא הרשימה" title="ייצוא הרשימה"><i className="fas fa-file-export"></i></li>
            </ul>
        )
    }
  }

  renderAddItemBtn(){
    const {activeBiblistData, addRecordBtn} = this.props;
    if(activeBiblistData.Name && addRecordBtn != "false"){
        return (
            <LinkContainer to="/records/addRecord" >
                <button className="btn pull-right" id="addRecordBtn"><i className="fas fa-plus"></i> הוספת פריט </button>
            </LinkContainer>
        )    
    }
  }

  render() {
    return (
       <div className="biblistHeading align-right">
           
            <div className="row">
                <div className="col-sm-5">
                    {
                        this.renderBibListTitle()
                    }
                </div>
                <div className="col-sm-5">
                    {
                        this.renderConfigBtns()
                    }
                </div>
            </div>  
            {
                this.renderAddItemBtn()
            }
            <Confirm onHide={() => this.setState({...this.state, show: false})} msg="האם ברצונך למחוק את כל הרשימה?" show={this.state.show} onConfirm={this.onDeleteList.bind(this)} /> 
      </div> 
    );
  }
}

const mapStateToProps = (state) => {
    return {
        activeBiblistData: state.activeBiblist,
        getBiblistNamesFromDB: state.getBiblistNamesFromDB
    }
}

export default connect(mapStateToProps, {DeleteBibList, activeBiblist})(BiblistHeading);

