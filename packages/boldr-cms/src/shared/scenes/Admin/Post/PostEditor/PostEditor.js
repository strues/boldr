/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updatePost } from '../../../../state/modules/blog/posts';
import { EditPostForm } from '../components';

export type Props = {
  dispatch: Function,
  posts: Object,
  params: Object,
  currentPost: Object,
  drawer: boolean,
  ui: Object,
  updatePost: Function
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

    console.log('submit', postData);
    this.props.updatePost(postData);
  }

  render() {
    return (
      <div>
        <EditPostForm
          initialValues={ this.props.currentPost }
          postImage={ this.props.postImage }
          onSubmit={ this.handleSubmit }
          drawer={ this.props.drawer }
        />
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    // posts: state.blog.posts,
    currentPost: state.blog.posts.currentPost,
    drawer: state.boldr.ui.drawer,
    postImage: state.admin.attachments.postImage,
  };
};
export default connect(mapStateToProps, { updatePost })(PostEditor);
