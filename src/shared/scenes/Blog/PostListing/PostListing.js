/* @flow */
import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import GridIcon from 'material-ui/svg-icons/action/view-module';
import ListIcon from 'material-ui/svg-icons/action/view-list';
import type { Post } from '../../../types/models';
import { Grid, Row, Col, Loader } from '../../../components/index';
import PostCard from '../components/PostCard';

type Props = {
  posts: Array<Post>,
  layout: Object,
  isFetching: Boolean,
  listTags: Object,
  handleChangeLayout: () => void
};
const style = {
  position: 'fixed',
  right: '50px',
  bottom: '15vh',
  zIndex: '90',
};
const PostListing = (props: Props) => {
  if (props.isFetching || !props.posts) {
    return (
      <Loader />
    );
  }

  const gridView = (
    <Row>
      {
        props.posts.map((post, i) =>
          <Col key={ i } xs={ 12 } md={ 4 }>
            <PostCard { ...post } listTags={ props.listTags } />
          </Col>)
      }
    </Row>
  );

  const listView = (
    <div>
      {
        props.posts.map((post, i) =>
          <Col key={ i } xs={ 12 }>
            <PostCard { ...post } listTags={ props.listTags } />
          </Col>)
      }
    </div>
  );

  return (
    <Grid>
      {
        props.layout === 'grid' ? gridView : listView
      }
      {
        props.layout === 'grid' ?
        <FloatingActionButton secondary style={ style } onClick={ props.handleChangeLayout } >
          <ListIcon />
        </FloatingActionButton> :
        <FloatingActionButton secondary style={ style } onClick={ props.handleChangeLayout } >
          <GridIcon />
        </FloatingActionButton>
      }
    </Grid>
  );
};

export default PostListing;
