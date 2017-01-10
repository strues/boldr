// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row } from '../../../components/index';
import PostSidebar from '../components/PostSidebar';
import PostContent from '../components/PostContent';
import { getPosts } from '../../../state/modules/blog/posts';

export type Props = {
  loading: boolean,
  entities: Object,
  currentPost: Object,
};

const SinglePost = (props: Props) => {
  const postAuthor = props.entities.users[props.currentPost.author];
  const postTags = props.currentPost.tags.map(id => props.entities.tags[id]);
  return (
      <Grid>
        <Row>
          <PostContent { ...props.currentPost } />
          <PostSidebar { ...props.currentPost } author={ postAuthor } tags={ postTags } />
        </Row>
      </Grid>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    entities: state.entities,
    currentPost: state.blog.posts.currentPost,
  };
};

export default connect(mapStateToProps)(SinglePost);
