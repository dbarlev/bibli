import React, {Component} from 'react';
import {connect} from 'react-redux';
import { LinkContainer } from "react-router-bootstrap";
import { DeleteBibList } from '../../../actions/ajax';
import { activeBiblist } from '../../../actions';
import Confirm from '../../Modal/Confirm';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import * as fs from 'fs';


class BiblistHeading extends Component {

  constructor(){
    super();
    this.state = {
        show: false,
        export: false
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
  
  exportDocx(){
    const doc = new Document();
    let HeRecordElements = document.querySelectorAll(".recordQuery.he");
    let EnRecordElements = document.querySelectorAll(".recordQuery.en");
    let allrecords = [];
    if(HeRecordElements.length == 0 && EnRecordElements.length == 0)
        return;

    EnRecordElements.forEach((record) => {
        
        let text = new Paragraph({
            children: [
                new TextRun(record.textContent),
            ],
            spacing: {
                before: 200,
            }
        });
        allrecords.push(text);
    });

    HeRecordElements.forEach((record) => {
        
        let text = new Paragraph({
            children: [
                new TextRun(record.textContent),
            ],
            spacing: {
                before: 200,
            }
        });
        allrecords.push(text);
    });
    
    doc.addSection({
        properties: {},
        children: allrecords,
    });

    Packer.toBlob(doc).then(blob => {
        console.log(blob);
        saveAs(blob, "bibli.docx");
        console.log("Document created successfully");
    });
  }

  renderConfigBtns(){
    const {activeBiblistData} = this.props;
    if(activeBiblistData.Name){
        return (
            <ul className="list-no-style list-inline" id="biblist-heading-list">
                <li role="button" tabIndex="0" aria-label="העתקת רשימה" title="העתקת רשימה"><i className="fas fa-copy"></i></li>
                <li role="button" tabIndex="0"  aria-label="מחיקת רשימה" title="מחיקת רשימה" className="pointer" onClick={() => this.setState({...this.state, show: true})} >
                    <i className="fas fa-trash-alt"></i>
                </li>
                <li role="link" tabIndex="0"  aria-label="עריכת הרשימה" title="עריכת הרשימה">
                    <LinkContainer className="pointer"  to="/records/editlist" >
                        <a><i className="fas fa-edit"></i></a>
                    </LinkContainer>
                </li>
                <li role="button" tabIndex="0"  onClick={() => this.exportDocx()} aria-label="ייצוא הרשימה" title="ייצוא הרשימה"><i className="fas fa-file-export"></i></li>
                
            </ul>
        )
    }
  }

  renderAddItemBtn(){
    const {activeBiblistData, addRecordBtn} = this.props;
    if(activeBiblistData.Name && addRecordBtn != "false"){
        return (
            <LinkContainer to="/records/addRecord/ApaBooks" >
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
        getBiblistNamesFromDB: state.getBiblistNamesFromDB,
        exportData: state.recordsDataForExport
    }
}

export default connect(mapStateToProps, {DeleteBibList, activeBiblist})(BiblistHeading);

