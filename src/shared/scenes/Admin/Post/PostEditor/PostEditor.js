/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import draftToHtml from 'draftjs-to-html';
import { updatePost } from '../../../Blog/state';
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
      excerpt: values.excerpt,
      published: values.published,
      raw_content: values.content,
      content: draftToHtml(values.content),
      meta: values.meta,
      id: this.props.currentPost.id || '',
    };
    this.props.updatePost(postData);
  }

  render() {
    const { currentPost } = this.props;

    const setPostValues = {
      title: currentPost.title,
      slug: currentPost.slug,
      content: currentPost.content,
      raw_content: currentPost.raw_content,
      feature_image: currentPost.feature_image,
      background_image: currentPost.background_image,
      attachments: currentPost.attachments,
      excerpt: currentPost.excerpt,
      tags: currentPost.tags,
      meta: currentPost.meta,
      published: currentPost.published,
      author: currentPost.author,
    };
    return (
      <div>
        <Helmet title={`Admin: Editing Post ${this.props.currentPost.title}`} />
        <EditPostForm
          initialValues={setPostValues}
          onSubmit={this.handleSubmit}
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
