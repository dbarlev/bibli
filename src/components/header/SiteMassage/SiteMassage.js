import React, { Component } from 'react'
import {Row, Col} from 'react-bootstrap';
import './SiteMassage.scss';
import biblio from '../../img/biblio.png';

export default class SiteMassage extends Component {
    render() {
        return (
            <Row id="siteMassage">
               <Col xs={12} className="text-center">
                    <a href="http://old.biblio.co.il" target="_blank">מעבר לאתר הישן
                    <img src={biblio} />
                    </a>
               </Col> 
            </Row>
        )
    }
}
