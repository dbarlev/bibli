import React from 'react';

import {
    Grid,
    Col,
    Row,
    Tab,
    Tabs
} from "react-bootstrap";
import './Checkout.scss';
import Header from "../../../header/Header";
import StickyContact from '../../../sticky/stickyContact/StickyContact';


import '../Packages.scss';
import Zcredit from './Zcredit';

class Checkout extends React.Component {
    constructor() {
        super();

        this.state = {
            package: '1'
        }
    }


    ToggleButtonExample = () => {

        const radios = [
            { name: 'Active', value: '1' },
            { name: 'Radio', value: '2' }
        ];


    }
    render() {
        return (
            <Grid>

                <Header />
                <main>
                    <Row>
                        <Col md={6} mdOffset={3}>
                            <h1>הזינו את פרטי התשלום </h1>
                        </Col>
                    </Row>

                    <Row>
                        <Zcredit package={this.state.package} />
                    </Row>
                </main>
                <StickyContact />

            </Grid>
        )
    }
}
export default Checkout;