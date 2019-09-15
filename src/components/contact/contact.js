import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, FormControl, Button, FormCheck } from 'react-bootstrap';
import { connect } from 'react-redux';
import { sendMassage } from '../../actions/ajax';
import Header from '../header/Header';
import Footer from '../footer/Footer';




class Contact extends Component {
    constructor(props){
        super(props)

        this.state = {
            name: '',
            email: '',
            phone: '',
            massage: '',
            checkbox: ''
        }
    }


    componentDidMount(){
        console.log('sendMassage', this.props.sendMassage);
    }
    onChange = (e) =>{
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({ [e.target.name]: value });
        console.log('contact-state', this.state);

    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        this.props.sendMassage(this.state)
        
    }

    formValidation = () => {
            let isError = false;
            const errors = {};
    
            if(this.state.name.length != ''){
                isError =  true;
                errors.passwordLengthError = "חייב למלא את שדה שם מלא"
              }else{
                isError =  false;
                errors.passwordLengthError = ""
              }
          
              if( this.state.confirmPassword !==  this.state.password){
                isError =  true;
                errors.passwordMatchError = "הסיסמאות לא תואמות"
          
              }else{
                isError =  false;
                errors.passwordMatchError = ""
              }
    
            this.setState({
                ...this.state,
                ...errors
            });
            return isError
        }
    

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
                    <form className="contact-form" onSubmit={this.onSubmit.bind(this)}>
                        <div className="col-md-offset-5">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input 
                                            required 
                                            aria-label="הכנס שם מלא"
                                            className="form-control"
                                            Placeholder="הכנס שם מלא"
                                            ref="name" 
                                            name="name" 
                                            id="name" 
                                            type="text" 
                                            onChange={this.onChange.bind(this)}
                                        />
                                    </div>
                                </div>  
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input 
                                            required 
                                            aria-label="הכנס כתובת מייל" 
                                            className="form-control" 
                                            Placeholder="כתובת מייל" 
                                            ref="email" 
                                            name="email" 
                                            id="email" 
                                            type="email" 
                                            onChange={this.onChange.bind(this)}
                                        />
                                    </div>
                                </div>  
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <input 
                                            className="form-control" 
                                            aria-label="הכנס מספר טלפון" 
                                            Placeholder="טלפון" 
                                            ref="phone" 
                                            name="phone" 
                                            id="phone" 
                                            type="text" 
                                            onChange={this.onChange.bind(this)}
                                            />
                                    </div>
                                </div>  
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <textarea 
                                        rows="7" 
                                        required 
                                        aria-label="תוכן ההודעה, במה נוכל לעזור" 
                                        className="form-control" 
                                        Placeholder="כתוב לנו במה נוכל לעזור..."
                                        ref="massage" 
                                        name="massage" 
                                        id="massage"  
                                        onChange={this.onChange.bind(this)}
                                        ></textarea>
                                    </div>
                                </div>  
                            </div> 
                            <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>
                                        <input 
                                        aria-label="תוכן ההודעה, במה נוכל לעזור" 
                                        className="form-control" 
                                        Placeholder="כתוב לנו במה נוכל לעזור..."
                                        ref="checkbox" 
                                        name="checkbox" 
                                        id="checkbox"  
                                        type="checkbox"
                                        onChange={this.onChange.bind(this)}
                                        />
                                        מעוניין להצטרף לרשימת התפוצה
                                    </label>
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
                <Footer className="center-footer" />
            </div>

        )
    }
}

export default connect(null, {sendMassage})(Contact);