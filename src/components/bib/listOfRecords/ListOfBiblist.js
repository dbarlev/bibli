import React, { Component } from "react";
import { connect } from "react-redux";
import { activeBiblist, ShowUpgradeModal } from "../../../actions";
import { LinkContainer } from "react-router-bootstrap";
import { withRouter } from "react-router-dom";
import { OverlayTrigger, Tooltip, Row, Col, Button } from "react-bootstrap";

const MyLists = (userPackage, ShowUpgradeModal) => {

  const userShouldUpgrade = userPackage === "free";

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
        {
          userShouldUpgrade
            ?
            <OverlayTrigger placement="top" overlay={<Tooltip>הינך בחבילת חינם עד עבודה אחת, לשידרוג חבילה לחצו כאן</Tooltip>}>
              <Button
                style={{ background: 'none', border: 'none', padding: 0 }}
                onClick={() => ShowUpgradeModal(true)}
                className="sideMenuLinks hover-orange"
              >
                <i aria-hidden="true" style={{ color: '#204260' }} className="fas fa-plus hover-orange"></i>
              </Button>
            </OverlayTrigger>
            :
            <OverlayTrigger placement="top" overlay={<Tooltip>הוסף רשימה</Tooltip>}>
              <LinkContainer
                className="sideMenuLinks hover-orange"
                to="/records/addNewList"
              >
                <a aria-label="הוסף רשימה">
                  <i aria-hidden="true" className="fas fa-plus hover-orange"></i>
                </a>
              </LinkContainer>
            </OverlayTrigger>

        }

      </Col>
    </Row >
  );
};

class ListOfBiblist extends Component {
  constructor(props) {
    super(props);
  }

  onListClicked(item) {
    this.props.activeBiblist(item);
    this.props.history.push("/records/biblist");
  }

  showList() {
    let { allBiblist, userPackage, ShowUpgradeModal } = this.props;
    let uniqueListId = [];

    if (allBiblist && allBiblist.length > 0) {
      return (
        <div>
          {MyLists(userPackage, ShowUpgradeModal)}
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
                      tabindex="0"
                      role="link"
                      className="pointer sideMenuLinks hover-orange"
                      onClick={() => this.onListClicked(item)}
                      onKeyDown={(e) => {
                        const keyCode = e.keyCode || e.which;
                        if (keyCode === 13) {
                          this.onListClicked(item);
                        }
                      }}
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
      return <div>{MyLists(userPackage, ShowUpgradeModal)}</div>;
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
    userid: state.authReducer.userid,
    userPackage: state.userPackage
  };
};

export default connect(mapStateToProps, {
  activeBiblist,
  ShowUpgradeModal
})(withRouter(ListOfBiblist));