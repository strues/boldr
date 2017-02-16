// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import { Grid, Row, Col, Heading } from '../../../components/index';
import PostSidebar from '../components/PostSidebar';
import PostContent from '../components/PostContent';
import { getPosts } from '../../../state/modules/blog/posts';
import PostTitle from '../components/PostTitle';
import PostComments from '../components/PostComments';

export type Props = {
  loading: boolean,
  entities: Object,
  currentPost: Object,
};

class SinglePost extends Component {

  props: Props;
  render() {
    const { currentPost, entities } = this.props;
    const PostBg = styled.section`
    max-height: 400px;
    min-height: 400px;
    height: 100%;
    overflow: hidden;
    width: 100%;
    background-size: cover;
    background-attachment: fixed;
    background-image: url(${currentPost.background_image});
    align-items: center;
    background-position-x: 0px;
    background-position-y: 0px;
    margin-bottom: 30px;
  `;
    const postAuthor = entities.users[currentPost.user_id];
    const postComments = currentPost.comments.map(c => entities.comments[c]);

    const postTags = currentPost.tags.map(id => entities.tags[id]);
    return (
        <div>
          <Helmet title={ currentPost.title } />
          <PostBg><PostTitle title={ currentPost.title } /></PostBg>
          <Grid>
            <Row>
              <Col sm={ 12 } md={ 8 } lg={ 9 }>
                <PostContent { ...currentPost } />
                <PostComments
                  comments={ postComments }
                  postId={ currentPost.id }
                  userEntities={ entities.users }
                />
              </Col>
              {
                currentPost.tags
                ? <Col sm={ 12 } md={ 4 } lg={ 3 }>
                    <PostSidebar { ...currentPost } author={ postAuthor } tags={ postTags } />
                  </Col>
                : null
              }
            </Row>
          </Grid>
        </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  // const postComments =
  return {
    entities: state.entities,
    currentPost: state.blog.posts.currentPost,
  };
};

export default connect(mapStateToProps)(SinglePost);
