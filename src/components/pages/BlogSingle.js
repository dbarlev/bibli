import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from "react-bootstrap";
import ReactHtmlParser from 'react-html-parser'; 
import { withRouter } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { getSinlePostFromWP } from "../../actions/ajax";
import StickyContact from '../sticky/stickyContact/StickyContact';
import './BlogSingle.scss';

class BlogSingle extends Component {
    constructor(props){
        super(props);
   
   
    }
    
 componentDidMount() {
    
    this.props.getSinlePostFromWP(this.props.match.params.postSlug);
    console.log('the post slug is ', this.props.match.params.postSlug);
}

    render() {
        const post =this.props.post;
        return (
            
            <Grid fluid>
                <Header />
                <main id="aboutUs-main">
                    <Row>
                        <Col md={6} mdOffset={3}>
                       
                        {
                            this.props.post &&
                            <div>
                            <h1>{ReactHtmlParser(post[0].title.rendered)} </h1>
                            <img style={image} alt="aa" src={post[0]['_links']['wp:featuredmedia'].href} />
                            <p>{console.log('post', post)}</p>

                            <div>{ReactHtmlParser(post[0].content.rendered)} </div>

                            </div>
                           
                            
                        }
                            </Col>
                    </Row>
                </main>
                <StickyContact />
                <Footer />
            </Grid>
        );
    }
}



const mapStateToProps = state => {
    return{
     post: state.PostsFromWPReducer.post
  }
}
export default connect(mapStateToProps, {getSinlePostFromWP})(BlogSingle);

const footerX = {
    position: 'absolute',
    bottom: '0',
    minWidth: '100%',
    padding: '0',
    margin: '0',
    left: '0',
}

const image = {
    width: '100%'
  };
  
  