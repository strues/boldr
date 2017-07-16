/* @flow */
import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { convertToHTML } from 'draft-convert';
import { graphql } from 'react-apollo';
import EDIT_ARTICLE_MUTATION from '../gql/editArticle.mutation.graphql';
import EditArticleForm from './components/EditArticleForm';

type Props = {
  currentArticle: Article,
  editArticle: Function,
};

class ArticleEditor extends PureComponent {
  props: Props;

  handleSubmit = (values: Object) => {
    const articleId: string = this.props.currentArticle.id;

    this.props.editArticle(articleId, values);
  };

  render() {
    const { currentArticle } = this.props;

    const setPostValues = {
      title: currentArticle.title,
      slug: currentArticle.slug,
      content: currentArticle.content,
      rawContent: currentArticle.rawContent,
      image: currentArticle.image,
      attachments: currentArticle.attachments,
      excerpt: currentArticle.excerpt,
      meta: currentArticle.meta,
      published: currentArticle.published,
      author: currentArticle.author,
    };
    return (
      <div>
        <Helmet title={`Admin: Editing Post ${this.props.currentArticle.title}`} />
        <EditArticleForm initialValues={setPostValues} onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default graphql(EDIT_ARTICLE_MUTATION, {
  props: ({ mutate }) => ({
    editArticle: (articleId, values) =>
      mutate({
        variables: {
          id: articleId,
          input: {
            title: values.title,
            slug: values.title,
            content: convertToHTML(values.content),
            rawContent: values.rawContent,
            featured: false,
            published: values.published,
            excerpt: values.excerpt,
            image: values.image,
          },
        },
      }),
  }),
})(ArticleEditor);
