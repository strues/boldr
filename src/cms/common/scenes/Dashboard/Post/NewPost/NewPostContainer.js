/* @flow */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { createPost } from 'state/dux/post';
import NewPost from './NewPost';

export type Props = {dispatch: Function};

class NewPostContainer extends Component {
  onFormSubmit = (data) => {
    this.props.dispatch(createPost(data));
    this.context.router.push('/dashboard');
  }
  props: Props;
  render() {
    return <NewPost onFormSubmit={ this.onFormSubmit } />;
  }
}

NewPostContainer.contextTypes = {
  router: PropTypes.object
};

export default connect()(NewPostContainer);
