/* @flow */
/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { convertToHTML } from 'draft-convert';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import EDIT_ARTICLE_MUTATION from '../gql/editArticle.mutation.graphql';
import EditArticleForm from './components/EditArticleForm';

interface Data {
  getArticleBySlug: Array<Article>,
  loading: boolean,
}

type Props = {
  editArticle: Function,
  currentArticle: Article,
};
// eslint-disable-next-line
const mapStateToProps = state => {
  return {
    currentArticle: state.admin.dashboard.article,
  };
};

@connect(mapStateToProps)
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
        <Helmet title={`Admin: Editing Post ${currentArticle.title}`} />
        <EditArticleForm initialValues={setPostValues} onSubmit={this.handleSubmit} />
      </div>
    );
  }
}
// $FlowIssue
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
