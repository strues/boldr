// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Grid, Col, Row } from 'components/index';
import { Segment } from 'semantic-ui-react';
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
          <Col xs={ 12 } md={ 8 } lg={ 9 }>
              <Segment>
              <PostContent { ...props.currentPost } />
              </Segment>
            </Col>
            <Col xs={ 12 } md={ 4 } lg={ 3 }>
              <PostSidebar { ...props.currentPost } />
            </Col>
          </Row>
        </Grid>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts,
    currentPost: state.posts.bySlug[ownProps.params.slug],
  };
};

export default connect(mapStateToProps)(SinglePost);
