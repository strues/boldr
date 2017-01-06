/* @flow */
import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import GridIcon from 'material-ui/svg-icons/action/view-module';
import ListIcon from 'material-ui/svg-icons/action/view-list';
import type { Post } from '../../../types/models';
import { Grid, Row, Col } from '../../../components/index';
import PostCard from '../components/PostCard';

type Props = {
  posts: Array<Post>,
  layout: Object,
  handleChangeLayout: () => void
};

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
            <PostCard { ...post } />
          </Col>)
      }
    </div>
  );
  const style = {
    position: 'fixed',
    right: '50px',
    bottom: '15vh',
    zIndex: '90',
  };
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
