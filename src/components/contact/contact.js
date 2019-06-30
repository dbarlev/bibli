import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, FormControl, Button } from 'react-bootstrap';
import Header from '../header/Header';
import Footer from '../footer/Footer';


class Contact extends Component {
    render() {
        return (     
            <div id="contact">
                <Header />
                <div>
                    <div className="row">
                        <div className="col-xs-6 col-xs-offset-3">
                            <h1 className="text-center">
                                <p>יש משהו שאתם רוצים לשאול?</p>
                                <p>בקשה? בעיה?</p>
                            </h1>
                            <h2 className="text-center">
                                <p>כתבו לנו ונדאג לחזור אליכם בהקדם</p>
                            </h2>
                        </div>
                    </div>
                    <form className="contact-form" >
                        <div className="col-md-offset-5">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input required aria-label="הכנס שם מלא" className="form-control" Placeholder="שם" />
                                    </div>
                                </div>  
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input required aria-label="הכנס כתובת מייל" className="form-control" Placeholder="כתובת מייל" />
                                    </div>
                                </div>  
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input className="form-control" aria-label="הכנס מספר טלפון" Placeholder="טלפון" />
                                    </div>
                                </div>  
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <textarea rows="7" required aria-label="תוכן ההודעה, במה נוכל לעזור" className="form-control" Placeholder="כתוב לנו במה נוכל לעזור..."></textarea>
                                    </div>
                                </div>  
                            </div> 
                            <div className="row">
                                <div className="col-md-4 text-center">
                                    <div className="form-group">
                                        <button className="btn send" >שלח</button>
                                    </div>
                                </div>  
                            </div>
                        </div>  
                    </form>   
                </div>
                <Footer className="pull-bottom center-footer" />
            </div>

        )
    }
}

export default Contact;