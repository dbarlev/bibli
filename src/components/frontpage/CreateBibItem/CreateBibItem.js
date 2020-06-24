import React, { Component } from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import './CreateBibItem.scss';
import imgSrc from '../../img/about-us-pic.jpg';
import HomeApaTabControl from '../../bib/homeApaTabControl';

class CreateBibItem extends Component {
    render() {
        return (
            <main id="home-createBib">
                <Row>
                    <Col lg={3} md={1}></Col>
                    <Col lg={6} md={10}>
                        <Row>
                            <Col lg="2"></Col>
                            <Col md={9} lg={7} sm={12} xs={12}>
                                <div className="card">
                                    <div class="headline">
                                        <h2>צרו את פריט הביבליוגרפיה הראשון שלכם</h2>
                                        <ol>
                                            <li>בחרו סוג פריט ביבליוגרפי</li>
                                            <li>הזינו את הפרטים שלו בטופס למטה</li>
                                            <li>המערכת תסדר את הרשומה בהתאם לכללי הכתיבה </li>
                                        </ol>
                                    </div>
                                    <HomeApaTabControl homePage={true} />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={4} md={1}></Col>
                </Row>
            </main>
        );
    }
}

export default withRouter(CreateBibItem);
