import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Row, Col, Nav, NavItem, Navbar, MenuItem, FormGroup, FormControl, Button } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import logoSrc from '../img/logo.jpg';

class Footer extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            fullName: ''
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmitEmailList = (e) =>{
        e.preventDefault();
        
    }
    render() {

        let pos = this.props.className;

        return (
            <Grid fluid className={"footer" + " " + pos}>
                <Grid className="show-grid">
                    <Row>
                        <Col className="col-xs-offset-2 " xs={6}>
                            <div className="hidden">
                            <h3>מעוניינים להצטרף לניוזלטר שלנו?</h3>
                            <p>השאירו פרטים ונשמח לעדכן אתכם בכל מידע חדש שיהיה לנו!</p>
                            <form horizontal onSubmit={this.onSubmitEmailList.bind(this)}>
                                <FormGroup className="margin-bottom">
                                    <Col xs={12} sm={4}>
                                        <FormControl 
                                            ref="fullName" 
                                            name="fullName" 
                                            type="text" 
                                            id="fullName"
                                            onChange={this.onChange.bind(this)} 
                                            placeholder="הקלד שם מלא" 
                                        />
                                    </Col>
                                    <Col xs={12} sm={8}>
                                        <FormControl 
                                            ref="email" 
                                            name="email" 
                                            id="email" 
                                            type="email" 
                                            onChange={this.onChange.bind(this)} 
                                            placeholder="הקלד דואר אלקטרוני" 
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col xs={12} className="m10top">
                                        <Button className="full-width-btn" type="submit">הירשם</Button>
                                    </Col>
                                </FormGroup>
                            </form>
                            </div>
                        </Col>
                        <Col className="text-right" xs={3}>
                            <Nav id="FooterNav" className="nav-noStyle">
                                <li>
                                    <a href="https://www.facebook.com/biblio.co.il/" target="__blank" >עקבו אחרינו ב <i className="fab fa-facebook"></i></a>
                                </li>
                                <li>
                                    <NavLink to="/front">
                                        דף ראשי
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/contact">
                                        דברו איתנו
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/">
                                        התנתקו
                                    </NavLink>
                                </li>
                            </Nav>
                        </Col>
                    </Row>
                </Grid>
            </Grid>

        )
    }
}

export default Footer;