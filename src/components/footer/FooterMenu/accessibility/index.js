import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavItem } from "react-bootstrap";
import { setAccessibility } from '../../../../actions';
import './index.scss';

class Accessibility extends Component {

    constructor() {
        super();
        this.state = {
            isActive: false,
        }
    }

    componentDidMount() {
        if (sessionStorage.getItem("accessibility")) {
            this.addAccessibiityClass();
            this.setState({ isActive: true });
        }
    }

    toggleActivation() {
        const { getAccessibility, setAccessibility } = this.props;
        if (getAccessibility || this.state.isActive) {
            setAccessibility(false);
            sessionStorage.removeItem('accessibility');
            this.setState({ isActive: false });
        }
        else {
            setAccessibility(true);
            sessionStorage.setItem('accessibility', 'true');
            this.setState({ isActive: true });
        }
    }

    isAccessibilityOn() {
        const isAccessibilityOnFromStore = this.props.getAccessibility;
        if (isAccessibilityOnFromStore || this.state.isActive) {
            setAccessibility(true);
            this.addAccessibiityClass();
        }
        else {
            setAccessibility(false);
            this.removeAccessibiityClass();
        }
    }

    addAccessibiityClass() {
        document.getElementById("mainApp").classList.add("contrastMode")
    }


    removeAccessibiityClass() {
        document.getElementById("mainApp").classList.remove("contrastMode")
    }

    render() {
        this.isAccessibilityOn();
        return (
            <div tabindex="0" role="button" onClick={() => this.toggleActivation()} id="accessibility">{this.state.isActive ? "כיבוי נגישות" : "הפעלת נגישות"}</div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        getAccessibility: state.getAccessibility
    }
}
export default connect(mapStateToProps, { setAccessibility })(Accessibility);
