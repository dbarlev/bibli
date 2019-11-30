import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";
import ApaBooks from "./apa/ApaTypes/ApaBooks";
import ApaPaper from "./apa/ApaTypes/ApaPaper";
import ApaArticle from "./apa/ApaTypes/ApaArticle";
import ApaWebsite from "./apa/ApaTypes/ApaWebsite";

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

  checkActiveLink(routeToCheck) {
    let href = window.location.href;
    if (href.indexOf("editRecord") === -1) return;

    return href.indexOf(routeToCheck) > -1 ? "is-active" : "";
  }

  render() {
    return (
      <div id="apaTabcontrol">
        <div className="row">
          <ul className="nav tabControlIcons">
            <li className="pull-right" name="book">
              <NavLink
                className={this.checkActiveLink("book")}
                activeClassName="is-active"
                to="/records/addRecord/ApaBooks"
              >
                <i name="book" className="fas fa-book"></i>
                <div name="book" className="iconText">
                  ספר
                </div>
              </NavLink>
            </li>
            <li className="pull-right" name="paper">
              <NavLink
                className={this.checkActiveLink("paper")}
                activeClassName="is-active"
                to="/records/addRecord/ApaPaper"
              >
                <i name="paper" className="fas fa-book-open"></i>
                <div name="paper" className="iconText">
                  עיתון
                </div>
              </NavLink>
            </li>
            <li className="pull-right" name="article">
              <NavLink
                className={this.checkActiveLink("article")}
                activeClassName="is-active"
                to="/records/addRecord/ApaArticle"
              >
                <i name="article" className="fas fa-graduation-cap"></i>
                <div name="article" className="iconText">
                  כתב עת
                </div>
              </NavLink>
            </li>
            <li className="pull-right" name="website">
              <NavLink
                className={this.checkActiveLink("website")}
                activeClassName="is-active"
                to="/records/addRecord/ApaWebsite"
              >
                <i name="website" className="fab fa-chrome"></i>
                <div name="website" className="iconText">
                  אתר
                </div>
              </NavLink>
            </li>
            <li title="בקרוב" className="pull-right notApplicable" name="movie">
              <a>
                <i name="website" class="fas fa-video"></i>
                <div name="website" className="iconText">
                  סרט
                </div>
              </a>
            </li>
            <li title="בקרוב" className="pull-right notApplicable" name="audio">
              <a>
                <i name="website" class="fas fa-microphone"></i>
                <div name="website" className="iconText">
                  אודיו
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div className="row">
          <div className="col-md-9">
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
