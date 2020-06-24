import React, { Component } from 'react'
import { connect } from 'react-redux'
class Blog extends Component {
    render() {
        return (
            <div>
                {this.props.posts}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return{
     posts: state.PostsFromWPReducer.posts
  }
}
export default connect(mapStateToProps, null)(Blog);

