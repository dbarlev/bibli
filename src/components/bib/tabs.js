import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  Col,
  Checkbox,
  ControlLabel,
  HelpBlock
} from 'react-bootstrap';
import {Tabs, Tab} from 'react-bootstrap-tabs';
import ApaBooks from './apa/ApaBooks';
import ApaPaper from './apa/ApaPaper';
import ApaArticle from './apa/ApaArticle';
import ApaWebsite from './apa/ApaWebsite';

class ApaTabs extends Component {


  render() {


    return (
      <div id="apaTabcontrol">
        <div className="row">
            <div className="col-md-10 col-md-offset-1">
                <Tabs onSelect={(index, label) => console.log(label + ' selected')}>
                    <Tab label="ספר"><ApaBooks /></Tab>
                    <Tab label="עיתון"><ApaPaper /></Tab>
                    <Tab label="כת עת"><ApaArticle /></Tab>
                    <Tab label="אתר"><ApaWebsite /></Tab>
                </Tabs>
            </div>
        </div>
      </div>

    );
  }
}




export default ApaTabs;

