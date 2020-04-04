import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import StickyContact from './sticky/stickyContact/StickyContact';

class NotFound extends Component {
    render() {
        return (
            <Grid fluid id="Odot">
                <Header />
                <Row>
                    <Col lg={5} />
                    <Col lg={6}>
                        <h1>אופס! העמוד לא נמצא</h1>
                    </Col>
                </Row>
                <StickyContact />
                <Footer bottom />
            </Grid>
        );
    }
}

export default NotFound;
