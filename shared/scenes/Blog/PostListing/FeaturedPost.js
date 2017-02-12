/* @flow */
import React from 'react';
import Button from 'react-md/lib/Buttons/Button';
import FontIcon from 'react-md/lib/FontIcons';
import type { Post } from '../../../types/models';
import { Grid, Row, Col, Loader } from '../../../components/index';
import PostFeatured from '../components/PostFeatured';

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
const FeaturedPost = (props: Props) => {
  if (props.isFetching || !props.posts) {
    return (
      <Loader />
    );
  }
  return (
    <Grid>
      <div style={ { paddingTop: '20px' } }>
        {
          props.posts.map((post, i) =>
            <Col key={ i } xs={ 12 }>
              <PostFeatured { ...post } listTags={ props.listTags } />
            </Col>)
        }

      </div>
    </Grid>
  );
};

export default FeaturedPost;
