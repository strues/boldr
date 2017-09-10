// @flow
import * as React from 'react';
import { graphql, compose, gql } from 'react-apollo';
import universal from 'react-universal-component';
import TAGS_QUERY from '../Tags/gql/tags.graphql';
import CONTENT_TYPES_QUERY from './gql/contentTypes.graphql';

type Props = {
  loading: boolean,
  error?: Object,
  contentTypes: Array<Object>,
};

const UniversalContent = universal(import('./Content'));

const Content = ({ loading, error, contentTypes, getTags, categories }: Props) => (
  <UniversalContent
    isLoading={loading}
    error={error}
    contentTypes={contentTypes}
    tags={getTags}
    categories={categories}
  />
);

// $FlowIssue
export default compose(
  graphql(CONTENT_TYPES_QUERY, {
    props: ({ data: { loading, error, contentTypes } }) => ({
      loading,
      error,
      contentTypes,
    }),
  }),
  graphql(TAGS_QUERY, {
    // $FlowIssue
    options: () => ({
      variables: {
        offset: 0,
        limit: 20,
      },
    }),
    props: ({ data: { loading, error, getTags } }) => ({
      loading,
      error,
      getTags,
    }),
  }),
  graphql(gql`
    {
      categories {
        id
        name
        slug
      }
    }
  `),
)(Content);
