import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from "react-bootstrap";
import ReactHtmlParser from 'react-html-parser'; 
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { getPostsFromWp } from "../../actions/ajax";
import StickyContact from '../sticky/stickyContact/StickyContact';
import { WPapiClient } from '../../common/apiClient';
class Blog extends Component {
 constructor(props){
     super(props);
     this.state = {
        src:'',
        isImgRendered: false
    }

 }

    
    componentWillMount() {
        this.props.getPostsFromWp();
    }



async getrFeaturedImage(postid){
    if(this.props.post && this.props.post.length > 0 && this.state.isImgRendered == false){
        let serverResponse = await WPapiClient(this.props.post[postid]['_links']['wp:featuredmedia'][0].href, "get");
       if(serverResponse){
           console.log('serverResponse', serverResponse)
           this.setState({src: serverResponse.guid.rendered})
           this.setState({isImgRendered: true});
       }
    }
}
    render() {
      



        const posts = this.props.posts && this.props.posts.map(post => {return(
            <div key={post.id}>

                {console.log('post ', post)}
                <h2>{ReactHtmlParser(post.title.rendered)}</h2>
                {this.state.src &&
                    <img  alt="aa" src={this.state.src} />
                }
                <p>{ReactHtmlParser(post.excerpt.rendered)}</p>
                 <Link to={"/blog/"+ post.slug} >קראו עוד</Link>
            </div>
            )}
            
            )


            
         
        return (
            <Grid fluid>
                <Header />
                <main id="aboutUs-main">
                    <Row>
                        <Col md={6} mdOffset={3}>
                            <h1>בלוג</h1>
                            
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} mdOffset={3}>
                          {posts}
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
     posts: state.PostsFromWPReducer.posts
  }
}
export default connect(mapStateToProps, {getPostsFromWp})(Blog);

