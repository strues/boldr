/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updatePost } from 'state/dux/post';
import { PostEditorForm } from '../components';

export type Props = {
  dispatch: Function,
  posts: Object,
  params: Object,
  currentPost: Object,
  updatePost: Function
};

class PostEditor extends Component {
  constructor(props: Props) {
    super(props);
    (this: any).handleSubmit = this.handleSubmit.bind(this);
  }
  state: Object = {
    editing: true,
  };

  props: Props;
  handleSubmit(values) {
    const postData = {
      title: values.title,
      tags: values.tags,
      status: values.status,
      content: values.content,
      id: this.props.currentPost.id || '',
      origSlug: this.props.params.slug || '',
    };
    console.log('submit', postData);
    this.props.updatePost(postData);
  }

  render() {
    return (
      <div>
        <PostEditorForm
          initialValues={ this.props.currentPost }
          onSubmit={ this.handleSubmit }
          isEditing
        />
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts,
    currentPost: state.posts.bySlug[ownProps.params.slug],
  };
};
export default connect(mapStateToProps, { updatePost })(PostEditor);
