import React, { Component } from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import './AboutUs.scss';
import imgSrc from '../../img/about-us-pic.jpg';

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
                                    <p>להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורך. נולום ארווס סאפיאן - פוסיליס קוויס, אקווזמן קוואזי במר מודוף. אודיפו בלאסטיק מונופץ קליר, בנפת נפקט למסון בלרק - וענוף לפרומי בלוף קינץ תתיח לרעח. לת צשחמי הועניב היושבב שערש שמחויט - שלושע ותלברו חשלו שעותלשך וחאית נובש ערששף. זותה מנק הבקיץ אפאח דלאמת יבש, כאנה ניצאחוי שהכים תוק, הדש שנרא התידם הכייר וק.</p>
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
