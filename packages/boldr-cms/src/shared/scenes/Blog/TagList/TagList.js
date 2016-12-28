/* @flow */

import React, { Component } from 'react';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import { Grid, Col, Row } from '../../../components/Layout';
// import { requestPostTags } from '../../../state/modules/blog/tag';
import PostCard from '../components/PostCard';

type Props = {
  tags: Object,
  params: Object,
  dispatch: () => void,
};

@provideHooks({
  fetch: ({ dispatch, params: { name } }) => dispatch(requestPostTags(name)),
})
class TagList extends Component {

  componentDidMount(name) {
    this.props.dispatch(requestPostTags(name));
  }
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
    tags: state.blog.tags,
    loading: state.blog.tags.loading,
    posts: state.blog.tags.posts,
  };
};

export default connect(mapStateToProps)(TagList);
