import React, { Component } from "react";
import ApaBooks from "./apa/ApaTypes/ApaBooks";
import ApaPaper from "./apa/ApaTypes/ApaPaper";
import ApaArticle from "./apa/ApaTypes/ApaArticle";
import ApaWebsite from "./apa/ApaTypes/ApaWebsite";
import { moveFocus } from '../Services/MoveFocus';
import './apaTabControl.scss';


const ApaTab = ({ type, activeClassName = null, text, icon, onChangeTab, nextType, prevType }) => {
  return (
    <li className="pull-right" name={type}>
      <a
        role="tab"
        href="#"
        id={`tab-${type}`}
        aria-controls={`${type}Form`}
        activeClassName={activeClassName}
        onClick={(e) => onChangeTab(e)}
        onKeyDown={(e) => {
          let focusObject = { activateOnFocus: true };
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
          <ul className="nav tabControlIcons" role="tablist">
            <ApaTab
              type="book"
              activeClassName="is-active"
              onChangeTab={(e) => this.changeTab(e, "book")}
              text="ספר"
              icon="fas fa-book"
              nextType="paper"
            />
            <ApaTab
              type="paper"
              onChangeTab={(e) => this.changeTab(e, "paper")}
              activeClassName="is-active"
              text="עיתון"
              icon="fas fa-book-open"
              prevType="book"
              nextType="article"
            />
            <ApaTab
              type="article"
              onChangeTab={(e) => this.changeTab(e, "article")}
              activeClassName="is-active"
              text="כתב עת"
              icon="fas fa-graduation-cap"
              prevType="paper"
              nextType="website"
            />
            <ApaTab
              type="website"
              onChangeTab={(e) => this.changeTab(e, "website")}
              activeClassName="is-active"
              text="אתר"
              icon="fab fa-chrome"
              prevType="article"
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