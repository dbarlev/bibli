import React, { Component } from 'react'
import {Grid, Row, Col, FormControl, Image, Glyphicon } from 'react-bootstrap';


class InfoIcons extends Component {
  render() {
    return (
      <Grid id="infoicons"> 
        <Row className="m50bottom">
        <h2 className="text-center big-title bold">ממה נהנים משתמשי Bibli?</h2>
            <Col className="text-center" xs={12} sm={4}>
            <div className="m50bottom"> 
              <div className="lightBlueBG blob1"></div>   
              <i class="fas fa-graduation-cap fa-7x"></i>
            </div>
                
                 <h3 className="text-">מערכת חכמה ליצירת</h3>
                 <h3 className="text-center secondH3">ביבליוגרפיה תקנית</h3>
            </Col>
            <Col  className="text-center" xs={12} sm={4}>
            <div className="m50bottom"> 
            <div className="lightBlueBG blob2"></div>   
            <i class="fas fa-clock fa-7x"></i>
            </div>
                 <h3 className="text-center">יותר זמן להתעמק</h3>
                 <h3 className="text-center secondH3">בגוף העבודה שלכם</h3>
            </Col>
            <Col className="text-center" xs={12} sm={4}>
            <div className="m50bottom"> 
              <div className="lightBlueBG blob3"></div>   
              <i class="fas fa-file-download fa-7x"></i>
            </div>
      
                 
                 
                 <h3 className="text-center">יצוא בקלות</h3>
                 <h3 className="text-center secondH3">למסמך וורד</h3>
            </Col>
          
        </Row>
      </Grid>
    )
  }
}

export default InfoIcons
