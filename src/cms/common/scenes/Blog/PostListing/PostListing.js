/* @flow */
import React from 'react';
import { Loader } from 'semantic-ui-react';
import { Grid, Row, Col } from 'components/index';
import PostCard from '../components/PostCard';
import type { Post } from '../../../types/models';

export type Props = { posts?: Array<Post> };

const PostListing = (props: Props) => {
  if (!props.posts) {
    return (
      <Loader content="loading" />
    );
  }

  return (
    <div style={ { paddingTop: '50px' } }>
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
    </div>
  );
};

export default PostListing;
