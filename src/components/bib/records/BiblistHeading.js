import React, { Component } from "react";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { DeleteBibList, InsertBibListToDB } from "../../../actions/recordsActions";
import { withRouter } from 'react-router-dom';
import { activeBiblist, ShowUpgradeModal } from "../../../actions";
import { OverlayTrigger, Tooltip, Row, Col, Button } from "react-bootstrap";
import Confirm from "../../Modal/Confirm";
import Alert from "../../Modal/Alert";
import { CopyToClipboard } from '../services/clipboard';
import { He } from './texts';
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
import { base64Logo } from "./const";
import './BiblistHeading.scss';

const copyToClipboard = new CopyToClipboard();
const COPY_ICON = "fas fa-paste";
const CHECK_ICON = "fas fa-check";

class BiblistHeading extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      export: false,
      copyClass: COPY_ICON
    };
  }

  copy() {
    this.setState({ copyClass: CHECK_ICON });
    setTimeout(() => {
      this.setState({ copyClass: COPY_ICON });
    }, 3000);
  }

  onDeleteList() {
    const { activeBiblistData, getBiblistNamesFromDB } = this.props;
    if (getBiblistNamesFromDB && getBiblistNamesFromDB.length > 1) {
      this.props.DeleteBibList(activeBiblistData.userid, activeBiblistData.id);
      this.props.activeBiblist(getBiblistNamesFromDB[0].id);
    }
    this.setState({ ...this.state, show: false });
  }

  renderBibListTitle() {
    const { activeBiblistData, getBiblistNamesFromDB } = this.props;
    if (activeBiblistData && activeBiblistData.Name) {
      return (
        <h1>
          ביבליוגרפיה של <strong>{activeBiblistData.Name}</strong>
        </h1>
      );
    }
    else if (getBiblistNamesFromDB && getBiblistNamesFromDB.length === 1) {
      return (
        <h1>
          ביבליוגרפיה של <strong>{getBiblistNamesFromDB[0].Name}</strong>
        </h1>
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
      saveAs(blob, "bibli.docx");
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
            placement="top"
            overlay={<Tooltip>העתקת פריטים ביבליוגרפים</Tooltip>}
          >
            <li
              role="button"
              tabIndex="0"
              aria-label="העתקת פריטים ביבליוגרפים"
              onClick={() => {
                copyToClipboard.bulk(".recordQuery");
                this.copy();
              }}
              onKeyDown={(e) => {
                const keyCode = e.keyCode || e.which;
                if (keyCode === 13) {
                  copyToClipboard.bulk(".recordQuery");
                  this.copy();
                }
              }}
            >
              <i aria-hidden="true" className={`${this.state.copyClass} hover-orange`}></i>
            </li>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>מחיקת עבודה</Tooltip>}
          >
            <li
              role="button"
              tabIndex="0"
              aria-label="מחיקת עבודה"
              onClick={() => this.setState({ ...this.state, show: true })}
              onKeyDown={(e) => {
                const keyCode = e.keyCode || e.which;
                if (keyCode === 13) {
                  this.setState({ ...this.state, show: true })
                }
              }}
            >
              <i aria-hidden="true" className="fas fa-trash-alt hover-orange"></i>
            </li>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>עריכת שם העבודה</Tooltip>}
          >
            <li>
              <LinkContainer className="pointer" to="/records/editlist">
                <a
                  aria-label="עריכת שם העבודה"
                  onKeyDown={(e) => {
                    const keyCode = e.keyCode || e.which;
                    if (keyCode === 13) {
                      this.props.history.push("/records/editlist");
                    }
                  }}
                >
                  <i aria-hidden="true" className="fas fa-edit hover-orange"></i>
                </a>
              </LinkContainer>
            </li>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>ייצוא רשימה - בקרוב</Tooltip>}
          >
            <li
              role="button"
              aria-label="ייצוא הרשימה"
              className="notApplicable"
            >
              <i aria-hidden="true" className="fas fa-file-export"></i>
            </li>
          </OverlayTrigger>
        </ul>
      );
    }
  }

  renderAddItemBtn() {
    const { activeBiblistData, addRecordBtn, userPackage, records } = this.props;
    const userNotPermited = userPackage === "free" && records.length > 6;
    if (activeBiblistData.Name && addRecordBtn != "false") {
      return (
        <>
          {
            userNotPermited
              ?
              <OverlayTrigger placement="top" overlay={<Tooltip>הינך בחבילה בסיסית עד 7 פריטים. שדרג עכשיו</Tooltip>}>
                <span>
                  <Button
                    onClick={() => this.props.ShowUpgradeModal(true)}
                    id="addRecordBtn" style={{ backgroundColor: '#dc8726' }}>
                    <i aria-hidden="true" className="fas fa-plus"></i>
                    שידרוג חבילה
                  </Button>
                </span>
              </OverlayTrigger>
              :
              <LinkContainer to={`/records/addRecord/ApaBooks`}>
                <Button className="btn pull-right" id="addRecordBtn">
                  <i aria-hidden="true" className="fas fa-plus"></i>
                  הוספת פריט
              </Button>
              </LinkContainer>
          }
        </>

      );
    }
  }

  render() {

    const { getBiblistNamesFromDB } = this.props;
    return (
      <div className="biblistHeading align-right">
        <Row>
          <Col sm={6} md={6} lg={6}>{this.renderBibListTitle()}</Col>
          <Col sm={6} md={6} lg={6}>
            {this.renderConfigBtns()}
          </Col>
        </Row>
        {this.renderAddItemBtn()}
        {getBiblistNamesFromDB && getBiblistNamesFromDB.length > 1 ?
          <Confirm
            onHide={() => this.setState({ ...this.state, show: false })}
            msg={He.DELETE_CONFIRM_MSG}
            show={this.state.show}
            onConfirm={this.onDeleteList.bind(this)}
          />
          :
          <Alert
            onHide={() => this.setState({ ...this.state, show: false })}
            msg={He.DELETE_ALERT_MSG}
            show={this.state.show}
          />
        }

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeBiblistData: state.activeBiblist,
    getBiblistNamesFromDB: state.getBiblistNamesFromDB,
    exportData: state.recordsDataForExport,
    userPackage: state.userPackage,
    records: state.getBiblistFromDB
  };
};

export default connect(mapStateToProps, { DeleteBibList, activeBiblist, InsertBibListToDB, ShowUpgradeModal })(withRouter(
  BiblistHeading
));