// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row } from 'components/index';
import PostSidebar from '../components/PostSidebar';
import PostContent from '../components/PostContent';

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
    posts: state.blog.posts,
    currentPost: state.blog.posts.bySlug[ownProps.params.slug],
  };
};

export default connect(mapStateToProps)(SinglePost);
