/* @flow */
import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import draftToHtml from 'draftjs-to-html';
import EditArticleForm from './components/EditArticleForm';

type Props = {
  currentArticle: Article,
  updateArticle: () => void,
};

class ArticleEditor extends PureComponent {
  props: Props;

  handleSubmit = (values: Object) => {
    const postData = {
      title: values.title,
      excerpt: values.excerpt,
      published: values.published,
      rawContent: values.content,
      content: draftToHtml(values.content),
      meta: values.meta,
      id: this.props.currentArticle.id || '',
    };
    this.props.updateArticle(postData);
  };

  render() {
    const { currentArticle } = this.props;

    const setPostValues = {
      title: currentArticle.title,
      slug: currentArticle.slug,
      content: currentArticle.content,
      rawContent: currentArticle.rawContent,
      featureImage: currentArticle.featureImage,
      backgroundImage: currentArticle.backgroundImage,
      attachments: currentArticle.attachments,
      excerpt: currentArticle.excerpt,
      tags: currentArticle.tags,
      meta: currentArticle.meta,
      published: currentArticle.published,
      author: currentArticle.author,
    };
    return (
      <div>
        <Helmet
          title={`Admin: Editing Post ${this.props.currentArticle.title}`}
        />
        <EditArticleForm
          initialValues={setPostValues}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default ArticleEditor;
