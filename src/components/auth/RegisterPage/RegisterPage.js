import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import './RegisterPage.scss';
import HeaderLogin from "../../header/HeaderLogin";
import ListOfBiblist from "../../bib/listOfRecords/ListOfBiblist";
import StickyContact from "../../sticky/stickyContact/StickyContact";
import RegisterModal from "../../Modal/RegsiterModal/RegisterModal";

class RegisterPage extends Component {



    render() {
        return (
            <div className="App">
                <HeaderLogin />
                <br />
                <div className="mainArea userBiblist">
                    <div className="row">
                        <div className="col-md-2 col-md-offset-2 col-sm-4 col-xs-12">
                            <ListOfBiblist />
                        </div>
                        <div className="col-md-8 col-sm-8" >
                            <RegisterModal />
                        </div>
                    </div>
                </div>
                <StickyContact />
                <footer />
            </div>
        );
    }
}

export default withRouter(RegisterPage);
