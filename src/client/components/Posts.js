import { connect } from 'react-redux'
import React from 'react';
import { browserHistory } from 'react-router'
import { PropTypes } from 'react';
import { createPost, logOut, getPosts, getUserData } from '../actions/index'
import $ from 'jquery'

const Posts = React.createClass({
  getInitialState() {
    return { body: '' }
  },
  componentWillMount() {
    if (!this.state.user) {
      this.props.getUserData()
    }
    this.props.getPosts()
  },
  updateProperty(e) {
    this.state[e.target.name] = e.target.value
    this.setState(this.state)
  },
  createPost() {
    this.props.createPost({
      user_id: this.props.user.user_data.id,
      user_name: this.props.user.user_data.email,
      body: this.state.body
    })

    $('#input').val('')
    this.setState({body: ''})
  },
  renderPosts() {
    return this.props.posts.map((post, idx) => {
      return (
        <div key={idx}>
          <p>{post.body}</p>
          <p>{post.user_name}</p>
          <p>{post.createdAt}</p>
        </div>
      )
    })
  },
  render() {
    return (
      <div>
        <h2>Post Time!</h2>
        <input id='input' type='text' onChange={this.updateProperty} name='body' placeholder="What's on your mind?"/>
        <button onClick={this.createPost}>Post</button>
        <button onClick={this.props.logOut}>Log Out</button>
        <div>
          { this.renderPosts() }
        </div>
      </div>
    )
  }
})

Posts.propTypes = {
  user: PropTypes.object,
  posts: PropTypes.array,
  createPost: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  getUserData: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
};

const mapStateToProps = ( {user, posts} ) => {
    return {user, posts}
}

const PostsContainer = connect(
  mapStateToProps,
  { createPost, logOut, getPosts, getUserData }
)(Posts);

module.exports = PostsContainer;
