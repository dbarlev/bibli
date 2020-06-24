import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import Select from 'react-select';
import { addRecordFromStorage } from '../services/addRecordFromStorage';
import { apiClient } from '../../../common/apiClient';
import './chooseBiblist.scss';

class ChooseBiblist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: props.biblist[0],
            defaultLabel: props.biblist[0].label
        }
    }



    render() {
        const { selectedOption, defaultLabel } = this.state;

        return (
            <Modal id="chooseBiblistModal" size="sm" show={true}>
                <Modal.Header className="modalHeader">
                    <div className="text-center">
                        <h2>רשימת העבודות שלך</h2>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div id="selectLabel">בחרו את העבודה שאליה תרצו לשייך את הפריט ביבליוגרפי</div>
                    <Select
                        aria-labelledby="selectLabel"
                        label={defaultLabel}
                        value={selectedOption}
                        onChange={(selectedOption) => this.setState({ selectedOption })}
                        options={this.props.biblist}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button className="cancel" onClick={() => this.props.closeModal()}>ביטול</Button>
                    <Button onClick={() => this.props.onBiblistChosen(selectedOption)} className="okButton">אישור</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}


export default withRouter(ChooseBiblist);
