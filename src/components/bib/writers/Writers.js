import React, { Component } from "react";
import { connect } from "react-redux";
import WritersForm from "./WritersForm";

class Writers extends Component {
  constructor() {
    super();
    this.state = {
      writers: [{ firstName: "", lastName: "", writerID: "writerName0" }],
      modeChange: false
    };
  }

  checkFormMode() {
    if (this.state.modeChange) return;

    let { getEditRecord } = this.props;

    if (
      getEditRecord &&
      getEditRecord.length > 0 &&
      window.location.href.indexOf("editRecord") > -1
    ) {
      getEditRecord = getEditRecord[0];
      let length = getEditRecord.wFname.length;
      let writers = [];
      if (length >= 1) {
        writers = [
          {
            firstName: getEditRecord.wFname[0],
            lastName: getEditRecord.wLname[0],
            writerID: "writerName0"
          }
        ];
      }
      for (let i = 1; i < getEditRecord.wFname.length; i++) {
        writers.push({
          firstName: getEditRecord.wFname[i],
          lastName: getEditRecord.wLname[i],
          writerID: "writerName" + i
        });
      }

      this.setState({ writers, modeChange: true });
    }
  }

  createWriterFeilds(writer, index) {
    let { writers } = this.state;
    const isAddMoreButton = index === writers.length - 1 ? true : false;
    return (
      <WritersForm
        key={index}
        index={index}
        name={writer}
        addMoreButton={isAddMoreButton}
        writerLength={writers.length}
        onAddMoreWriter={() => this.addWriter()}
        onRemoveWriter={this.removeWriter.bind(this)}
        onWriterChange={this.getWritersNames.bind(this)}
      />
    );
  }

  addWriter() {
    var writers = this.state.writers;
    writers.push({
      firstName: "",
      lastName: "",
      writerID: "writerName" + writers.length
    });
    this.setState({ writers });
  }

  getWritersNames(newWriter) {
    if (newWriter.writerID == "") return;

    let currentWriters = this.state.writers;

    let index = false;
    currentWriters.forEach((writer, i) => {
      if (writer.writerID == newWriter.writerID) {
        index = i;
      }
    });

    currentWriters[index] = newWriter;

    this.setState({ writers: currentWriters });
    this.props.onWriterChange(currentWriters);
  }

  // not finished, currently it's remove the writer, should be given a name to delete.
  removeWriter() {
    var writers = this.state.writers;
    if (writers.length > 1) {
      writers.pop();
      this.setState({ writers: writers });
    }
  }

  render() {
    const { writers } = this.state


    return (
      <div id="writersFeilds">
        <div className="row">
          <strong role="heading" aria-level="3" className="pull-right level3">
            <span>שם המחבר</span>
            <i class="fas fa-user-edit pull-right"></i>
          </strong>
        </div>
        {writers.map((writer, index) =>
          this.createWriterFeilds(writer, index)
        )}
        {this.checkFormMode()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    getEditRecord: state.getEditRecord
  };
};

export default connect(mapStateToProps)(Writers);
