import React, { Component } from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import './AboutUs.scss';
import imgSrc from '../../img/about-us-pic.jpg';

class AboutUs extends Component {

    render() {
        return (
            <Row id="home-aboutus">
                <Col md={3}></Col>
                <Col md={5}>
                    <Row>
                        <Col md={3}>
                            <Col xs={6} md={4}>
                                <div className="rounded">
                                    <Image src={imgSrc} alt="" />
                                </div>
                            </Col>
                        </Col>
                        <Col md={9}>
                            <Row>
                                <Col md={3}>
                                </Col>
                                <Col md={9}>
                                    <h2>מי אנחנו?</h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}></Col>
                                <Col md={9}>
                                    <p>להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורך. נולום ארווס סאפיאן - פוסיליס קוויס, אקווזמן קוואזי במר מודוף. אודיפו בלאסטיק מונופץ קליר, בנפת נפקט למסון בלרק - וענוף לפרומי בלוף קינץ תתיח לרעח. לת צשחמי הועניב היושבב שערש שמחויט - שלושע ותלברו חשלו שעותלשך וחאית נובש ערששף. זותה מנק הבקיץ אפאח דלאמת יבש, כאנה ניצאחוי שהכים תוק, הדש שנרא התידם הכייר וק.</p>
                                    <Button onClick={() => this.props.history.push("/odot")}>המשך קריאה ></Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col md={4}></Col>
            </Row>
        );
    }
}

export default withRouter(AboutUs);
