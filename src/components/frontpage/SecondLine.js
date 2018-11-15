import React, { Component } from 'react'
import {Grid, FormGroup, Col, Button, FormControl} from 'react-bootstrap'; 

class SecondLine extends Component {
  render() {
    return (
      <Grid fluid id="secondline" className="text-center">
        <h2>כבר רשומים? התחברו!</h2>
        <form horizontal>
            <FormGroup className="margin-bottom" controlId="">
                <Col xs={12} sm={4}>
                    <FormControl ref="fullName" name="fullName" type="text" onChange={this.onChange} placeholder="הקלד שם מלא"/>
                </Col>
                <Col xs={12} sm={4}>
                    <FormControl ref="email" name="email" type="email" onChange={this.onChange} placeholder="הקלד דואר אלקטרוני"/>
                </Col>
                <Col xs={12} sm={4}>
                    <Button className="full-width-btn" type="submit">התחברו</Button>
                </Col>
            </FormGroup>
        </form>
      </Grid>
    )
  }
}

export default SecondLine
