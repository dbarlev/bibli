import React, { Component } from 'react';
import { Image, Row } from 'react-bootstrap';
import researcher from '../img/researcher.png';
import student from '../img/student.png';
import guest from '../img/guest.png';

export class PricingTable extends Component {
  render() {
    return (
      <div id="pricing-table">
      <h2 className="text-center big-title white p30top">התוכניות שלנו</h2>

        <ul>
            <li className="text-center">
                <Image src={researcher} alt="משתמש מסוג אורח"/>
                <Row>
                    <span className="big-text large">ללא</span>
                    <br />
                    <span className="big-text large">עלות</span>
                </Row>

                <Row>
                    <p className="large">רשומות ביבליוגרפיות:</p>
                    <p>1</p>
                </Row>
                <Row>
                    <p className="large">פריטים ביבליוגרפיים:</p>
                    <p>7</p>
                </Row>
            </li>
            <li className="text-center">
                <Image src={researcher} alt="משתמש מסוג סטודנט"/>
                <Row>
                    <span className="big-text large">8</span>
                    <span className="smallNum large">ש"ח</span>
                    <br />
                    <span className="bigNum">לחודש</span>
                </Row>

                <Row>
                    <p className="large bold">רשומות ביבליוגרפיות:</p>
                    <p className="bold">200</p>
                </Row>
                <Row>
                    <p className="large bold">פריטים ביבליוגרפיים:</p>
                    <p className="bold">ללא הגבלה</p>
                </Row>
            </li>    
            <li className="text-center">
                <Image src={researcher} alt="משתמש מסוג חוקר"/>
                <Row>
                    <span className="big-text large">45</span>
                    <span className="smallNum">ש"ח</span>
                    <br />
                    <span className="bigNum">לחודש</span>
                </Row>

                <Row>
                    <p className="large bold">רשומות ביבליוגרפיות:</p>
                    <p className="bold">ללא הגבלה</p>
                </Row>
                <Row>
                    <p className="large bold">פריטים ביבליוגרפיים:</p>
                    <p className="bold">ללא הגבלה</p>
                </Row>
            </li>
        </ul>
      </div>
    )
  }
}

export default PricingTable;
