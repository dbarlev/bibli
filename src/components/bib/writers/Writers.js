import React, {Component} from 'react';
import {connect} from 'react-redux';
import WritersForm from "./WritersForm";



class Writers extends Component {

  constructor()
  {
    super();
    this.state = {
      writers: [{firstName: "", lastName: ""}]
    }
  }

  componentDidMount()
  {
    let { getEditRecord } = this.props;
    let writers = [];
    if(getEditRecord.length > 0 && window.location.href.indexOf("editRecord") > -1)
    {
      let length = getEditRecord[0]["wFname"].length;
      
      for(let i = 0; i < length; i ++)
      {
        let firstName =  getEditRecord[0]["wFname"][i];
        let lastName =  getEditRecord[0]["wLname"][i];
        let writersObj = {firstName, lastName};
        writers.push(writersObj);
      }
       this.setState({writers});
    }
  }

  createWriterFeilds(name,index)
  {
        let {editValues, editMode} = this.props;
        return <WritersForm key={index} name={name} onRemoveWriter={this.removeWriter.bind(this)} onWriterChange={this.getWritersNames.bind(this)}/>      
  }

  addWriter()
  {
    var writers = this.state.writers;
    writers.push({firstName: "", lastName: ""});
    this.setState({ writers });
  }

  getWritersNames(name)
  {
    this.props.onWriterChange({key: name.key, elementID: name.elementID, "data": name.data});  
  }

  // not finished, currently it's remove the writer, should be given a name to delete.
  removeWriter()
  {
      var writers = this.state.writers;
      writers.pop()
      this.setState({ writers: writers });
  }

  render() {
    return (
      <div id="writersFeilds">  
          <div className="row">
              <strong role="heading" aria-level="3" className="pull-right level3">שם המחבר<i class="fas fa-user-edit pull-right"></i></strong>
              <span className="button" onClick={this.addWriter.bind(this)}><i class="fas fa-plus"></i></span>
          </div> 
            {
              this.state.writers.map((name,index) => this.createWriterFeilds(name,index))   
            } 
      </div>

    );
  }
}


const mapStateToProps = (state) => {
  return {
      getEditRecord: state.getEditRecord
  }
}

export default connect(mapStateToProps)(Writers);

