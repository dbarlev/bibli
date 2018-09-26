import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {setRetriveDate} from '../../../actions';

export class VerifyLang {
  
    constructor(text)
    {
        this.text = text;
    }

    checkLanguage()
    {
        var lang = "he";
        if(/^[a-zA-Z]+$/.test(this.text))
        {
            lang = "en";
        }
        return lang;
    }
}


