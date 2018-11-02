import React, {Component} from 'react';
import { Grid, Row, Col, Nav, NavItem, Navbar, MenuItem, FormGroup, FormControl, Button} from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import logoSrc from '../img/logo.jpg';

class Footer extends Component{
    render(){
  
        return(
            <Grid fluid className="footer">
                <Grid className="show-grid">
                    <Row>
                        <Col xs={6}> 
                            <h3>מעוניינים להצטרף לניוזלטר שלנו?</h3>
                            <p>השאירו פרטים ונשמח לעדכן אתכם בכל מידע חדש שיהיה לנו!</p> 
                            <form horizontal>
                                <FormGroup className="margin-bottom" controlId="">
                                    <Col xs={12} sm={4}>
                                        <FormControl ref="fullName" name="fullName" type="text" onChange={this.onChange} placeholder="הקלד שם מלא"/>
                                    </Col>
                                    <Col xs={12} sm={8}>
                                        <FormControl ref="email" name="email" type="email" onChange={this.onChange} placeholder="הקלד דואר אלקטרוני"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col xs={12}>
                                        <Button className="full-width-btn" type="submit">הירשם</Button>
                                    </Col>
                                </FormGroup>
                            </form>
                        </Col>
                        <Col xs={6}>
                            menu2
                        </Col>
                    </Row>
                </Grid>
            </Grid>

        )
    }
}

export default Footer;