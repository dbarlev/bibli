import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import StickyContact from '../sticky/stickyContact/StickyContact';
import SkipLinks from '../skipLinks';

const skipTo = [
    { id: "aboutUs-main", text: "דלג לאזור המרכזי" },
    { id: "mainMenuRow", text: "דלג לתפריט הראשי" },
    { id: "footer", text: "דלג לסוף העמוד" },
]

class Odot extends Component {

    componentDidMount() {
        document.querySelector("title").textContent = "ביבלי | אודות";
    }

    render() {
        return (
            <Grid fluid id="Odot">
                <SkipLinks skipTo={skipTo} />
                <Header />
                <main id="aboutUs-main">
                    <Row>
                        <Col md={6} mdOffset={3}>
                            <h1>מי אנחנו?</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} mdOffset={3}>
                            <div>
                                <p>
                                    כמו כל הברקה טובה, גם ביבלי נולדה מתוך צורך. צורך שלאט לאט קיבל חיים משל עצמו.
                                    אחרי הכל, את הסיפור הזה כל סטודנט מכיר:
                                </p>
                                <p>
                                    עובדים קשה על העבודה, כותבים, משנים, מתלבטים... ואז ממש לקראת הסוף מגיע הסיוט הגדול: כתיבת הביבליוגרפיה.
                                </p>
                                <p>
                                    סטודנטים באקדמיה נאבקים מזה שנים בכללי הכתיבה האקדמית הסבוכים ורבים כבר הגיעו לסף ייאוש.
                                    האמת? זה אפילו לא חלק חיוני כל כך בעבודה כפי שאפשר להניח.
                                </p>
                                <p>
                                    בואו לא נשכח שכללי הכתיבה האקדמית הם לא חלק בלתי נפרד מהאקדמיה שחובה לשנן – אלא בסך הכל רשימת כללים שנועדה לשמור על אחידת בכתיבת המקורות האקדמיים, מטעמי נוחות. הנוחות הזו מחייבת צורת כתיבה אחידה.
                                    אלא שנראה שבלי ששמנו לב, הגולם קם על יוצרו וכעת העבודה מתחלקת לשניים: מחציתה כתיבת גוף העבודה, התוכן והמהות, בעוד המחצית השנייה היא הכנת הביבליוגרפיה – רשימת המקורות האקדמיים.
                                </p>
                                <h2>ואז הגיעה ביבלי.</h2>
                                <p>
                                    המערכת נוצרה לפני מספר שנים במטרה אחת פשוטה: לאפשר לסטודנטים לחזור ולהתמקד בתוכן איכותי לעבודה, על ידי הפיכת תהליך כתיבת הביבליוגרפיה לפשוט.
                                </p>
                                <p>
                                    במשך מספר שנים המערכת צברה מפה לאוזן כמה אלפי משתמשים שמצאו סוף סוף את הזמן להתמקד בדבר החשוב באמת: גוף העבודה שלהם.
                                </p>

                            </div>
                        </Col>
                    </Row>
                </main>
                <StickyContact />
                <Footer bottom />
            </Grid>
        );
    }
}

export default Odot;
