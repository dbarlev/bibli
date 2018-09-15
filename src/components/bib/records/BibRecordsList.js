import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {CreateBookApaStandart, CreatePaperApaStandart, CreateArticleApaStandart, CreateWebsiteApaStandart} from '../../../actions';
import Writers from '../writers/Writers';
import BibRecord from './BibRecord'

class BibRecordsList extends Component {

  constructor()
  {
    super();
    this.state = {
        records: [],
        allRecords: [],
        deleteID: []
    }
  }

  componentWillMount() 
  {
        var self = this;
        fetch('http://127.0.0.1/bibli/api/biblioRecords/Records.php?userid=19', {
              method: "GET"  
          })
          .then(response => response.json())
          .then(json => {
              console.log(json)
                this.setState({
                    records: json
                });
                self.updateRecords();
          })
          .catch(error => console.log('parsing faild', error))
  }

  componentWillReceiveProps(nextProps) {
    
      let records = this.state.allRecords;
      let recordsToDelete = this.state.deleteID;

      records.push(nextProps.allRecords);
      recordsToDelete.push(nextProps.deleteID);

      this.setState({
        allRecords: records,
        deleteID: recordsToDelete
      })
  }

  updateRecords()
  {
     this.state.records.map((record,index)=>{
        switch(record.type)
        {
          case "book":
              this.props.CreateBookApaStandart(record);
            break;
          case "article":
            //this.props.CreateArticleApaStandart(record);
            break;
          case "paper":
            //this.props.CreatePaperApaStandart(record);
            break;
          case "website":
           // this.props.CreateWebsiteApaStandart(record);
            break;
        }
    });
  }

  render() {

    const {allRecords} = this.state;
    const {deleteID} = this.state;

    return (
      <div id="bibRecords">
      {
          allRecords.map( (record,index) => {
            if(deleteID.indexOf(record.bookID) == -1)
              return <BibRecord record={record.apa} bookid={record.bookID} key={"bib_record" + index} />
        })
      }       
      </div>
    );
  }
}



const mapStateToProps = (state) => {
    return {
        allRecords: state.createApa,
        deleteID: state.deleteRecordFromUser.value
    }
}

export default connect(mapStateToProps, {CreateBookApaStandart, CreatePaperApaStandart, CreateArticleApaStandart, CreateWebsiteApaStandart})(BibRecordsList);

