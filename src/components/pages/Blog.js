import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from "react-bootstrap";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { getPostsFromWp } from "../../actions/ajax";
import StickyContact from '../sticky/stickyContact/StickyContact';
class Blog extends Component {

    // componentWillMount() {
    //     getPostsFromWp();
    // }

    render() {
        const wpPosts = this.props.posts.map(post => (
            <div key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <button>קראו עוד</button>
            </div>
        ))
        return (
            <Grid fluid id="Odot">
                <Header />
                <main id="aboutUs-main">
                    <Row>
                        <Col md={6} mdOffset={3}>
                            <h1>בלוג</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} mdOffset={3}>
                          {wpPosts}
                        </Col>
                    </Row>
                </main>
                <StickyContact />
                <Footer bottom />
            </Grid>
        );
    }

}

const mapStateToProps = state => {
    return{
     posts: state.PostsFromWPReducer.posts
  }
}
export default connect(mapStateToProps, getPostsFromWp)(Blog);

