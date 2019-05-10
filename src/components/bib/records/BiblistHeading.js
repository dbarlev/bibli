import React, {Component} from 'react';
import {connect} from 'react-redux';


class BiblistHeading extends Component {

  render() {
    return (
       <div className="biblistHeading align-right">
            <div className="row">
                <div className="col-sm-5">
                    <h2>ביבליוגרפיה של <strong>{this.props.activeBiblist.Name}</strong></h2>
                </div>
                <div className="col-sm-5">
                    <ul className="list-no-style list-inline" id="biblist-heading-list">
                        <li><i className="fas fa-plus"></i></li>
                        <li><i className="fas fa-plus"></i></li>
                        <li><i className="fas fa-plus"></i></li>
                        <li><i className="fas fa-plus"></i></li>
                    </ul>
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

export default connect(mapStateToProps, {})(BiblistHeading);

