/* @flow */

import React, { Component } from 'react';
import { Grid, Col, Row, Loader } from '../../../components';
import { fetchTaggedPost } from '../../../state/modules/blog/tags/actions';
import type { Post } from '../../../types/models';
import PostCard from '../components/PostCard';

type Props = {
  posts: Array<Post>,
  name: string,
  isFetching: boolean,
  listTags: Object,
};

const TagList = (props: Props) => {
  if (props.isFetching || !props.posts) {
    return (
      <Loader />
    );
  }
  return (
      <div style={ { paddingTop: 50 } }>
        <Grid fluid>
          <Row>
          {
            props.posts.map((post, i) => (
              <Col key={ i } xs={ 12 } md={ 4 }>
                <PostCard key={ i } listTags={ props.listTags } { ...post } />
              </Col>
            ),
            )
          }
          </Row>
        </Grid>
      </div>
  );
};

export default TagList;
