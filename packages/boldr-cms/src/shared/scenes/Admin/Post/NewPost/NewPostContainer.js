/* @flow */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import type { Post } from '../../../../types/models';
import { createPost } from '../../../../state/modules/blog/posts';
import NewPost from './NewPost';

export type Props = {dispatch: Function};

class NewPostContainer extends Component {
  onFormSubmit = (data: Post) => {
    this.props.dispatch(createPost(data));
    this.context.router.push('/dashboard');
  }
  props: Props;
  render() {
    return <NewPost onFormSubmit={ this.onFormSubmit } />;
  }
}

NewPostContainer.contextTypes = {
  router: PropTypes.object,
};

export default connect()(NewPostContainer);
