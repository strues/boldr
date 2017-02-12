// @flow
import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Grid, Row, Col, Heading } from '../../../components/index';
import PostSidebar from '../components/PostSidebar';
import PostContent from '../components/PostContent';
import { getPosts } from '../../../state/modules/blog/posts';
import PostTitle from '../components/PostTitle';
import styled from 'styled-components';

export type Props = {
  loading: boolean,
  entities: Object,
  currentPost: Object,
};

const SinglePost = (props: Props) => {
  const PostBg = styled.section`
    max-height: 400px;
    min-height: 400px;
    height: 100%;
    overflow: hidden;
    width: 100%;
    background-size: cover;
    background-attachment: fixed;
    background-image: url(${props.currentPost.feature_image});
    align-items: center;
    background-position-x: 0px;
    background-position-y: 0px;
    margin-bottom: 30px;
  `;
  const postAuthor = props.entities.users[props.currentPost.user_id];

  const postTags = props.currentPost.tags.map(id => props.entities.tags[id]);
  return (
        <div>
          <Helmet title={ props.currentPost.title } />
          <PostBg><PostTitle title={ props.currentPost.title } /></PostBg>
          <Grid>
            <Row>
              <Col sm={ 12 } md={ 8 } lg={ 9 }>
                <PostContent { ...props.currentPost } />
              </Col>
              {
                props.currentPost.tags
                ? <Col sm={ 12 } md={ 4 } lg={ 3 }>
                    <PostSidebar { ...props.currentPost } author={ postAuthor } tags={ postTags } />
                  </Col>
                : null
              }
            </Row>
          </Grid>
        </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    entities: state.entities,
    currentPost: state.blog.posts.currentPost,
  };
};

export default connect(mapStateToProps)(SinglePost);
