import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";
import ApaBooks from "./apa/ApaTypes/ApaBooks";
import ApaPaper from "./apa/ApaTypes/ApaPaper";
import ApaArticle from "./apa/ApaTypes/ApaArticle";
import ApaWebsite from "./apa/ApaTypes/ApaWebsite";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { moveFocus } from '../Services/MoveFocus';
import './apaTabControl.scss';

const checkActiveLink = (routeToCheck, editMode) => {
  let href = window.location.href;
  if (editMode) return;
  return href.indexOf(routeToCheck) > -1 ? "is-active" : "";
};

const DisabeldTab = ({ type, activeClassName = null, text, icon }) => {
  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id="tooltip-disabled">בקרוב</Tooltip>}
    >
      <li className="pull-right notApplicable" name={type}>
        <a role="tab" className={checkActiveLink(type)} activeClassName={activeClassName}>
          <i aria-hidden="true" name={type} id={`${type}-disabled`} className={icon}></i>
          <div name={type} className="iconText">
            {text}
          </div>
        </a>
      </li>
    </OverlayTrigger>
  );
};

const ApaTab = ({ type, navigate, activeClassName = null, text, icon, editMode, nextType, prevType }) => {
  return (
    <li className="pull-right" name={type}>
      <NavLink
        className={checkActiveLink(type, editMode)}
        activeClassName={activeClassName}
        to={navigate}
        id={`tab-${type}`}
        aria-controls={`${type}Form`}
        role="tab"
        onKeyDown={(e) => {
          let focusObject = {
            current: `tab-${type}`,
            activateOnFocus: true,
            enter: `#${type}Form input`
          };
          if (nextType)
            focusObject.left = `tab-${nextType}`;

          if (prevType)
            focusObject.right = `tab-${prevType}`

          moveFocus(e, focusObject)
        }}
      >
        <i aria-hidden="true" name={type} className={icon}></i>
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
    return (
      <div id="apaTabcontrol">
        <div className="row">
          <ul className="nav tabControlIcons" role="tablist">
            <ApaTab
              type="book"
              navigate="/records/addRecord/ApaBooks"
              activeClassName="is-active"
              text="ספר"
              icon="fas fa-book"
              nextType="paper"
            />
            <ApaTab
              type="paper"
              navigate="/records/addRecord/ApaPaper"
              activeClassName="is-active"
              text="עיתון"
              icon="fas fa-book-open"
              prevType="book"
              nextType="article"
            />
            <ApaTab
              type="article"
              navigate="/records/addRecord/ApaArticle"
              activeClassName="is-active"
              text="כתב עת"
              icon="fas fa-graduation-cap"
              prevType="paper"
              nextType="website"
            />
            <ApaTab
              type="website"
              navigate="/records/addRecord/ApaWebsite"
              activeClassName="is-active"
              text="אתר"
              icon="fab fa-chrome"
              prevType="article"
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
        <div className="row">
          <div className="col-md-9 col-xs-9">
            <Route path="/records/addRecord/ApaBooks" component={ApaBooks} />
            <Route
              path="/records/addRecord/ApaWebsite"
              component={ApaWebsite}
            />
            <Route
              path="/records/addRecord/ApaArticle"
              component={ApaArticle}
            />
            <Route path="/records/addRecord/ApaPaper" component={ApaPaper} />

            <Route path="/records/editRecord/book/:id" component={ApaBooks} />
            <Route
              path="/records/editRecord/website/:id"
              component={ApaWebsite}
            />
            <Route
              path="/records/editRecord/article/:id"
              component={ApaArticle}
            />
            <Route path="/records/editRecord/paper/:id" component={ApaPaper} />
          </div>
        </div>
      </div>
    );
  }
}

export default ApaTabControl;