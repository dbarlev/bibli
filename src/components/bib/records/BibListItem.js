import React, {Component} from 'react';
import {connect} from 'react-redux';
import {DeleteRecordFromUser} from '../../../actions/ajax';

class BibListItem extends Component {

  constructor()
  {
    super();
    this.state = {
        userid: localStorage.userid,
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
        let confirmation = window.confirm("אתה בטוח שאתה רוצה למחוק את הרשומה?");
        if(confirmation){
            var recordID = event.currentTarget.getAttribute("data-id");
            var biblistID = this.props.activeBiblist.id;
            var {userid} = this.state;
            this.props.DeleteRecordFromUser(userid, recordID, biblistID);
        }
        
  }


  render() {

    return (
      <div className="bib_card"> 
          <div className="row">
              <div className="col-md-2" id="record-config-buttons">
                  <span onClick={this.deleteRecord.bind(this)} data-id={this.props.recordID} role="button" aria-label="מחק"><i className="fas fa-trash-alt"></i></span>
                  <span data-id={this.props.recordID} role="button" aria-label="העתק"><i className="fas fa-paste"></i></span>
              </div>
              <div className="col-md-7">
                  <div className="recordQuery">{this.getRecord()}</div>
              </div>             
          </div>
      </div>
    
    );
  }
}

const mapStateToProps = (state) => {
    return {
        activeBiblist: state.activeBiblist
    }
}

export default connect (mapStateToProps, {DeleteRecordFromUser})(BibListItem);

