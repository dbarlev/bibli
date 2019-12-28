import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";
import ApaBooks from "./apa/ApaTypes/ApaBooks";
import ApaPaper from "./apa/ApaTypes/ApaPaper";
import ApaArticle from "./apa/ApaTypes/ApaArticle";
import ApaWebsite from "./apa/ApaTypes/ApaWebsite";
import { connect } from "react-redux";
import { OverlayTrigger, Tooltip, Col, Row } from "react-bootstrap";
import './apaTabControl.scss';

const checkActiveLink = routeToCheck => {
  let href = window.location.href;
  if (href.indexOf("editRecord") === -1) return;
  return href.indexOf(routeToCheck) > -1 ? "is-active" : "";
};

const DisabeldTab = ({ type, activeClassName = null, text, icon }) => {
  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id="tooltip-disabled">בקרוב</Tooltip>}
    >
      <li className="pull-right notApplicable" name={type}>
        <a className={checkActiveLink(type)} activeClassName={activeClassName}>
          <i name={type} className={icon}></i>
          <div name={type} className="iconText">
            {text}
          </div>
        </a>
      </li>
    </OverlayTrigger>
  );
};

const ApaTab = ({ type, navigate, activeClassName = null, text, icon }) => {
  return (
    <li className="pull-right" name={type}>
      <NavLink
        className={checkActiveLink(type)}
        activeClassName={activeClassName}
        to={navigate}
      >
        <i name={type} className={icon}></i>
        <div name={type} className="iconText">
          {text}
        </div>
      </NavLink>
    </li>
  );
};

class ApaTabControl extends Component {
  constructor() {
    super();
    this.state = {
      activePanel: "book"
    };
  }

  changeTab(event) {
    event.preventDefault();
    this.setState({
      activePanel: event.currentTarget.name
    });
  }

  render() {
    const { activeBiblistData } = this.props;
    const biblistId = activeBiblistData.id;
    return (
      <div id="apaTabcontrol">
        <div className="row">
          <ul className="nav tabControlIcons">
            <ApaTab
              type="book"
              navigate={`/records/addRecord/ApaBooks/${biblistId}`}
              activeClassName="is-active"
              text="ספר"
              icon="fas fa-book"
            />
            <ApaTab
              type="paper"
              navigate={`/records/addRecord/ApaPaper/${biblistId}`}
              activeClassName="is-active"
              text="עיתון"
              icon="fas fa-book-open"
            />
            <ApaTab
              type="article"
              navigate={`/records/addRecord/ApaArticle/${biblistId}`}
              activeClassName="is-active"
              text="כתב עת"
              icon="fas fa-graduation-cap"
            />
            <ApaTab
              type="website"
              navigate={`/records/addRecord/ApaWebsite/${biblistId}`}
              activeClassName="is-active"
              text="אתר"
              icon="fab fa-chrome"
            />
            <DisabeldTab
              type="movie"
              activeClassName="is-active"
              icon="fas fa-video"
              text="סרט"
            />
            <DisabeldTab
              type="audio"
              activeClassName="is-active"
              icon="fas fa-microphone"
              text="אודיו"
            />
          </ul>
        </div>
        <Row className="row">
          <Col md={10} lg={10} xs={12}>
            <Route path="/records/addRecord/ApaBooks/:biblistid" component={ApaBooks} />
            <Route
              path="/records/addRecord/ApaWebsite/:biblistid"
              component={ApaWebsite}
            />
            <Route
              path="/records/addRecord/ApaArticle/:biblistid"
              component={ApaArticle}
            />
            <Route path="/records/addRecord/ApaPaper/:biblistid" component={ApaPaper} />

            <Route path="/records/editRecord/:biblistid/book/:id" component={ApaBooks} />
            <Route
              path="/records/editRecord/:biblistid/website/:id"
              component={ApaWebsite}
            />
            <Route
              path="/records/editRecord/:biblistid/article/:id"
              component={ApaArticle}
            />
            <Route path="/records/editRecord/:biblistid/paper/:id" component={ApaPaper} />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeBiblistData: state.activeBiblist,
  };
};

export default connect(mapStateToProps, {})(ApaTabControl);
