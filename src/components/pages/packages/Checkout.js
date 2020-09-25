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
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import StickyContact from '../../sticky/stickyContact/StickyContact';
import SkipLinks from '../../skipLinks';
import './Packages.scss';


class checkout extends React.Component {

    render() {
    return (
        <Grid>
           
            <Header />
            <main>
                <Row>
                    <Col md={6} mdOffset={3}>
                        <h1>הזינו את פרטי התשלום</h1>
                    </Col>
                </Row>
                <Col md={6}>
                    <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title="כרטיס אשראי">
   
  
                    <Row>
                    <Form id="toggleLoginForm">
                <FormGroup controlId="formHorizontalusername">
                    <Col xs={12} sm={12}>
                    <Row >
                        <FormControl
                        ref="name"
                        name="name"
                        type="text"
                        onChange={this.onChange}
                        placeholder="שם מלא"
                        aria-label="שם מלא"
                        />
                    </Row>
                    </Col>
                    
                    <Col xs={12} sm={6}>
                    <Row >
                        <FormControl
                        ref="phone"
                        name="phone"
                        type="text"
                        onChange={this.onChange}
                        placeholder="מספר טלפון"
                        aria-label="מספר טלפון"
                        />
                    </Row>
                    </Col>
                    <Col xs={12} sm={6}>
                    <Row>
                    <FormControl
                        ref="email"
                        name="email"
                        type="email"
                        onChange={this.onChange}
                        placeholder="דואר אלקטרוני"
                        aria-label="דואר אלקטרוני"
                        />
                    </Row>

                    </Col>

                    <Col xs={12} sm={6}>
                    <Row>
                    <FormControl
                        ref="tz"
                        name="tz"
                        type="text"
                        onChange={this.onChange}
                        placeholder="מספר תעודת זהות"
                        aria-label="מספר תעודת זהות"
                        />
                    </Row>

                    </Col>
                    <Col xs={12} sm={6}>
                    <Row >
                        <FormControl
                        ref="cvv"
                        name="cvv"
                        type="text"
                        onChange={this.onChange}
                        placeholder="cvv (שלוש ספרות על גב הכרטיס)"
                        aria-label="cvv (שלוש ספרות על גב הכרטיס)"
                        />
                    </Row>
                    </Col>

                    <Col xs={12} sm={12}>
                    <Row >
                        <FormControl
                        ref="creditnum"
                        name="creditnum"
                        type="text"
                        onChange={this.onChange}
                        placeholder="מספר כרטיס אשראי"
                        aria-label="מספר כרטיס אשראי"
                        />
                    </Row>
                    </Col>
                   
                    <Col xs={12} sm={12}>
                        <h3>תאריך תפוגת הכרטיס</h3>
                    </Col>
                    
                   

    

                
                    <Col xs={12} sm={6}>
                    <Row >
                        <FormControl
                        ref="expyear"
                        name="expyear"
                        componentClass="select" 
                        placeholder="select"
                        as="select" size="sm" custom>
                            <option>2020</option>
                            <option>2021</option>
                            <option>2022</option>
                            <option>2023</option>
                            <option>2024</option>
                            <option>2025</option>
                            <option>2026</option>
                            <option>2027</option>
                        </FormControl>
                    </Row>
                    </Col>
                    <Col xs={12} sm={6}>
                    <Row >
                        <FormControl
                        ref="expmonth"
                        name="expmonth"
                        componentClass="select" 
                        placeholder="select"
                       
                        as="select" size="sm" custom>
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                            <option>04</option>
                            <option>05</option>
                            <option>06</option>
                            <option>07</option>
                            <option>08</option>
                            <option>09</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                        </FormControl>
                    </Row>
                    </Col>

                    <Col xs={12} >
                    <Button
                        onClick={this.handleSubmit}
                        type="submit"
                        className="full-width-btn"
                        id="loginSubmit"
                    >
                          קחו את הכסף שלי...  מהר... קחו אותו..
                    </Button>
                    </Col>
                </FormGroup>
                <Row className="show-grid"></Row>
                </Form>
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
export default checkout;