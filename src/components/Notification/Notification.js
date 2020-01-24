import React, { Component } from 'react';
import { connect } from "react-redux";
import { NotificationContainer, NotificationManager } from 'react-notifications';

class Notification extends Component {

    display() {
        if (!!this.props.notificationList.length) {
            this.props.notificationList.map(() => {
                NotificationManager.success('Success message', 'Title here');
            });
        }

        return <NotificationContainer />;
    }
    render() {
        return this.display()
    }
}

const mapStateToProps = state => {
    return {
        activeBiblistData: state.activeBiblist,
        getBiblistNamesFromDB: state.getBiblistNamesFromDB,
        exportData: state.recordsDataForExport,
        notificationList: state.notificationList
    };
};

export default connect(mapStateToProps, null)(Notification);
