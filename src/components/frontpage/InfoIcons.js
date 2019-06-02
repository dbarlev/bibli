import React, { Component } from 'react'
import {Grid, Row, Col, FormControl, Image } from 'react-bootstrap';
import hat from './../img/hat.jpg';
import clock from './../img/clock.jpg';
import hands from './../img/hands.jpg';
import screens from './../img/screens.jpg';

class InfoIcons extends Component {
  render() {
    return (
      <Grid id="infoicons">
        <Row className="m50bottom">
        <h2 className="text-center big-title bold blue">למה להשתמש בביבלי?</h2>
            <Col className="text-center" xs={12} sm={6}>
                  <Image src={hat} />
                 <h3 className="text-">ביבליו יוצרת עבורך ביבליוגרפיה</h3>
                 <h3 className="text-center">תקניתואטומטית על פי כללי ה -APA.</h3>
            </Col>
            <Col  className="text-center" xs={12} sm={6}>
                  <Image src={clock} />
                 <h3 className="text-center">יצירת ביבליוגרפיה במהירות</h3>
                 <h3 className="text-center">משאירה יותר זמן להתעסק בעבודה עצמה</h3>
            </Col>
          </Row>
          <Row className="m50bottom">
            <Col className="text-center" xs={12} sm={6}>
                  <Image src={hands} />
                 <h3 className="text-center">מערכת חכמה ליצירת מספר רשימות</h3>
                 <h3 className="text-center">ולהעברת פריטים ביבליוגרפיים בקלות</h3>
            </Col>
            <Col className="text-center" xs={12} sm={6}>
                  <Image src={screens} />
                 <h3 className="text-center">האתר מותאם לכל סוגי המכשירים</h3>
                 <h3 className="text-center">תוכלו לבצע שינוים מכל מקום ובכל זמן</h3>
            </Col>
        </Row>
      </Grid>
    )
  }
}

export default InfoIcons
