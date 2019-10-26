import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap';
import FrontRegister from '../auth/FrontRegister';

class newWelcome extends Component {
    render() {
        return (
            <Row className="newWelcomeBg">
                <Col mdOffset={4} md={4} sm={12} style={SCMTextPaddingTop}>
                    <h1 className="bold">ברוכים הבאים ל- Bibli</h1>
                    <p style={SCBigText}>מערכת חכמה לכתיבת ביבליוגרפיות שמותאמת לכללי הכתיבה האקדמיים (APA).
                    </p>
                    <h3 className="bold" style={SCh3}>איך זה עובד?</h3>
                    <p style={SCBigText}>מזינים את הפרטים הטכניים במערכת והיא יוצרת עבורכם דף ביבליוגרפיה מדויק ומסודר.
כל מה שנותר לכם לעשות הוא פשוט לייצא ולצרף לעבודה שלכם.
</p>
                    <p style={SCBigText} className="bold">בקיצור, אתם תשקיעו בכתיבת עבודה מצוינת - ואת הביבליוגרפיה תשאירו לנו!</p>
                </Col>
                <Col  md={3} sm={12} style={SCFormPaddingTop}>
                    <Row>
                        <Col className="frontRegisterFormCont">
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
    paddingTop: "8vh"
};

const SCFormPaddingTop = {
    backgroundColor: "#fff",
    paddingTop: "100px"
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
