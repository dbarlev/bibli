import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import StickyContact from '../sticky/stickyContact/StickyContact';
import SkipLinks from '../skipLinks';

const skipTo = [
    { id: "faq-mainContent", text: "דלג לאזור המרכזי" },
    { id: "mainMenuRow", text: "דלג לתפריט הראשי" },
    { id: "footer", text: "דלג לסוף העמוד" },
]

class Faq extends Component {

    constructor() {
        super();
        this.state = {
            qa:
                [
                    {
                        question: 'למה צריך בכלל מערכת לבניית ביבליוגרפיה?',
                        answer: 'הדבר הכי חשוב בלימודים הוא לכתוב עבודה טובה ואיכותית. לבזבז כמה שפחות זמן על הצד ה"טכני" של כללי הכתיבה האקדמיים ולהשקיע בתוכן העבודה, כדי להפוך אותה לטובה ביותר. ביבלי תחסוך לך את בזבוז זמן מיותר. ובינינו, אף אחד לא אוהב לכתוב ביבליוגרפיה…'
                    },
                    {
                        question: 'איך עובדים עם זה בפועל?',
                        answer: 'כל מה שעליך לעשות זה להזין את הפרטים היבשים לתוך הטבלה: שם המחבר, שנה, סוג הפריט הביבליוגרפי וכדומה. מערכת ביבלי כבר תדאג לסדר אותם לפי כללי הכתיבה האקדמית (APA בלבד) ולהציב את הפריט במקום הנכון ברשימה. ברגע שסיימת, פשוט צריך להעתיק את זה (בלחיצת כפתור) ולהוסיף לעמוד הביבליוגרפיה של העבודה.'
                    },
                    {
                        question: 'האם האתר מתאים לכל סוגי הביבליוגרפיות ולכל כללי הכתיבה האקדמית?',
                        answer: 'בשלב זה לא. כרגע האתר מתאים לכללי הכתיבה האקדמית של ה-APA. בהמשך יתווספו דרכי כתיבה נוספות אבל בינתיים'
                    },
                    {
                        question: 'מה אם אני אצטרך יותר מרשימה ביבליוגרפית אחת?',
                        answer: 'מערכת ביבלי יכולה להכיל מספר רשימות ביבליוגרפיות שונות. היא גם מאפשרת העברה נוחה של פריטים ביבליוגרפיים בין הרשימות, באופן שלא יאלץ אותך להזין שוב פריט שכבר הוזן. כל הפריטים שלך נשמרים עבורך גם בעבודה הנוכחית וגם לכל העבודות העתידיות שלך.'
                    },
                    {
                        question: 'כתבתי את אחד הפריטים הביבליוגרפיים לא נכון. מה עושים?',
                        answer: 'ניתן לערוך פריטים ביבליוגרפיים בקלות ובפשטות - בלחיצה על כפתור ה"עריכה" שמופיע לצד הפריט.'
                    },
                    {
                        question: 'מה אני עושה אם יש לי בעיות במערכת?',
                        answer: 'במידה ונתקלת בבעיות, אפשר לפנות לתמיכה שלנו בעמוד "צור קשר" באתר. אנו משתדלים לבחון כל פנייה לעומק ולהגיב בהקדם.'
                    },
                    {
                        question: 'האם אתם יכולים להתחייב שלא ירד לי ציון בעקבות השימוש בביבלי?',
                        answer: 'לצערנו לא (ואנחנו גם מקפידים לציין את זה בתקנון שלנו). המערכת מספקת ביבליוגרפיה קלה ונוחה לכתיבה עבורך, אך האחריות לעבור עליה פעם אחת נוספת ולבחון שהכל בסדר היא עדיין שלך. בכל אופן, אתר ביבלי אינו אחראי לשימוש שנעשה בו וכל שימוש שתעשה בו הוא באחריותך בלבד'
                    },

                ]
        }
    }

    componentDidMount() {
        document.querySelector("title").textContent = "ביבלי | שאלות ותשובות";
    }

    populateQuestions() {
        const { qa } = this.state;
        if (qa.length == 0)
            return <div></div>;



    }

    render() {

        return (
            <Grid fluid id="faq" className="jumbotron-main">
                <SkipLinks skipTo={skipTo} />
                <Header headline="" />
                <main id="faq-mainContent">
                    <Row>
                        <Col md={3} mdOffset={3}>
                            <div>
                                <h1>שאלות ותשובות</h1>
                            </div>
                        </Col>
                    </Row>
                    {
                        this.state.qa.map((question) => {
                            return (
                                <div>
                                    <Row>
                                        <Col md={7} mdOffset={3}>
                                            <div className="faq-question">
                                                <span>
                                                    <i class="fa fa-question-circle" aria-hidden="true"></i>
                                                    <span className="bold">{question.question} </span>
                                                </span>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={7} mdOffset={3}>
                                            <div className="faq-answer">
                                                <span>
                                                    <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                                                    <span>{question.answer} </span>
                                                </span>
                                            </div>
                                            <hr />
                                        </Col>
                                    </Row>
                                </div>
                            )
                        })
                    }
                </main>
                <StickyContact />
                <Footer />
            </Grid>

        )
    }
}

export default Faq
