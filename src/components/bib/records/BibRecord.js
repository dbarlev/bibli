import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import {DeleteRecordFromUser} from '../../../actions';
import Writers from '../writers/Writers';

class BibRecord extends Component {

  constructor()
  {
    super();
    this.state = {
        records: [],
        allRecords: []
    }
  }

  deleteRecord(event) 
  {
        var bookid = event.target.getAttribute("data-id");
        var userid = 19;
        var self = this;
        fetch("http://127.0.0.1/bibli/api/biblioRecords/Records.php/?userid=" + userid + "&bookid=" + bookid,{
            method: "PUT"
          })
          .then(response => response.json())
          .then(json => {
              this.setState({
                    records: json
              });
              this.props.DeleteRecordFromUser(bookid);
          })
          .catch(error => 
            console.log('parsing faild', error)
          )
  }


  render() {

    return (
      <div className="bib_card"> 
          <div className="row">
              <div className="col-md-2">
                  <Button onClick={this.deleteRecord.bind(this)} data-id={this.props.bookid} color="danger">מחק</Button>
              </div>
              <div className="col-md-2">
                  <Button color="info">הגדרות</Button>
              </div>
              <div className="col-md-8">
                  <CardText>{this.props.record}</CardText>
              </div>             
          </div>
      </div>
    
    );
  }
}

export default connect (null, {DeleteRecordFromUser})(BibRecord);

