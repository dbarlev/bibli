import React from 'react';
import PricingTable from './PricingTable';
import { Grid, Row, Col } from "react-bootstrap";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import StickyContact from '../../sticky/stickyContact/StickyContact';
import SkipLinks from '../../skipLinks';
import './Packages.scss';
const skipTo = [
    { id: "aboutUs-main", text: "דלג לאזור המרכזי" },
    { id: "mainMenuRow", text: "דלג לתפריט הראשי" },
    { id: "footer", text: "דלג לסוף העמוד" },
]

const Packages = () => {

    return (
        <div fluid id="Odot">
            <SkipLinks skipTo={skipTo} />
            <Header />
            <main id="aboutUs-main">
                <Row>
                    <Col md={6} mdOffset={3}>
                        <h1>התוכניות שלנו</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} mdOffset={3}>
                        <PricingTable />
                    </Col>
                </Row>
            </main>
            <StickyContact />
            <Footer bottom />
        </div>
    )
}

export default Packages;