import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {setRetriveDate} from '../../../actions';

export class GetFormatDate {

  constructor()
  {
     this.obj = {
         HeMonths: {
            "1": "ינואר",
            "2": "פברואר",
            "3": "מרץ",
            "4": "אפריל",
            "5": "מאי",
            "6": "יוני",
            "7": "יולי",
            "8": "אוגוסט",
            "9": "ספטמבר",
            "10": "אוקטובר",
            "11": "נובמבר",
            "12": "דצמבר"
        },
        EnMonths: {
            "1": "Januery",
            "2": "Fabruary",
            "3": "March",
            "4": "April",
            "5": "May",
            "6": "June",
            "7": "July",
            "8": "August",
            "9": "September",
            "10": "October",
            "11": "November",
            "12": "December"
        }
     }

     this.d = new Date();
  }

    getOutputMonth(langCode)
    {
        let CurrentMonth = this.d.getMonth() + 1; // +1 because it's start from 0
        let month = this.obj.HeMonths[CurrentMonth];
        if(langCode == "en" || langCode == "english")
        {
            month = this.obj.EnMonths[CurrentMonth];
        }
        return month;
    }

    getOutputDate()
    {
        let date = this.d.getDate();
        return date.length == 1 ? "0" + date : date;
    }

    getOutputYear()
    {
        return this.d.getFullYear();
    }

    populateText(langCode)
    {
        let month = this.getOutputMonth(langCode);
        let day = this.getOutputDate();
        let year = this.getOutputYear();

        let text = "נדלה ב " +  day + " ב" + month + " " + year;
        if(langCode == "en" || langCode == "english")
        {
            text = "Retrived " + month + " " + day + ", " + year;
        }

        return text;
    }

}


