/* @flow */

import React, { Component } from 'react';
import { asyncConnect } from 'redux-connect';
import { Grid, Col, Row } from 'components/Layout';
import { requestPostTags } from 'state/dux/tag';
import PostCard from '../components/PostCard';

type Props = {
  tags: Object,
  params: Object,
  requestPostTags: () => void
};

class TagList extends Component {

  props: Props;
  render() {
    if (!this.props.tags.posts) {
      return (
      <div>
        Loading
      </div>
      );
    }
    return (
      <div>
        <Grid fluid>
        <Row>
        {
          this.props.tags.posts.map(post =>
            <Col key={ post.id } xs={ 12 } md={ 4 }>
              <PostCard { ...post } />
            </Col>)
        }
        </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tags: state.tags,
    loading: state.tags.loading,
    posts: state.tags.posts,
  };
};

const asyncProps = [{
  promise: ({ store: { dispatch, getState }, params: { name } }) => dispatch(requestPostTags(name)),
}];

export default asyncConnect(asyncProps, mapStateToProps, { requestPostTags })(TagList);
