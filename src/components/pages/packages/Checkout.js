import React from 'react';

import {
    Grid,
    Button,
    Form,
    FormGroup,
    FormControl,
    Col,
    Row,
    Tab,
    Tabs
  } from "react-bootstrap";
  import './Checkout.scss';
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import StickyContact from '../../sticky/stickyContact/StickyContact';
import SkipLinks from '../../skipLinks';


import './Packages.scss';
import Zcredit from './Zcredit';

class Checkout extends React.Component {

    render() {
    return (
        <Grid>
           
            <Header />
            <main>
                <Row>
                    <Col md={6} mdOffset={3}>
                        <h1>הזינו את פרטי התשלום </h1>
                    </Col>
                </Row>
                <Col md={6}>
                    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title="כרטיס אשראי">
                    <Row>
                        <Zcredit />
                    </Row>
                    </Tab>
                    <Tab eventKey={2} title="paypal">
                            בעתיד...
                        </Tab>
                        </Tabs>
                </Col>
                <Col>
                    <h2 className="text-center">פרטי החבילה</h2>
                </Col>
            </main>
            <StickyContact />
         
        </Grid>
    )
}
}
export default Checkout;

