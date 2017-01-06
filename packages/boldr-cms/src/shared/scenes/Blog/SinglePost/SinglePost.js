// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row } from '../../../components/index';
import PostSidebar from '../components/PostSidebar';
import PostContent from '../components/PostContent';
import { getPosts } from '../../../state/modules/blog/posts';

export type Props = {
  loading: boolean,
  currentPost: Object,
};

const SinglePost = (props: Props) => {
  return (
      <Grid>
        <Row>
          <PostContent { ...props.currentPost } />
          <PostSidebar { ...props.currentPost } />
        </Row>
      </Grid>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentPost: state.blog.posts.currentPost,
  };
};

export default connect(mapStateToProps)(SinglePost);
