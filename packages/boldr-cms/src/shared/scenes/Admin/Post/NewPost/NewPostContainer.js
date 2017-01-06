/* @flow */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import type { Post } from '../../../../types/models';
import { createPost } from '../../../../state/modules/blog/posts';
import NewPost from './NewPost';

type Props = {
  dispatch: Function,
  postImage: Object,
  drawer: boolean,
};

class NewPostContainer extends Component {
  constructor() {
    super();

    (this: any).onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(data: Post) {
    const postData = {
      title: data.title,
      tags: data.tags,
      excerpt: data.excerpt,
      feature_image: this.props.postImage.url || data.feature_image,
      status: data.status,
      content: data.content,
      seo: data.seo,
    };
    this.props.dispatch(createPost(postData));
    this.context.router.push('/dashboard');
  }
  props: Props;

  render() {
    return (
      <NewPost
        onFormSubmit={ this.onFormSubmit }
        drawer={ this.props.drawer }
        postImage={ this.props.postImage }
      />
    );
  }
}

NewPostContainer.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    postImage: state.admin.attachments.postImage,
    drawer: state.boldr.ui.drawer,
  };
};
export default connect(mapStateToProps)(NewPostContainer);
