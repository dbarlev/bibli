import React, { Component } from 'react'
import {Nav, Navbar,Badge, NavItem,InputGroup, MenuItem, Button, FormGroup, FormControl } from 'react-bootstrap';
import { BibSearchAction } from '../../actions/ajax';
import { connect } from 'react-redux';

class BibSearch extends Component {

    state = {
        q: ''
    }


    onChange = (e) =>{
        e.preventDefault();
        this.setState({q: e.target.value})
        console.log('q', this.state)
    }
    render() {

        return (
         
            <FormGroup className="searchArea">
            {console.log('pr ',this.props)}
                <InputGroup>
                    <FormControl className="searchRecord" name="bibsearch" onChange={this.onChange} placeholder="חיפוש מאמר" type="text" />
                    <InputGroup.Button>
                        <Button className="searchRecordBtn"><i className="fas fa-search"></i></Button>
                    </InputGroup.Button>
                </InputGroup>
            </FormGroup>            
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        BibSearchAction: (params) => dispatch(BibSearchAction(params))
    };
};

export default connect(null, mapDispatchToProps)(BibSearch);
