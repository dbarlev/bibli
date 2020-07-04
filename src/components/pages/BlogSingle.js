import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from "react-bootstrap";
import ReactHtmlParser from 'react-html-parser'; 
import { withRouter } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { getSinlePostFromWP } from "../../actions/ajax";
import StickyContact from '../sticky/stickyContact/StickyContact';

class BlogSingle extends Component {
 constructor(props){
     super(props);


 }

    
 componentDidMount() {
    this.props.getSinlePostFromWP(this.props.match.params.postSlug);
    console.log('the post slug is ', this.props.match.params.postSlug);
}


//     wpPosts() {
//         console.log('props ', this.props)
       
    
//     return posts
// }
    render() {
        
        const post = this.props.post
        return (
            <Grid fluid>
                <Header />
                <main id="aboutUs-main">
                    <Row>
                        <Col md={6} mdOffset={3}>
                            <h1>{console.log('props', this.props.post)} </h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} mdOffset={3}>
                          {/* {posts} */}
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

