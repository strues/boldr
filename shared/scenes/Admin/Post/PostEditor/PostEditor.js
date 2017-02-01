/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updatePost } from '../../../../state/modules/blog/posts';
import { EditPostForm } from '../components';

type Props = {
  dispatch: Function,
  posts: Object,
  params: Object,
  currentPost: Object,
  updatePost: Function,
};

class PostEditor extends Component {
  constructor(props: Props) {
    super(props);
    (this: any).handleSubmit = this.handleSubmit.bind(this);
  }

  props: Props;
  handleSubmit(values) {
    const postData = {
      title: values.title,
      status: values.status,
      content: values.content,
      excerpt: values.excerpt,
      id: this.props.currentPost.id || '',
    };
    this.props.updatePost(postData);
  }

  render() {
    return (
      <div>
        <EditPostForm
          initialValues={ this.props.currentPost }
          onSubmit={ this.handleSubmit }
        />
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    currentPost: state.blog.posts.currentPost,
  };
};
export default connect(mapStateToProps, { updatePost })(PostEditor);
