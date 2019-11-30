import React, { Component } from "react";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { DeleteBibList } from "../../../actions/ajax";
import { activeBiblist } from "../../../actions";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Confirm from "../../Modal/Confirm";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  HeadingLevel,
  Header,
  Media
} from "docx";
import { saveAs } from "file-saver";
import * as fs from "fs";

import { base64Logo } from "./const";

class BiblistHeading extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      export: false
    };
  }

  onDeleteList() {
    const { activeBiblistData } = this.props;
    this.props.DeleteBibList(activeBiblistData.Userid, activeBiblistData.id);
    this.setState({ ...this.state, show: false });
  }

  renderBibListTitle() {
    const { activeBiblistData } = this.props;
    if (activeBiblistData.Name) {
      return (
        <h2>
          ביבליוגרפיה של <strong>{activeBiblistData.Name}</strong>
        </h2>
      );
    }
  }

  exportDocx() {
    const doc = new Document();
    let listOfElements = document.querySelectorAll(".recordQuery");
    let allrecordsTexts = [];
    let heading = new Paragraph({
      text: "ביבליוגרפיה",
      heading: HeadingLevel.HEADING_1,
      spacing: {
        after: 400
      },
      alignment: AlignmentType.RIGHT
    });
    let listName = new Paragraph({
      text: this.props.activeBiblistData.Name,
      heading: HeadingLevel.HEADING_2,
      spacing: {
        after: 400
      },
      bidirectional: true,
      alignment: AlignmentType.LEFT
    });
    let logo = Media.addImage(doc, base64Logo, 150, 50);
    let paragraphs = [heading, listName];
    if (listOfElements.length == 0) return;

    listOfElements.forEach(record => {
      allrecordsTexts.push(record.textContent);
    });

    allrecordsTexts.sort();

    allrecordsTexts.forEach(text => {
      let lang = this.checkLanguage(text);
      let paragraph = new Paragraph({
        children: [new TextRun(text)],
        spacing: {
          after: 400
        },
        alignment: AlignmentType.LEFT,
        bidirectional: lang === "he"
      });
      paragraphs.push(paragraph);
    });

    doc.addSection({
      properties: {},
      headers: {
        default: new Header({
          children: [new Paragraph(logo)]
        })
      },
      children: paragraphs
    });

    Packer.toBlob(doc).then(blob => {
      console.log(blob);
      saveAs(blob, "bibli.docx");
      console.log("Document created successfully");
    });
  }

  checkLanguage(text) {
    var lang = "he";
    if (/^[a-zA-Z]+$/.test(text[0])) {
      lang = "en";
    }
    return lang;
  }

  renderConfigBtns() {
    const { activeBiblistData } = this.props;
    if (activeBiblistData.Name) {
      return (
        <ul className="list-no-style list-inline" id="biblist-heading-list">
          <OverlayTrigger
            overlay={
              <Tooltip id="tooltip-disabled">העתקת רשימה - בקרוב</Tooltip>
            }
          >
            <li
              role="button"
              tabIndex="0"
              aria-label="העתקת רשימה"
              className="cursor-normal"
            >
              <i className="fas fa-copy" style={{ color: "lightGray" }}></i>
            </li>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>מחיקת רשימה</Tooltip>}
          >
            <li
              role="button"
              tabIndex="0"
              aria-label="מחיקת רשימה"
              onClick={() => this.setState({ ...this.state, show: true })}
            >
              <i className="fas fa-trash-alt hover-orange"></i>
            </li>
          </OverlayTrigger>
              <OverlayTrigger placement="top" overlay={<Tooltip>עריכת הרשימה</Tooltip>}>
                  <li
                      role="link"
                      tabIndex="0"
                      aria-label="עריכת הרשימה"
                  >
                      <LinkContainer className="pointer" to="/records/editlist">
                          <a>
                              <i className="fas fa-edit hover-orange"></i>
                          </a>
                      </LinkContainer>
                  </li>
          </OverlayTrigger>
              <OverlayTrigger placement="top" overlay={<Tooltip>ייצוא הרשימה</Tooltip>}>
                  <li
                      role="button"
                      tabIndex="0"
                      onClick={() => this.exportDocx()}
                      aria-label="ייצוא הרשימה"
                  >
                      <i className="fas fa-file-export hover-orange"></i>
                  </li>
          </OverlayTrigger>
        </ul>
      );
    }
  }

  renderAddItemBtn() {
    const { activeBiblistData, addRecordBtn } = this.props;
    if (activeBiblistData.Name && addRecordBtn != "false") {
      return (
        <LinkContainer to="/records/addRecord/ApaBooks">
          <button className="btn pull-right" id="addRecordBtn">
            <i className="fas fa-plus"></i> הוספת פריט{" "}
          </button>
        </LinkContainer>
      );
    }
  }

  render() {
    return (
      <div className="biblistHeading align-right">
        <div className="row">
          <div className="col-sm-5">{this.renderBibListTitle()}</div>
          <div className="col-sm-5">{this.renderConfigBtns()}</div>
        </div>
        {this.renderAddItemBtn()}
        <Confirm
          onHide={() => this.setState({ ...this.state, show: false })}
          msg="האם ברצונך למחוק את כל הרשימה?"
          show={this.state.show}
          onConfirm={this.onDeleteList.bind(this)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeBiblistData: state.activeBiblist,
    getBiblistNamesFromDB: state.getBiblistNamesFromDB,
    exportData: state.recordsDataForExport
  };
};

export default connect(mapStateToProps, { DeleteBibList, activeBiblist })(
  BiblistHeading
);
