import React, { Component } from 'react'
import {Grid, Row, Col} from 'react-bootstrap';
import FrontRegister from '../auth/FrontRegister';

class newWelcome extends Component {
    render() {
        return (
            <Row className="newWelcomeBg">
               <Col mdOffset={8} md={4}>
                    <FrontRegister />
               </Col>
            </Row>
        )
    }
}

export default newWelcome


const bg = {
    backgroundImage: "url(../../../img/main-bibli-bg-image.jpg)"
};
