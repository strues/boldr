/* @flow */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import Helmet from 'react-helmet';
import hasWindow from '@boldr/utils/lib/dom/hasWindow';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import type { ArticleType } from '../../../../types/boldr';
import EDIT_ARTICLE_MUTATION from '../gql/editArticle.mutation.graphql';
import EditArticleForm from './components/EditArticleForm';

type Props = {
  editArticle: Function,
  currentArticle: ArticleType,
};
// eslint-disable-next-line
const mapStateToProps = state => {
  return {
    currentArticle: state.admin.dashboard.article,
  };
};

@connect(mapStateToProps)
class ArticleEditor extends React.Component<Props, *> {
  props: Props;

  handleSubmit = (values: Object) => {
    const articleId: string = this.props.currentArticle.id;
    values.content = hasWindow ? window.localStorage.getItem('htmlContent') : '';

    this.props.editArticle(articleId, values);
  };

  render(): React.Node {
    const { currentArticle } = this.props;

    const setPostValues = {
      title: currentArticle.title,
      slug: currentArticle.slug,
      content: currentArticle.content,
      rawContent: currentArticle.rawContent,
      image: currentArticle.image,
      excerpt: currentArticle.excerpt,
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
            content: values.content,
            rawContent: values.rawContent,
            featured: false,
            published: values.published,
            excerpt: values.excerpt,
            image: values.image,
          },
        },
      }),
  }),
  // $FlowIssue
})(ArticleEditor);
