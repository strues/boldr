/* @flow */
import { connect } from 'react-redux';
import { graphql, compose, gql, withApollo } from 'react-apollo';

import CREATE_ARTICLE_MUTATION from '../gql/createArticle.mutation.graphql';
import NewArticle from './NewArticle';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: values => {
    const payload = {
      title: values.title,
      slug: values.title,
      content: window.localStorage.getItem('htmlContent'),
      rawContent: values.rawContent,
      featured: false,
      published: values.published,
      excerpt: values.excerpt,
      image: values.image,
      tags: values.tags,
      categoryId: values.categoryId,
    };
    ownProps.createArticle(payload);
  },
});
// $FlowIssue

export default compose(
  withApollo,
  graphql(gql`
    {
      categories {
        id
        name
        slug
      }
    }
  `),
  // $FlowIssue
  graphql(CREATE_ARTICLE_MUTATION, {
    props: ({ mutate }) => ({
      createArticle: payload =>
        mutate({
          variables: {
            input: {
              ...payload,
            },
          },
        }),
    }),
  }),
  // $FlowIssue
  connect(null, mapDispatchToProps),
)(NewArticle);
