/* @flow */
import React from 'react';
import Paper from 'material-ui/Paper';
import type { Post } from 'types/models';
import { Grid, Row, Col, Icon } from 'components/index';
import PostCard from '../components/PostCard';

const styled = require('styled-components').default;

export type Props = {
  posts: Array<Post>,
  layout: Object,
  handleChangeLayout: () => void
};
const RightSeg = styled.div`
  float: right;
  flex-direction: column;
`;
const PostListing = (props: Props) => {
  if (!props.posts) {
    return (
      <span>Loading...</span>
    );
  }

  const gridView = (
    <Row>
      {
        props.posts.map((post, i) =>
          <Col key={ i } xs={ 12 } md={ 4 }>
            <PostCard { ...post } />
          </Col>)
      }
    </Row>
  );

  const listView = (
    <div>
      {
        props.posts.map((post, i) =>
          <Col key={ i } xs={ 12 }>
            <PostCard { ...post } />
          </Col>)
      }
    </div>
  );

  return (
    <Grid>
      <Paper zDepth={ 2 }>
        Recent Posts
        <RightSeg>
          {
            props.layout === 'grid' ?
            <Icon kind="list-view" color="#222" onClick={ props.handleChangeLayout } /> :
            <Icon kind="grid-view" color="#222" onClick={ props.handleChangeLayout } />
          }
        </RightSeg>
      </Paper>
      {
        props.layout === 'grid' ? gridView : listView
      }
    </Grid>
  );
};

export default PostListing;
