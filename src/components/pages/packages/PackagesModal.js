import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import PricingTable from './PricingTable';
import './Packages.scss';

const PackagesModal = ({ onPackageChoosen, onClose }) => {
    return (
        <Modal id="registerModal" show={true} autoFocus={true} onHide={() => onClose()}>
            <Modal.Header className="modalHeader" closeButton>
                <div className="text-center">
                    <h2>בחר חבילה</h2>
                </div>
            </Modal.Header>
            <Modal.Body>
                <PricingTable onPackageChoosen={onPackageChoosen} />
            </Modal.Body>
        </Modal>
    );
}


export default PackagesModal;
