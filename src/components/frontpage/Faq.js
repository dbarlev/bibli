import React, { Component } from 'react'
import {Grid, Row, Col} from 'react-bootstrap'; 
import Header from '../header/Header';
import Footer from '../footer/Footer';
import videoPlaceholder from '../img/videoPlaceholder.png';

class Faq extends Component {

    constructor()
    {
      super();
      this.state = {
        qa: 
        [
            {
                question: "לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולורס מונפרד אדנדום",
                answer: "קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידום בעליק. "
            },
            {
                question: "לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולורס מונפרד אדנדום",
                answer: "קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידום בעליק. "
            },
            {
                question: "לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולורס מונפרד אדנדום",
                answer: "קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידום בעליק. "
            },
            {
                question: "לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולורס מונפרד אדנדום",
                answer: "קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידום בעליק. "
            },
            {
                question: "לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולורס מונפרד אדנדום",
                answer: "קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידום בעליק. "
            }
        ]
      }
    }

    populateQuestions()
    {
        const {qa} = this.state;
        if(qa.length == 0)
            return <div></div>;


        
    }

  render() {

    return (
      <Grid fluid id="faq" className="jumbotron-main">
        <Header headline=""/>
        <Row>
            <Col className="text-center" mdOffset={3} md={6}>
                <div>
                    <img id='video-faq' src={videoPlaceholder} />
                </div>
            </Col>
        </Row>
        <Row>
            <Col md={3} mdOffset={3}>
                <div>
                   <h1>שאלות ותשובות</h1>
                </div>
            </Col>
        </Row>
        {
            this.state.qa.map((question) => {
                return(
                    <div>
                        <Row>
                            <Col md={7} mdOffset={3}>
                                <div className="faq-question">
                                    <span>
                                        <i class="fa fa-question-circle" aria-hidden="true"></i>
                                        <span>{question.question} </span>
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
         <Footer />
      </Grid>
     
    )
  }
}

export default Faq
