import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap';
import './SiteMassage.scss';
import biblio from '../../img/biblio.png';

export default class SiteMassage extends Component {
    render() {
        return (
            <Row id="siteMassage">
                <Col xs={12} className="text-center">
                    <span>ברוכים הבאים לממשק החדש של ביבלי. מוזמנים להירשם ולהתרשם.</span>
                    <a href="http://old.biblio.co.il" target="_blank" className="bold">לחזרה לממשק הישן לחצו כאן
                    <img alt="לוגו של ביבליו הממשק הישן" src={biblio} />
                    </a>
                </Col>
            </Row>
        )
    }
}