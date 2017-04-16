/* @flow */

import React, {Component} from 'react';
import {Grid, Col, Row, Loader} from 'boldr-ui';

import {fetchTagPosts} from '../../../state/modules/blog/tags/actions';
import PostCard from '../components/PostCard';

type Props = {
  posts: Array<Post>,
  listTags: Object,
};

const TagList = (props: Props) => {
  if (!props.posts) {
    return <Loader />;
  }
  return (
    <div>
      <Grid fluid>
        <Row>
          {props.posts.map(post => (
            <Col key={post.id} xs={12} md={4}>
              <PostCard listTags={props.listTags} {...post} />
            </Col>
          ))}
        </Row>
      </Grid>
    </div>
  );
};

export default TagList;
