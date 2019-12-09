import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap';

import Header from "../header/Header";


class newWelcome extends Component {
    render() {
        return (
            <Grid fluid className="newWelcomeBg">
            <Row>
                <Header headline="" />
            </Row>
            <Grid>
            <Row>
                <Col md={12} sm={12} className="">
                    <h1 className="bold">ברוכים הבאים ל- Bibli</h1>
                    <p className="BigText">מערכת חכמה לכתיבת ביבליוגרפיות<br /> שמותאמת לכללי הכתיבה האקדמיים (APA).
                    </p>
                    <h3 className="h3 bold">איך זה עובד?</h3>
                    <p className="BigText">מזינים את הפרטים הטכניים במערכת והיא  <br />יוצרת עבורכם דף ביבליוגרפיה מדויק ומסודר.
</p>
                    <p  className="bold BigText">בקיצור, אתם תשקיעו בכתיבת עבודה <br />מצוינת, ואת הביבליוגרפיה תשאירו לנו!</p>
                </Col>

            </Row>
            <Row>
            <Col md={7} sm={12} className="">
               
            </Col>
            </Row> 
            </Grid>
            </Grid>
        )
    }
}

export default newWelcome


