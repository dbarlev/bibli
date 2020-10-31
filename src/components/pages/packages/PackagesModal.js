import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import PricingTable from './PricingTable';
import { connect } from 'react-redux';
import { ShowUpgradeModal, SelectedPackage } from '../../../actions';
import './Packages.scss';

export const PackagesModal = ({ onPackageChoosen, onClose, upgrade = false }) => {
    return (
        <Modal id="registerModal" show={true} autoFocus={true} onHide={() => onClose && onClose()}>
            <Modal.Header className="modalHeader" closeButton>
                <div className="text-center">
                    <h2>בחר חבילה</h2>
                </div>
            </Modal.Header>
            <Modal.Body>
                <PricingTable upgrade={upgrade} onPackageChoosen={onPackageChoosen} />
            </Modal.Body>
        </Modal>
    );
}


export default PackagesModal;