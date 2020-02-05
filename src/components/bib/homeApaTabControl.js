import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";
import ApaBooks from "./apa/ApaTypes/ApaBooks";
import ApaPaper from "./apa/ApaTypes/ApaPaper";
import ApaArticle from "./apa/ApaTypes/ApaArticle";
import ApaWebsite from "./apa/ApaTypes/ApaWebsite";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import './apaTabControl.scss';


const ApaTab = ({ type, activeClassName = null, text, icon, onChangeTab }) => {
  return (
    <li className="pull-right" name={type}>
      <a
        href="#"
        activeClassName={activeClassName}
        onClick={(e) => onChangeTab(e)}
      >
        <i name={type} className={icon}></i>
        <div name={type} className="iconText">
          {text}
        </div>
      </a>
    </li>
  );
};

class HomeApaTabControl extends Component {
  constructor() {
    super();
    this.state = {
      activePanel: "book"
    };
  }

  changeTab(event, type) {
    event.preventDefault();
    this.setState({
      activePanel: type
    });
  }

  apaTypeToShow() {
    switch (this.state.activePanel) {
      case "book":
        return <ApaBooks homePage={true} />
      case "paper":
        return <ApaPaper homePage={true} />
      case "article":
        return <ApaArticle homePage={true} />
      case "website":
        return <ApaWebsite homePage={true} />
    }
  }

  render() {
    return (
      <div id="apaTabcontrol">
        <div className="row">
          <ul className="nav tabControlIcons">
            <ApaTab
              type="book"
              activeClassName="is-active"
              onChangeTab={(e) => this.changeTab(e, "book")}
              text="ספר"
              icon="fas fa-book"
            />
            <ApaTab
              type="paper"
              onChangeTab={(e) => this.changeTab(e, "paper")}
              activeClassName="is-active"
              text="עיתון"
              icon="fas fa-book-open"
            />
            <ApaTab
              type="article"
              onChangeTab={(e) => this.changeTab(e, "article")}
              activeClassName="is-active"
              text="כתב עת"
              icon="fas fa-graduation-cap"
            />
            <ApaTab
              type="website"
              onChangeTab={(e) => this.changeTab(e, "website")}
              activeClassName="is-active"
              text="אתר"
              icon="fab fa-chrome"
            />
          </ul>
        </div>
        <div className="row">
          {this.apaTypeToShow()}
        </div>
      </div>
    );
  }
}

export default HomeApaTabControl;