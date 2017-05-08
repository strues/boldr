/* @flow */
import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import draftToHtml from 'draftjs-to-html';
import EditPostForm from './components/EditPostForm';

type Props = {
  currentPost: Post,
  updatePost: () => void,
};

class PostEditor extends PureComponent {
  props: Props;

  handleSubmit = (values: Object) => {
    const postData = {
      title: values.title,
      excerpt: values.excerpt,
      published: values.published,
      rawContent: values.content,
      content: draftToHtml(values.content),
      meta: values.meta,
      id: this.props.currentPost.id || '',
    };
    this.props.updatePost(postData);
  };

  render() {
    const { currentPost } = this.props;

    const setPostValues = {
      title: currentPost.title,
      slug: currentPost.slug,
      content: currentPost.content,
      rawContent: currentPost.rawContent,
      featureImage: currentPost.featureImage,
      backgroundImage: currentPost.backgroundImage,
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

export default PostEditor;
