/* @flow */
import React from 'react';
import Button from 'react-md/lib/Buttons/Button';
import FontIcon from 'react-md/lib/FontIcons';
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
      <div style={ { paddingTop: '20px' } }>
        {
          props.layout === 'grid' ? gridView : listView
        }
        {
          props.layout === 'grid' ?
          <Button floating secondary style={ style } onClick={ props.handleChangeLayout } >
            <FontIcon>view_list</FontIcon>
          </Button> :
            <Button floating secondary style={ style } onClick={ props.handleChangeLayout } >
            <FontIcon>view_module</FontIcon>
          </Button>
        }
      </div>
    </Grid>
  );
};

export default PostListing;
