import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {setRetriveDate} from '../../../actions';

export class FormatWriters {

  constructor()
  {

  }

  getTypedName(newName, currentNames)
  {
      var flag = false;

      var firstName = [];
      var lastName = [];
      currentNames.forEach(function(item){
        
        var keys = Object.keys(item);
        if(keys.indexOf(newName.elementID) > -1)
        {

          flag = true;
          item[newName.elementID] = newName.data;
        }
      })
      if(!flag)
      {
        currentNames.push({
          [newName.elementID]: 
          {
            data: newName.data
          }
        });
      }
      
      return currentNames;
  }

  formatWriters(names)
  {
    var writers = [];
    var fname = [];
    var lname = [];
    var writersTemp = [];

    names.forEach(function(item, i){
      
      var obj = {fName : "", lName: ""};
      
      var keys = Object.keys(item);
      if(keys[0].indexOf("firstNamefield") > -1)
      {
        var firstName = item[keys[0]];
        fname.push(firstName);
        writersTemp.push(firstName);
      }
      else
      {
        var lastName = item[keys[0]];
        lname.push(lastName);
        writersTemp.push(lastName);
      }

      if(i > 0 && i % 2 != 0)
      {
          obj.fName = writersTemp[0];
          obj.lName = writersTemp[1];
          writersTemp = [] ;
          writers.push(obj);
      }
      
    });

    return {
      fname,
      lname,
      writers
    }
  }
}


