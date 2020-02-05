import React, { Component } from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import './CreateBibItem.scss';
import imgSrc from '../../img/about-us-pic.jpg';
import HomeApaTabControl from '../../bib/homeApaTabControl';

class CreateBibItem extends Component {
    render() {
        return (
            <Row id="home-createBib">
                <Col lg={3} md={1}></Col>
                <Col lg={7} md={10}>
                    <Row>
                        <Col md={3} sm={4} xs={12} >
                            <Col id="home-create-item-title">
                                <div>
                                    יצירת פריט
                                </div>
                                <div>ביבליוגרפי</div>
                            </Col>
                        </Col>
                        <Col md={9} sm={8} xs={12}>
                            <HomeApaTabControl homePage={true} />
                        </Col>
                    </Row>
                </Col>
                <Col lg={4} md={1}></Col>
            </Row>
        );
    }
}

export default withRouter(CreateBibItem);
