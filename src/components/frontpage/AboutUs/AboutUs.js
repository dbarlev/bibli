import React, { Component } from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import './AboutUs.scss';
import imgSrc from '../../img/about-us-pic.jpg';
import HomeApaTabControl from '../../bib/homeApaTabControl';
class AboutUs extends Component {

    render() {
        return (
            <Row id="home-aboutus">
                <Col lg={3} md={1}></Col>
                <Col lg={5} md={10}>
                    <Row>
                        <Col md={3} sm={4} xs={12} >
                            <Col xs={12} md={4} id="home-aboutus_image">
                                <div className="rounded text-left">
                                    <Image src={imgSrc} alt="" />
                                </div>
                            </Col>
                        </Col>
                        <Col md={9} sm={8} xs={12}>
                            <Row>
                                <Col lg={3} md={0} sm={0}  xs={0}>
                                </Col>
                                <Col md={9} sm={12}  xs={12} className="text-right">
                                    <h2>מי אנחנו?</h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={3} md={0}  sm={0}></Col>
                                <Col md={9} sm={12} className="text-right">
                                  <p>המערכת נוצרה לפני מספר שנים במטרה אחת פשוטה: לאפשר לסטודנטים לחזור ולהתמקד בתוכן איכותי לעבודה, על ידי הפיכת תהליך כתיבת הביבליוגרפיה לפשוט.
                                    </p>
                                    <p>
                                  במשך מספר שנים המערכת צברה מפה לאוזן כמה אלפי משתמשים שמצאו סוף סוף את הזמן להתמקד בדבר החשוב באמת: גוף העבודה שלהם.</p>
                                    <Button onClick={() => this.props.history.push("/odot")}>המשך קריאה ></Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col lg={4} md={1}></Col>
            </Row>
        );
    }
}

export default withRouter(AboutUs);
