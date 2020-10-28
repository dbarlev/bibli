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
    constructor(){
        super();

        this.state = {
            package: '1'
        }
    }


 ToggleButtonExample = () => {

    const radios = [
        { name: 'Active', value: '1' },
        { name: 'Radio', value: '2' }
      ];

      
}
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
                        <Zcredit package={this.state.package} />
                    </Row>
                    </Tab>
                    <Tab eventKey={2} title="paypal">
                            בעתיד...
                        </Tab>
                        </Tabs>
                </Col>
                <Col>
                    <h2 className="text-center">פרטי החבילה</h2>

                    <div class="text-center price-recomended">
                        <div class="recomended-badge">הנבחרת ביותר</div>
                        <div class="recomended-container">
                        
                        <div class="row">
                            <span class="smallNum">₪</span>
                            <span class="large bold">8</span>
                            <span class="bigNum">לחודש</span>
                        </div>
                        <div class="row"><p class="large bold">רשומות ביבליוגרפיות:</p><p class="large">200</p></div><div class="row"><p class="large bold">פריטים ביבליוגרפיים:</p><p class="large">ללא הגבלה</p></div><div class="row"><button type="button" class="btn btn-primary"> <a href="/checkout"> לבחירת התכנית <i class="fas fa-chevron-left"></i></a></button></div></div></div>

                </Col>
            </main>
            <StickyContact />
         
        </Grid>
    )
}
}
export default Checkout;