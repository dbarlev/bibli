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
import { WPapiClient } from '../../common/apiClient';


class BlogSingle extends Component {
    constructor(props){
        super(props);
        this.state = {
            src:'',
            isImgRendered: false
        }
   
    }
    
componentDidMount() {    
    this.props.getSinlePostFromWP(this.props.match.params.postSlug);
    console.log('the post slug is ', this.props.match.params.postSlug);
}

async getrFeaturedImage(){
    if(this.props.post && this.props.post.length > 0 && this.state.isImgRendered == false){
        let serverResponse = await WPapiClient(this.props.post[0]['_links']['wp:featuredmedia'][0].href, "get");
       if(serverResponse){
           console.log('serverResponse', serverResponse)
           this.setState({src: serverResponse.guid.rendered})
           this.setState({isImgRendered: true});
       }
    }
}

    render() {
        const post =this.props.post;
        (async () => {
            await this.getrFeaturedImage();
        })()
       
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
                            <img style={image} alt="aa" src={this.state.src} />

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
  
  