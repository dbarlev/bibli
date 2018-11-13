import React, { Component } from 'react'
import {Grid, Row, Col, FormControl } from 'react-bootstrap';


class InfoIcons extends Component {
  render() {
    return (
      <Grid id="infoicons">
        <Row>
        <h2 className="text-right">למה להשתמש בביבלי?</h2>
            <Col className="grey-bg" xs={12} sm={6}>
                 <h3 className="text-right">התוכניות שלנו</h3>
            </Col>
        </Row>
      </Grid>
    )
  }
}

export default InfoIcons
