import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap';
import researcher from '../img/researcher.png';
import student from '../img/student.png';
import guest from '../img/guest.png';

class plansTable extends Component {
  render() {
    return (
        <Col className="grey-bg" xs={12} sm={6} md={4}>
        <h3 className="text-right">התוכניות שלנו</h3>
        <Row>
          <Col className="" xs={4}>
            <img src={guest} className="subscripsion-icon" alt="אורח" />
          </Col>
          <Col className="text-right" xs={8} >
            <h4>ללא עלות</h4>    
            <ul>
              <li>רשימות ביבליוגרפיות : 1</li>
              <li>מספר פריטים ברשימה: 7</li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className="" xs={4}>
            <img src={student} className="subscripsion-icon" alt="סטודנט" />
          </Col>
          <Col className="text-right" xs={8} >
            <h4>8 ש"ח בחודש</h4>    
            <ul>
              <li>רשימות ביבליוגרפיות : 10</li>
              <li>מספר פריטים ברשימה: 20</li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className="" xs={4}>
            <img src={researcher} className="subscripsion-icon" alt="חוקר" />
          </Col>
        
          <Col className="text-right" xs={8} >
            <h4>45 ש"ח בחודש</h4>    
            <ul>
              <li><b>רשימות ביבליוגרפיות : </b>ללא הגבלה</li>
              <li>מספר פריטים ברשימה: ללא הגבלה</li>
            </ul>
          </Col>
        </Row>
      </Col>
    )
  }
}

export default plansTable;
