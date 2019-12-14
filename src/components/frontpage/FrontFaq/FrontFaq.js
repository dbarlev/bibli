import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import './FrontFaq.scss';


const data = [
    {
        question: "למה צריך בכלל מערכת לבניית ביבליוגרפיה?",
        answer: `הדבר הכי חשוב בלימודים הוא לכתוב עבודה טובה ואיכותית. לבזבז כמה שפחות זמן על הצד ה"טכני" של כללי הכתיבה האקדמיים ולהשקיע בתוכן העבודה, כדי להפוך אותה לטובה ביותר. ביבלי תחסוך לך את בזבוז זמן מיותר. ובינינו, אף אחד לא אוהב לכתוב ביבליוגרפיה…`
    },
    {
        question: "מה אם אני אצטרך יותר מרשימה ביבליוגרפית אחת?",
        answer: "מערכת ביבלי יכולה להכיל מספר רשימות ביבליוגרפיות שונות. היא גם מאפשרת העברה נוחה של פריטים ביבליוגרפיים בין הרשימות, באופן שלא יאלץ אותך להזין שוב פריט שכבר הוזן. כל הפריטים שלך נשמרים עבורך גם בעבודה הנוכחית וגם לכל העבודות העתידיות שלך."
    },
    {
        question: "מה אני עושה אם יש לי בעיות במערכת?",
        answer: `במידה ונתקלת בבעיות, אפשר לפנות לתמיכה שלנו בעמוד "צור קשר" באתר. אנו משתדלים לבחון כל פנייה לעומק ולהגיב בהקדם.`
    }
];

function FaqItem(props) {

    return (
        <Col md="2" className="faq-item">
            <Row className="text-center">
                <span>
                    <i className="fa fa-question-circle" aria-hidden="true"></i>
                </span>
            </Row>
            <Row>
                <p className="question">{props.question}</p>
            </Row>
            <Row>
                <p className="answer">{props.answer}</p>
            </Row>
        </Col>
    )
}

class FrontFaq extends Component {

    render() {
        return (
            <div id="front-faq">
                <Row >
                    <Col md={3}></Col>
                    {
                        data.map((qa) => {
                            return (
                                <FaqItem
                                    question={qa.question}
                                    answer={qa.answer}
                                />
                            )
                        })
                    }
                </Row>
                <Row>
                    <Col md={5}></Col>
                    <Button className="orange" onClick={() => window.scrollTo(0, 0)} >הבנתי, יאללה להרשמה ></Button>
                    <Button onClick={() => this.props.history.push("/faq")}>לשאלות ותשובות נוספות ></Button>
                </Row>
            </div>
        );
    }
}

export default withRouter(FrontFaq);
