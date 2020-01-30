import React, { Component } from "react";
import { connect } from "react-redux";
import { DeleteRecordFromUser } from "../../../actions/ajax";
import { exportRecordData } from "../../../actions";
import Confirm from "../../Modal/Confirm";
import { Redirect, withRouter } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { CopyToClipboard } from '../services/clipboard';
import './BiblistItem.scss';
const copyToClipboard = new CopyToClipboard();
const COPY_ICON = "fas fa-paste";
const CHECK_ICON = "fas fa-check";

class BibListItem extends Component {
  constructor() {
    super();
    this.state = {
      record: "",
      allRecords: [],
      permission: false,
      show: false,
      copyClass: COPY_ICON
    };
  }

  copy() {
    this.setState({ copyClass: CHECK_ICON });
    setTimeout(() => {
      this.setState({ copyClass: COPY_ICON });
    }, 3000);
  }

  componentDidMount() {
    this.setState({ permission: true });
  }

  getRecord() {
    if (!this.state.permission) return;

    let apa = "";
    switch (this.props.type) {
      case "book":
        apa = this.populateBook();
        break;
      case "article":
        apa = this.populateArticle();
        break;
      case "paper":
        apa = this.populatePaper();
        break;
      case "website":
        apa = this.populateWebsite();
        break;
    }
    return apa;
  }

  populateBook() {
    let data = this.props.record;
    return (
      <div>
        <span>{this.verifyLangAndCapitalize(this.verifyLangAndCapitalize(data.writers))}</span>
        <span>({data.year}). </span>
        <span style={{ fontWeight: "bold" }}>
          {this.verifyLangAndCapitalize(data.name)}
        </span>
        <span>. </span>
        <span>{this.verifyLangAndCapitalize(data.location)}: </span>
        <span>{this.verifyLangAndCapitalize(data.publisherName)}</span>
        <span>.</span>
      </div>
    );
  }

  populateArticle() {
    let data = this.props.record;
    let preUrlSeperator = data.lang === "en" ? "from" : "מ";
    if (data.url != null && data.url.trim() != "") {
      return (
        <div>
          <span>{this.verifyLangAndCapitalize(this.verifyLangAndCapitalize(data.writers))}</span>
          <span>({data.year}). </span>
          <span style={{ fontWeight: "bold" }}>
            {this.verifyLangAndCapitalize(data.articleHeadline)}
          </span>
          <span>. </span>
          <span>{this.verifyLangAndCapitalize(data.name)}, </span>
          <span>{data.kereh}, </span>
          <span>{data.pages}. </span>
          <span>{data.date} </span>
          <span>{`${preUrlSeperator} ${data.url}`}. </span>
        </div>
      );
    } else {
      return (
        <div>
          <span>{this.verifyLangAndCapitalize(this.verifyLangAndCapitalize(data.writers))}</span>
          <span>({data.year}). </span>
          <span style={{ fontWeight: "bold" }}>
            {this.verifyLangAndCapitalize(data.articleHeadline)}
          </span>
          <span>. </span>
          <span>{this.verifyLangAndCapitalize(data.name)}, </span>
          <span>{data.kereh}, </span>
          <span>{data.pages}.</span>
        </div>
      );
    }
  }

  populatePaper() {
    let data = this.props.record;
    let preUrlSeperator = data.lang === "en" ? "from" : "מ";
    if (data.url != null && data.url.trim() != "") {
      return (
        <div>
          <span>{this.verifyLangAndCapitalize(this.verifyLangAndCapitalize(data.writers))}</span>
          <span>({data.year}). </span>
          <span style={{ fontWeight: "bold" }}>
            {this.verifyLangAndCapitalize(data.articleHeadline)}
          </span>
          <span>. </span>
          <span>{this.verifyLangAndCapitalize(data.name)}, </span>
          <span style={{ fontWeight: "bold" }}>{data.pages}. </span>
          <span>{data.date} </span>
          <span>{`${preUrlSeperator} ${data.url}`}. </span>
        </div>
      );
    } else {
      return (
        <div>
          <span>{this.verifyLangAndCapitalize(this.verifyLangAndCapitalize(data.writers))}</span>
          <span>({data.year}). </span>
          <span style={{ fontWeight: "bold" }}>
            {this.verifyLangAndCapitalize(data.articleHeadline)}
          </span>
          <span>. {this.verifyLangAndCapitalize(data.name)}, </span>
          <span style={{ fontWeight: "bold" }}>{data.pages}.</span>
        </div>
      );
    }
  }

  populateWebsite() {
    let data = this.props.record;
    let preUrlSeperator = data.lang === "en" ? "from" : "מ";
    return (
      <div>
        <span>{this.verifyLangAndCapitalize(this.verifyLangAndCapitalize(data.writers))}</span>
        <span>({data.year}). </span>
        <span style={{ fontWeight: "bold" }}>
          {this.verifyLangAndCapitalize(data.articleHeadline)}
        </span>
        <span>. </span>
        <span>{data.date} </span>
        <span>{`${preUrlSeperator} ${data.url}`}. </span>
      </div>
    );
  }

  deleteRecord(event) {
    var recordID = this.props.recordID;
    var biblistID = this.props.activeBiblist.id;
    var { userid } = this.props;
    this.setState({ ...this.state, show: false });
    this.props.DeleteRecordFromUser(userid, recordID, biblistID);
  }

  onEditRecord() {
    const { type, activeBiblist } = this.props;
    this.props.history.push(`editRecord/${type}/${this.props.recordID}`);
  }

  verifyLangAndCapitalize(string) {
    if (typeof string !== "string" || this.props.record.lang === "he")
      return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    return (
      <div className="bib_card">
        <div className="row">
          <div className="col-md-2 record-config-buttons">
            <OverlayTrigger placement="top" overlay={<Tooltip>מחק</Tooltip>}>
              <span
                onClick={() => this.setState({ ...this.state, show: true })}
                data-id={this.props.recordID}
                role="button"
                tabIndex="0"
                aria-label="מחק"
              >
                <i className="fas fa-trash-alt hover-orange"></i>
              </span>
            </OverlayTrigger>
            <OverlayTrigger placement="top" overlay={<Tooltip>עריכה</Tooltip>}>
              <span
                onClick={() => this.onEditRecord()}
                className="pointer"
                data-id={this.props.recordID}
                role="link"
                tabIndex="0"
                aria-label="עריכה"
              >
                <i className="fas fa-edit hover-orange"></i>
              </span>
            </OverlayTrigger>
            <OverlayTrigger placement="top" overlay={<Tooltip>העתק פריט</Tooltip>}>
              <span
                data-id={this.props.recordID}
                role="button"
                tabIndex="0"
                aria-label="העתק פריט"
                onClick={(e) => {
                  copyToClipboard.single(".recordQuery", e.target);
                  this.copy();
                }}
              >
                <i className={this.state.copyClass}></i>
              </span>
            </OverlayTrigger>
          </div>
          <div className="col-md-7">
            <div className={"recordQuery " + this.props.record.lang}>
              {this.getRecord()}
            </div>
          </div>
          <Confirm
            onHide={() => this.setState({ ...this.state, show: false })}
            msg="האם ברצונך למחוק את הרשומה?"
            show={this.state.show}
            onConfirm={this.deleteRecord.bind(this)}
          />
        </div>
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {
    activeBiblist: state.activeBiblist,
    userid: state.authReducer.userid,
    getEditRecord: state.getEditRecord[0]
  };
};

export default withRouter(
  connect(mapStateToProps, { DeleteRecordFromUser, exportRecordData })(
    BibListItem
  )
);
