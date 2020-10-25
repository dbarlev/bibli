import React, { Component } from 'react';
import { Image, Row, Button, FormGroup, Col, ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import researcher from '../../img/researcher.png';
import student from '../../img/student.png';
import guest from '../../img/guest.png';

const _Yearly = "year";
const _Monthly = "month";


export class PricingTable extends Component {

    constructor() {
        super();
        this.state = {
            price: {
                month: {
                    guest: 0,
                    student: 20,
                    investigator: 50
                },
                year: {
                    guest: 0,
                    student: 8,
                    investigator: 45
                }
            },
            priceType: _Yearly
        }
    }

    render() {

        let { price, priceType } = this.state;
        price = price[priceType];

        return (
            <div id="pricing-table">
                <ul>
                    <li className="text-center price-regular">
                        <Image src={guest} alt="משתמש מסוג אורח" />
                        <Row>
                            <span className="">ללא</span>
                            <br />
                            <span className="">עלות</span>
                        </Row>

                        <Row>
                            <p className="large bold">רשומות ביבליוגרפיות:</p>
                            <p>1</p>
                        </Row>
                        <Row>
                            <p className="large bold">פריטים ביבליוגרפיים:</p>
                            <p>7</p>
                        </Row>
                        <Row>
                            <Button onClick={async () => await this.props.onPackageChoosen()} bsStyle="primary" className="btn-yellow blue-text">לבחירת התכנית <i className="fas fa-chevron-left btn-yellow"></i></Button>
                        </Row>
                    </li>
                    <li className="text-center price-recomended">
                        <div className="recomended-badge">הנבחרת ביותר</div>
                        <div className="recomended-container" >
                            <Image src={student} alt="משתמש מסוג סטודנט" />
                            <Row>
                                <span className="smallNum">₪</span>
                                <span className="large bold">{price.student}</span>
                                <br />
                                <span className="bigNum">לחודש</span>
                            </Row>

                            <Row>
                                <p className="large bold">רשומות ביבליוגרפיות:</p>
                                <p className="large">200</p>
                            </Row>
                            <Row>
                                <p className="large bold">פריטים ביבליוגרפיים:</p>
                                <p className="large">ללא הגבלה</p>
                            </Row>
                            <Row>
                                <Button bsStyle="primary"> <Link to="/checkout"> לבחירת התכנית <i className="fas fa-chevron-left"></i></Link></Button>
                            </Row>
                        </div>
                    </li>
                    <li className="text-center price-premium">
                        <Image src={researcher} alt="משתמש מסוג חוקר" />
                        <Row>
                            <span className="smallNum bold">₪</span>
                            <span className="large bold">{price.investigator}</span>
                            <br />
                            <span className="bigNum">לחודש</span>
                        </Row>

                        <Row>
                            <p className="large bold">רשומות ביבליוגרפיות:</p>
                            <p className="large">ללא הגבלה</p>
                        </Row>
                        <Row>
                            <p className="large bold">פריטים ביבליוגרפיים:</p>
                            <p className="large">ללא הגבלה</p>
                        </Row>
                        <Row>
                            <Button bsStyle="primary" className="btn-yellow blue-text"> <Link to="/checkout"> לבחירת התכנית <i className="fas fa-chevron-left btn-yellow"></i></Link></Button>
                        </Row>
                    </li>
                </ul>
            </div >
        )
    }
}

export default PricingTable;
