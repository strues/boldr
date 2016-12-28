/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createPost } from 'state/modules/blog/posts';
import { PostEditorForm } from '../components';
import type { Post } from 'types/models';

export type Props = {
  dispatch: () => void,
  params?: Object,
  currentPost?: Object,
  onFormSubmit?: () => void,
  handleSubmit: () => void,
  posts?: Object
};

class NewPost extends Component {
  constructor(props: Props) {
    super(props);
    (this: any).handleSubmit = this.handleSubmit.bind(this);
  }

  props: Props;

  handleSubmit(values) {
    const postData = {
      title: values.title,
      tags: values.tags,
      excerpt: values.excerpt,
      status: values.status,
      content: values.content,
      seo: values.seo,
    };
    this.props.dispatch(createPost(postData));
  }

  render() {
    return (
      <div>
        <PostEditorForm
          isEditing={ false }
          onSubmit={ this.props.onFormSubmit }
        />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};
export default connect(mapStateToProps, { createPost })(NewPost);
