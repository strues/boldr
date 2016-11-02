/* @flow */
import React from 'react';

import { Grid, Row, Col } from 'components/index';
import PostCard from '../components/PostCard';

export type Props = {posts?: Array<any>};

const PostListing = (props: Object) => {
  if (!props.posts) {
    return (
      <div>Loading</div>
    );
  }
  return (
    <Grid fluid>
      <Row>
          {
            props.posts.map((post, i) =>
              <Col key={ i } xs={ 12 } md={ 4 }>
                <PostCard { ...post } />
              </Col>)
          }
      </Row>
    </Grid>
  );
};

export default PostListing;
