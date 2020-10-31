import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ShowUpgradeModal, SelectedPackage } from '../../../actions';
import PackagesModal from './PackagesModal';
import { withRouter } from 'react-router-dom';
import './Packages.scss';


export const UpgradePackagesModal = ({ ShowUpgradeModal, SelectedPackage, history }) => {
    const onPackageChoosen = (data) => {
        SelectedPackage(data);
        history.push("/checkout");
    }

    return (
        <PackagesModal upgrade={true} onClose={() => ShowUpgradeModal(false)} onPackageChoosen={onPackageChoosen} />
    )
}


export default connect(null, { ShowUpgradeModal, SelectedPackage })(withRouter(UpgradePackagesModal));