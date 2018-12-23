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
                <Image src={researcher} />
                <Row>
                    <span className="big-text">45</span>
                    <span className="smallNum">ש"ח</span>
                    <br />
                    <span className="bigNum">לחודש</span>
                </Row>

                <Row>
                    <p className="">רשומות ביבליוגרפיות</p>
                    <p className="bold">ללא הגבלה</p>
                </Row>
                <Row>
                    <p className="">פריטים ביבליוגרפיים</p>
                    <p className="bold">ללא הגבלה</p>
                </Row>
            </li>
            <li className="text-center">
                <Image src={researcher} />
                <Row>
                    <span className="big-text">45</span>
                    <span className="smallNum">ש"ח</span>
                    <br />
                    <span className="bigNum">לחודש</span>
                </Row>

                <Row>
                    <p className="">רשומות ביבליוגרפיות</p>
                    <p className="bold">ללא הגבלה</p>
                </Row>
                <Row>
                    <p className="">פריטים ביבליוגרפיים</p>
                    <p className="bold">ללא הגבלה</p>
                </Row>
            </li>    
            <li className="text-center">
                <Image src={researcher} />
                <Row>
                    <span className="big-text">45</span>
                    <span className="smallNum">ש"ח</span>
                    <br />
                    <span className="bigNum">לחודש</span>
                </Row>

                <Row>
                    <p className="">רשומות ביבליוגרפיות</p>
                    <p className="bold">ללא הגבלה</p>
                </Row>
                <Row>
                    <p className="">פריטים ביבליוגרפיים</p>
                    <p className="bold">ללא הגבלה</p>
                </Row>
            </li>
        </ul>
      </div>
    )
  }
}

export default PricingTable;
