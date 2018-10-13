import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import {DeleteRecordFromUser} from '../../../actions/ajax';
import Writers from '../writers/Writers';

class BibRecord extends Component {

  constructor()
  {
    super();
    this.state = {
        record: "",
        allRecords: [],
        permission: false
    }
  }

  componentDidMount()
  {
      this.setState({permission: true})
  }

  getRecord()
  {
      if(!this.state.permission)
        return;

      let apa = "";
      switch(this.props.type)
      {
            case "book":
                apa = this.populateBook();
                break;
            case "article":
                apa = this.populateArticle();
                break;
            case "paper":
                apa = this.populatePaper();
                break;
            case "website":
                apa = this.populateWebsite();
                break;
      }
      return apa;
  }


  populateBook()
  {
     let data = this.props.record;
     return (
         <div>
            <span>{data.writers}</span>
            <span>( {data.year} ). </span>
            <span style={{ fontWeight: "bold" }}>{data.name}</span>
            <span>. </span>
            <span>{data.location}: </span>
            <span>{data.publisherName}</span>
         </div>
     )
  }

  populateArticle()
  {
     let data = this.props.record;  
     if(data.url != null && data.url.trim() != "") 
     {  
        return (
            <div>
                <span>{data.writers}</span>
                <span>( {data.year} ). </span>
                <span style={{ fontWeight: "bold" }}>{data.articleHeadline}</span>
                <span>. </span>
                <span>{data.name}, </span>
                <span>{data.kereh}, </span>
                <span>{data.pages}, </span>
                <span>{data.date} </span>
                <span>{data.url}. </span>        
            </div>
        )
     }
     else
     {
        return (
            <div>
                <span>{data.writers}</span>
                <span>( {data.year} ). </span>
                <span style={{ fontWeight: "bold" }}>{data.articleHeadline}</span>
                <span>. </span>
                <span>{data.name}, </span>
                <span>{data.kereh}, </span>
                <span>{data.pages}.</span>     
            </div>
        )
     }
  }

  populatePaper()
  {
  
        // if(lang == "en")
        // {
        //     fullAPA = {apa: writers + "(" + dateOfPublish + "). " + papertHeadline + ". " + paperName + ", " + pagesNumber + " " + date + " From " + paperLink + ".", recordID, type};
        // }

     let data = this.props.record;  
     if(data.url != null && data.url.trim() != "") 
     {  
        return (
            <div>
                <span>{data.writers}</span>
                <span>( {data.year} ). </span>
                <span style={{ fontWeight: "bold" }}>{data.articleHeadline}</span>
                <span>. </span>
                <span>{data.name}, </span>
                <span>{data.pages}, </span>
                <span>{data.date} </span>
                <span>{data.url}. </span>        
            </div>
        )
     }
     else
     {
        return (
            <div>
                <span>{data.writers}</span>
                <span>( {data.year} ). </span>
                <span style={{ fontWeight: "bold" }}>{data.articleHeadline}</span>
                <span>. </span>
                <span>{data.pages}.</span>     
            </div>
        )
     }
  }


  populateWebsite()
  {
      let data = this.props.record;  
      return (
             <div>
                <span>{data.writers}</span>
                <span>( {data.year} ). </span>
                <span style={{ fontWeight: "bold" }}>{data.articleHeadline}</span>
                <span>. </span>
                <span>{data.date} </span>
                <span>{data.url}. </span>        
            </div>
        )
  }

  deleteRecord(event) 
  {
        var recordID = event.target.getAttribute("data-id");
        var userid = 19;
        var self = this;
        this.props.DeleteRecordFromUser(userid, recordID);
  }


  render() {

    return (
      <div className="bib_card"> 
          <div className="row">
              <div className="col-md-2">
                  <Button onClick={this.deleteRecord.bind(this)} data-id={this.props.recordID} color="danger">מחק</Button>
              </div>
              <div className="col-md-2">
                  <Button color="info">{ this.props.type != null ? this.props.type : "הגדרות" }</Button>
              </div>
              <div className="col-md-8">
                  <div>{this.getRecord()}</div>
              </div>             
          </div>
      </div>
    
    );
  }
}

export default connect (null, {DeleteRecordFromUser})(BibRecord);

