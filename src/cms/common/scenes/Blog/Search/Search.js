
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import PostCard from '../components/PostCard';

export type Props = {posts?: Object};

class Search extends Component {
  props: Props;
  render() {
    return (
      <div>
        {
          this.props.posts.data.map(post =>
            <div key={ post.id } className="post__grid-item">
              <PostCard { ...post } />
            </div>)
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts,
    isLoading: state.posts.isLoading
  };
};

export default connect(mapStateToProps)(Search);
