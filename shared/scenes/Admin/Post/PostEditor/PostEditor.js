/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { updatePost } from '../../../../state/modules/blog/posts';
import EditPostForm from './components/EditPostForm';

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
      published: values.published,
      content: values.content,
      excerpt: values.excerpt,
      id: this.props.currentPost.id || '',
    };
    this.props.updatePost(postData);
  }

  render() {
    return (
      <div>
        <Helmet title={ `Admin: Editing Post ${this.props.currentPost.title}` } />
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
