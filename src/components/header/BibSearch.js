import React, { Component } from 'react'
import {Nav, Navbar,Badge, NavItem,InputGroup, MenuItem, Button, FormGroup, FormControl } from 'react-bootstrap';
import { BibSearchAction } from '../../actions/ajax';

import { connect } from 'react-redux';

class BibSearch extends Component {

    state = {
        q: '',
        r: ''
    }

    //shows search results after response comes back from the api
    handleFetchResults = async results => {
        await this.props.BibSearchAction(results);  
        this.setState({r: this.props.searcResults})
    }

    onChange = (e) =>{
        e.preventDefault();
        this.setState({q: e.target.value})
        console.log('q', this.state)

        // this.viewResults(this.props.searcResults);
        this.handleFetchResults(this.state.q)

    }
    render() {
    
        const sr = this.props.searcResults.map(res => {
            return(
                <li key={res && res.bookid}>
                    <div className="row">
                        <div className="col-xs-9 text-right">
                            <h5 className="resultBookTitle">{res.articleHeadline}</h5>
                      
                            <div>מחבר:  <span>{res.writers}</span></div>
                            <div>שנת פרסום: {res.year}</div>
                        </div>
                        <div className="col-xs-3 addToList">
                        <button className="addToListBtn">הוסף לרשימה<i class="fa fa-chevron-left black" aria-hidden="true"></i></button>
                    </div>
                    </div>
                </li>
            );
    });

        return (
         <div>
            <FormGroup className="searchArea">
            {console.log('this.state.r ',this.state.r)}
            
                
                <InputGroup>
                    <FormControl className="searchRecord" name="bibsearch" onChange={this.onChange} placeholder="חיפוש מאמר" type="text" />
                    <InputGroup.Button>
                        <Button className="searchRecordBtn"><i className="fas fa-search"></i></Button>
                    </InputGroup.Button>
                </InputGroup>
                <ul id="searchresults" className={this.props.searcResults.length > 1 ? 'open' : ''}>
                {this.state.q ? sr : ''}
            </ul>
            </FormGroup>            
           
        </div>
        )
    }
}

const MapStateToProps = state => {
    return {
        searcResults: state.searcResultsReducer
    }
}
export default connect(MapStateToProps, {BibSearchAction})(BibSearch);
