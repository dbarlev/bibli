import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import './FrontFaq.scss';

class FrontFaq extends Component {
    render() {
        return (
            <Row id="statisic-row">
                <Col md="5"></Col>
                <Col md="4">
                    <div>
                        <span className="star"><i class="fa fa-star" aria-hidden="true"></i></span>
                        <CountUp className="counter" end={170641} duration={3} separator="," />
                        <span className="star"><i class="fa fa-star" aria-hidden="true"></i></span>
                    </div>
                    <div>
                        <p className="text">מבקרים כבר נהנים מהמערכת של ביבלי</p>
                    </div>
                </Col>
                <Col md="3"></Col>
            </Row>
        );
    }
}

export default FrontFaq;
