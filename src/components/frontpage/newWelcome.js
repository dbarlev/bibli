import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap';
import FrontRegister from '../auth/FrontRegister';

class newWelcome extends Component {
    render() {
        return (
            <Row className="newWelcomeBg">
                <Col mdOffset={4} md={4} sm={12} className="MTextPaddingTop">
                    <h1 className="bold">ברוכים הבאים ל- Bibli</h1>
                    <p className="BigText">מערכת חכמה לכתיבת ביבליוגרפיות<br /> שמותאמת לכללי הכתיבה האקדמיים (APA).
                    </p>
                    <h3 className="h3 bold">איך זה עובד?</h3>
                    <p className="BigText">מזינים את הפרטים הטכניים במערכת והיא יוצרת עבורכם דף ביבליוגרפיה מדויק ומסודר.
</p>
                    <p  className="bold BigText">בקיצור, אתם תשקיעו בכתיבת עבודה מצוינת, ואת הביבליוגרפיה תשאירו לנו!</p>
                </Col>
                <Col  md={3} sm={12} xs={12} className="frontRegisterFormCont FormPaddingTop">
                    <Row>
                        <Col >
                            <FrontRegister />
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}

export default newWelcome


const SCMTextPaddingTop = {
    paddingTop: "5vh",
    paddingRight: "18vh"
};

const SCFormPaddingTop = {
    backgroundColor: "#fff",
    paddingTop: "108px",
    paddingBottom: "36px"
};

const SCBigText = {
    fontSize: "1.3vw",
    marginBottom: "1.11vh"
};

const SCh3 = {
    fontSize: "1.3vw",
    marginBottom: "1.11vh",
    marginTop: "1.11vh"
};
