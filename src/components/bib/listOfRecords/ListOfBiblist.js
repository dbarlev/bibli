import React, { Component } from "react";
import { connect } from "react-redux";
import { getBibListNamesFromDB, getRecordsFromDB } from "../../../actions/ajax";
import { activeBiblist } from "../../../actions";
import { LinkContainer } from "react-router-bootstrap";
import { withRouter } from "react-router-dom";
import { OverlayTrigger, Tooltip, Row, Col } from "react-bootstrap";

const myLists = () => {
  return (
    <Row>
      <Col sm="10">
        <strong
          className="biblistHeading"
          style={{ float: "right" }}
          aria-level="2"
          role="heading"
        >
          העבודות שלי
        </strong>
      </Col>
      <Col sm="2">
        <OverlayTrigger placement="top" overlay={<Tooltip>הוסף רשימה</Tooltip>}>
          <LinkContainer
            className="sideMenuLinks hover-orange"
            to="/records/addNewList"
          >
            <a aria-label="הוסף רשימה">
              <i className="fas fa-plus hover-orange"></i>
            </a>
          </LinkContainer>
        </OverlayTrigger>
      </Col>
    </Row>
  );
};

class ListOfBiblist extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getBibListNamesFromDB(this.props.userid);
  }

  onListClicked(item) {
    this.props.activeBiblist(item);
    this.props.history.push("/records/biblist");
  }

  showList() {
    let { allBiblist } = this.props;
    let uniqueListId = [];

    if (allBiblist && allBiblist.length > 0) {
      return (
        <div>
          {myLists()}
          <ul
            className="list-no-style align-right padding-0"
            id="list-of-biblist"
          >
            {this.props.allBiblist.map((item, index) => {
              if (uniqueListId.indexOf(item.Name) == -1) {
                uniqueListId.push(item.Name);
                return (
                  <li key={index}>
                    <div
                      className="pointer sideMenuLinks hover-orange"
                      onClick={this.onListClicked.bind(this, item)}
                    >
                      <span className="black">{item.Name}</span>
                    </div>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      );
    } else {
      return <div>{myLists()}</div>;
    }
  }

  render() {
    return (
      <div class="well" id="recordsListContainer">
        {this.showList()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allBiblist: state.getBiblistNamesFromDB,
    userid: state.authReducer.userid
  };
};

export default connect(mapStateToProps, {
  getBibListNamesFromDB,
  getRecordsFromDB,
  activeBiblist
})(withRouter(ListOfBiblist));